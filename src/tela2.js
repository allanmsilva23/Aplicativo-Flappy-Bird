import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Tela2({ navigation }) {
  const instructions = [
    {
      icon: 'finger-print-outline',
      color: '#00F5D4',
      title: 'Impulso Gravitacional',
      desc: 'Toque na área de controle na parte inferior da tela para impulsionar sua nave para cima. Solte para deixar a gravidade agir.',
    },
    {
      icon: 'flash-outline',
      color: '#F43F5E',
      title: 'Barreiras de Laser',
      desc: 'Atravesse o espaço aberto entre as colunas de energia. Colidir com os lasers, o teto ou o solo encerra a missão da sua nave.',
    },
    {
      icon: 'people-outline',
      color: '#A78BFA',
      title: 'Modo 1 ou 2 Jogadores',
      desc: 'Jogue sozinho ou desafie um amigo na mesma tela! No modo 2P, cada jogador tem seu próprio botão de propulsão lado a lado.',
    },
    {
      icon: 'stopwatch-outline',
      color: '#FBBF24',
      title: 'Pontuação, Tempo e Som',
      desc: 'Acompanhe seu tempo de sobrevivência, supere o recorde da sessão e ative ou desative os efeitos sonoros quando quiser.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>INSTRUÇÕES DO JOGO</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>
          Domine os controles da sua nave antes de iniciar a missão espacial:
        </Text>

        {instructions.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.iconBox, { borderColor: item.color }]}>
              <Ionicons name={item.icon} size={26} color={item.color} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.playButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Tela3')}
        >
          <Ionicons name="game-controller" size={22} color="#0B0F19" />
          <Text style={styles.playButtonText}>IR PARA O JOGO</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#131B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#131B2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#0B0F19',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  playButton: {
    backgroundColor: '#00F5D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  playButtonText: {
    color: '#0B0F19',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#090D16',
  },
  disclaimerText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});