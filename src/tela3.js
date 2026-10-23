import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GAME_WIDTH = SCREEN_WIDTH - 24;
const GAME_HEIGHT = Math.min(Math.max(SCREEN_HEIGHT * 0.52, 300), 420);
const BIRD_SIZE = 32;
const PIPE_WIDTH = 52;
const PIPE_GAP = 125;
const GRAVITY = 0.55;
const JUMP_FORCE = -7.8;
const PIPE_SPEED = 3.6;

export default function Tela3({ navigation }) {
  const [gameMode, setGameMode] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [, setRenderTick] = useState(0);

  const engine = useRef({
    bird1Y: GAME_HEIGHT / 2 - 20,
    bird1Vel: 0,
    bird1Alive: true,
    bird2Y: GAME_HEIGHT / 2 + 20,
    bird2Vel: 0,
    bird2Alive: false,
    pipeX: GAME_WIDTH,
    topPipeHeight: 90,
    currentScore: 0,
  });

  const playEffect = async (type) => {
    if (!soundEnabled) return;
    try {
      const urls = {
        jump: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
        point: 'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg',
        hit: 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
      };
      const { sound } = await Audio.Sound.createAsync(
        { uri: urls[type] },
        { shouldPlay: true, volume: 0.4 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
    }
  };

  const startGame = (selectedMode = gameMode) => {
    engine.current = {
      bird1Y: GAME_HEIGHT / 2 - (selectedMode === 2 ? 25 : 0),
      bird1Vel: 0,
      bird1Alive: true,
      bird2Y: GAME_HEIGHT / 2 + 25,
      bird2Vel: 0,
      bird2Alive: selectedMode === 2,
      pipeX: GAME_WIDTH,
      topPipeHeight: Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 90)) + 45,
      currentScore: 0,
    };
    setScore(0);
    setElapsedTime(0);
    setWinnerMessage('');
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    let timer = null;
    if (isPlaying && !isGameOver) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    let loop = null;
    if (isPlaying && !isGameOver) {
      loop = setInterval(() => {
        const state = engine.current;

        if (state.bird1Alive) {
          state.bird1Y += state.bird1Vel;
          state.bird1Vel += GRAVITY;
        }

        if (gameMode === 2 && state.bird2Alive) {
          state.bird2Y += state.bird2Vel;
          state.bird2Vel += GRAVITY;
        }

        state.pipeX -= PIPE_SPEED;
        if (state.pipeX < -PIPE_WIDTH) {
          state.pipeX = GAME_WIDTH;
          state.topPipeHeight = Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 90)) + 45;
          state.currentScore += 1;
          setScore(state.currentScore);
          setBestScore((prev) => Math.max(prev, state.currentScore));
          playEffect('point');
        }

        const p1X = 45;
        if (state.bird1Alive) {
          const hitBounds1 = state.bird1Y <= 0 || state.bird1Y + BIRD_SIZE >= GAME_HEIGHT;
          const hitPipeX1 = p1X + BIRD_SIZE - 4 > state.pipeX && p1X + 4 < state.pipeX + PIPE_WIDTH;
          const hitPipeY1 =
            state.bird1Y + 4 < state.topPipeHeight ||
            state.bird1Y + BIRD_SIZE - 4 > state.topPipeHeight + PIPE_GAP;

          if (hitBounds1 || (hitPipeX1 && hitPipeY1)) {
            state.bird1Alive = false;
            playEffect('hit');
          }
        }

        const p2X = 90;
        if (gameMode === 2 && state.bird2Alive) {
          const hitBounds2 = state.bird2Y <= 0 || state.bird2Y + BIRD_SIZE >= GAME_HEIGHT;
          const hitPipeX2 = p2X + BIRD_SIZE - 4 > state.pipeX && p2X + 4 < state.pipeX + PIPE_WIDTH;
          const hitPipeY2 =
            state.bird2Y + 4 < state.topPipeHeight ||
            state.bird2Y + BIRD_SIZE - 4 > state.topPipeHeight + PIPE_GAP;

          if (hitBounds2 || (hitPipeX2 && hitPipeY2)) {
            state.bird2Alive = false;
            playEffect('hit');
          }
        }

        if (gameMode === 1 && !state.bird1Alive) {
          setIsGameOver(true);
          setIsPlaying(false);
        } else if (gameMode === 2) {
          if (!state.bird1Alive && state.bird2Alive && !winnerMessage) {
            setWinnerMessage('Jogador 2 assumiu a liderança!');
          } else if (state.bird1Alive && !state.bird2Alive && !winnerMessage) {
            setWinnerMessage('Jogador 1 assumiu a liderança!');
          } else if (!state.bird1Alive && !state.bird2Alive) {
            setIsGameOver(true);
            setIsPlaying(false);
          }
        }

        setRenderTick((t) => t + 1);
      }, 22);
    }
    return () => clearInterval(loop);
  }, [isPlaying, isGameOver, gameMode, soundEnabled, winnerMessage]);

  const jumpPlayer1 = () => {
    if (!isPlaying) {
      startGame(gameMode);
      return;
    }
    if (engine.current.bird1Alive) {
      engine.current.bird1Vel = JUMP_FORCE;
      playEffect('jump');
    }
  };

  const jumpPlayer2 = () => {
    if (!isPlaying) {
      startGame(gameMode);
      return;
    }
    if (gameMode === 2 && engine.current.bird2Alive) {
      engine.current.bird2Vel = JUMP_FORCE;
      playEffect('jump');
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const { bird1Y, bird1Alive, bird2Y, bird2Alive, pipeX, topPipeHeight } = engine.current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Tela1')}>
          <Ionicons name="home-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[styles.modeBtn, gameMode === 1 && styles.modeBtnActive]}
            onPress={() => {
              setGameMode(1);
              setIsPlaying(false);
              setIsGameOver(false);
            }}
          >
            <Text style={[styles.modeBtnText, gameMode === 1 && styles.modeBtnTextActive]}>
              1 JOGADOR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, gameMode === 2 && styles.modeBtnActive]}
            onPress={() => {
              setGameMode(2);
              setIsPlaying(false);
              setIsGameOver(false);
            }}
          >
            <Text style={[styles.modeBtnText, gameMode === 2 && styles.modeBtnTextActive]}>
              2 JOGADORES
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setSoundEnabled(!soundEnabled)}
        >
          <Ionicons
            name={soundEnabled ? 'volume-high' : 'volume-mute'}
            size={20}
            color={soundEnabled ? '#00F5D4' : '#64748B'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.hudContainer}>
        <View style={styles.hudBox}>
          <Text style={styles.hudLabel}>PONTOS</Text>
          <Text style={styles.hudValue}>{score}</Text>
        </View>
        <View style={styles.hudBox}>
          <Text style={styles.hudLabel}>TEMPO</Text>
          <Text style={[styles.hudValue, { color: '#FBBF24' }]}>{formatTime(elapsedTime)}</Text>
        </View>
        <View style={styles.hudBox}>
          <Text style={styles.hudLabel}>RECORDE</Text>
          <Text style={[styles.hudValue, { color: '#A78BFA' }]}>{bestScore}</Text>
        </View>
      </View>

      <View style={[styles.gameArena, { width: GAME_WIDTH, height: GAME_HEIGHT }]}>
        <View style={[styles.star, { top: 40, left: 60 }]} />
        <View style={[styles.star, { top: 140, left: 220 }]} />
        <View style={[styles.star, { top: 240, left: 110 }]} />
        <View style={[styles.star, { top: 80, left: 290 }]} />

        <View
          style={[
            styles.pipe,
            styles.pipeTop,
            { left: pipeX, height: topPipeHeight, width: PIPE_WIDTH },
          ]}
        />

        <View
          style={[
            styles.pipe,
            styles.pipeBottom,
            {
              left: pipeX,
              top: topPipeHeight + PIPE_GAP,
              height: GAME_HEIGHT - (topPipeHeight + PIPE_GAP),
              width: PIPE_WIDTH,
            },
          ]}
        />

        {bird1Alive && (
          <View style={[styles.bird1, { top: bird1Y, left: 45 }]}>
            <Ionicons name="rocket" size={20} color="#0B0F19" />
          </View>
        )}

        {gameMode === 2 && bird2Alive && (
          <View style={[styles.bird2, { top: bird2Y, left: 90 }]}>
            <Ionicons name="planet" size={20} color="#FFFFFF" />
          </View>
        )}

        {(!isPlaying || isGameOver) && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>
              {isGameOver ? 'FIM DE MISSÃO!' : 'PRONTO PARA DECOLAR?'}
            </Text>
            <Text style={styles.overlaySubtitle}>
              {isGameOver
                ? `Você fez ${score} ponto(s) em ${formatTime(elapsedTime)}`
                : gameMode === 1
                ? 'Modo Solo selecionado'
                : 'Modo 2 Jogadores (Co-op / Versus)'}
            </Text>

            {winnerMessage !== '' && (
              <Text style={styles.winnerText}>{winnerMessage}</Text>
            )}

            <TouchableOpacity style={styles.startBtn} onPress={() => startGame(gameMode)}>
              <Ionicons name="play" size={20} color="#0B0F19" />
              <Text style={styles.startBtnText}>
                {isGameOver ? 'JOGAR NOVAMENTE' : 'INICIAR PARTIDA'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.controlsArea}>
        <TouchableOpacity
          style={[styles.jumpPad, styles.jumpPadP1]}
          activeOpacity={0.7}
          onPressIn={jumpPlayer1}
        >
          <Ionicons name="arrow-up-circle" size={28} color="#0B0F19" />
          <Text style={styles.jumpPadTextP1}>
            {gameMode === 1 ? 'TOQUE PARA VOAR' : 'PULAR • JOGADOR 1'}
          </Text>
        </TouchableOpacity>

        {gameMode === 2 && (
          <TouchableOpacity
            style={[styles.jumpPad, styles.jumpPadP2]}
            activeOpacity={0.7}
            onPressIn={jumpPlayer2}
          >
            <Ionicons name="arrow-up-circle" size={28} color="#FFFFFF" />
            <Text style={styles.jumpPadTextP2}>PULAR • JOGADOR 2</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.disclaimerText}>
          "Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real."
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#131B2E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#131B2E',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9,
  },
  modeBtnActive: {
    backgroundColor: '#00F5D4',
  },
  modeBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
  },
  modeBtnTextActive: {
    color: '#0B0F19',
  },
  hudContainer: {
    flexDirection: 'row',
    width: GAME_WIDTH,
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  hudBox: {
    flex: 1,
    backgroundColor: '#131B2E',
    marginHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  hudLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hudValue: {
    color: '#00F5D4',
    fontSize: 18,
    fontWeight: '900',
  },
  gameArena: {
    backgroundColor: '#070A12',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E293B',
    overflow: 'hidden',
    position: 'relative',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  bird1: {
    position: 'absolute',
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    borderRadius: 10,
    backgroundColor: '#00F5D4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00F5D4',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  bird2: {
    position: 'absolute',
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  pipe: {
    position: 'absolute',
    backgroundColor: 'rgba(244, 63, 94, 0.22)',
    borderColor: '#F43F5E',
    borderWidth: 2,
  },
  pipeTop: {
    top: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  pipeBottom: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 15, 25, 0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlayTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  overlaySubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 16,
    textAlign: 'center',
  },
  winnerText: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  startBtn: {
    flexDirection: 'row',
    backgroundColor: '#00F5D4',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#0B0F19',
    fontWeight: '900',
    fontSize: 14,
    marginLeft: 8,
  },
  controlsArea: {
    flexDirection: 'row',
    width: GAME_WIDTH,
    gap: 10,
    marginVertical: 6,
  },
  jumpPad: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  jumpPadP1: {
    backgroundColor: '#00F5D4',
  },
  jumpPadP2: {
    backgroundColor: '#8B5CF6',
  },
  jumpPadTextP1: {
    color: '#0B0F19',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 8,
  },
  jumpPadTextP2: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 8,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#090D16',
  },
  disclaimerText: {
    color: '#64748B',
    fontSize: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});