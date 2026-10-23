import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Tela1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowCircleTop} />
      <View style={styles.glowCircleBottom} />

      <View style={styles.content}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={14} color="#00F5D4" />
          <Text style={styles.badgeText}>ATIVIDADE PRÁTICA 9 • DSM</Text>
        </View>

        <View style={styles.logoBox}>
          <Ionicons name="rocket" size={64} color="#00F5D4" />
        </View>

        <Text style={styles.title}>
          CYBER<Text style={styles.titleAccent}>FLAP</Text>
        </Text>
        <Text style={styles.subtitle}>
          Desvie dos lasers quânticos em alta velocidade no espaço cibernético!
        </Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Tela3')}
          >
            <Ionicons name="play" size={24} color="#0B0F19" />
            <Text style={styles.primaryButtonText}>JOGAR AGORA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Tela2')}
          >
            <Ionicons name="book-outline" size={20} color="#00F5D4" />
            <Text style={styles.secondaryButtonText}>COMO JOGAR (INSTRUÇÕES)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Tela4')}
          >
            <Ionicons name="information-circle-outline" size={20} color="#A78BFA" />
            <Text style={[styles.secondaryButtonText, { color: '#A78BFA' }]}>
              CRÉDITOS DO PROJETO
            </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
  },
  glowCircleTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 245, 212, 0.08)',
    top: -60,
    right: -60,
  },
  glowCircleBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    bottom: -80,
    left: -80,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 212, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.3)',
    marginBottom: 24,
  },
  badgeText: {
    color: '#00F5D4',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginLeft: 6,
  },
  logoBox: {
    width: 115,
    height: 115,
    borderRadius: 32,
    backgroundColor: '#131B2E',
    borderWidth: 2,
    borderColor: '#00F5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#00F5D4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  titleAccent: {
    color: '#00F5D4',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 36,
    lineHeight: 20,
  },
  menuContainer: {
    width: '100%',
    gap: 14,
  },
  primaryButton: {
    backgroundColor: '#00F5D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#00F5D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 6,
  },
  primaryButtonText: {
    color: '#0B0F19',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#131B2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 6,
  },
  secondaryButtonText: {
    color: '#00F5D4',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#090D16',
  },
  disclaimerText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});