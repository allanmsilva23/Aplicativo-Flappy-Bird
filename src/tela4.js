import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Tela4({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CRÉDITOS DO PROJETO</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card do Desenvolvedor */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="code-slash" size={38} color="#00F5D4" />
          </View>
          <Text style={styles.devLabel}>DESENVOLVIDO POR</Text>
          <Text style={styles.devName}>Allan</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>5º Semestre • Turma DSM</Text>
          </View>
        </View>

        {/* Informações Acadêmicas Obrigatórias */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={22} color="#00F5D4" />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>INSTITUIÇÃO DE ENSINO</Text>
              <Text style={styles.infoValue}>Fatec Itaquera - Professor Miguel Reale</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="laptop-outline" size={22} color="#A78BFA" />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>CURSO SUPERIOR</Text>
              <Text style={styles.infoValue}>Desenvolvimento de Software Multiplataforma</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="phone-portrait-outline" size={22} color="#FBBF24" />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>DISCIPLINA & PROFESSOR</Text>
              <Text style={styles.infoValue}>
                Programação para Dispositivos Móveis II{'\n'}Prof. Jeferson de Souza Dias
              </Text>
            </View>
          </View>
        </View>

        {/* Card de Destaque da Frase Obrigatória */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#00F5D4" />
          <Text style={styles.disclaimerHighlight}>
            "Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real."
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Tela1')}
        >
          <Ionicons name="home" size={18} color="#0B0F19" />
          <Text style={styles.homeButtonText}>VOLTAR AO INÍCIO</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#131B2E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#0B0F19',
    borderWidth: 2,
    borderColor: '#00F5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  devLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  devName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: 'rgba(0, 245, 212, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.3)',
  },
  tagText: {
    color: '#00F5D4',
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#131B2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextBox: {
    marginLeft: 14,
    flex: 1,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 14,
  },
  disclaimerBox: {
    backgroundColor: 'rgba(0, 245, 212, 0.06)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 212, 0.25)',
    alignItems: 'center',
    marginBottom: 20,
  },
  disclaimerHighlight: {
    color: '#CBD5E1',
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 19,
  },
  homeButton: {
    backgroundColor: '#00F5D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
  },
  homeButtonText: {
    color: '#0B0F19',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
    letterSpacing: 0.8,
  },
});