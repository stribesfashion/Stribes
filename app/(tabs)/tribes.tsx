import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TRIBES } from '../../data/mockData';

export default function TribesScreen() {
  const insets = useSafeAreaInsets();
  const [tribes, setTribes] = useState(TRIBES);

  const toggleJoin = (id: string) => {
    setTribes(prev => prev.map(t => t.id === id ? { ...t, joined: !t.joined } : t));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Tribes</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tribes.map(tribe => (
          <View key={tribe.id} style={[styles.tribeCard, { backgroundColor: tribe.color }]}>
            <View style={styles.tribeHeader}>
              <View style={styles.tribeLeft}>
                <View style={styles.tribeEmoji}>
                  <Text style={{ fontSize: 24 }}>{tribe.emoji}</Text>
                </View>
                <View>
                  <Text style={styles.tribeName}>{tribe.name}</Text>
                  <Text style={styles.tribeMembers}>{tribe.members} members{tribe.joined ? ' · 🔴 Live challenge' : ''}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.joinBtn, tribe.joined && styles.joinedBtn]} onPress={() => toggleJoin(tribe.id)}>
                <Text style={[styles.joinBtnText, tribe.joined && styles.joinedBtnText]}>{tribe.joined ? '✓ Joined' : '+ Join'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.challengeCard}>
              <Text style={styles.challengeLabel}>⚡ WEEKLY CHALLENGE</Text>
              <Text style={styles.challengeName}>{tribe.challenge}</Text>
              <Text style={styles.challengeMeta}>⏱ {tribe.timeLeft} remaining · {tribe.entries} entries</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: '#EC4899', fontStyle: 'italic' },
  searchBtn: { padding: 4 },
  searchIcon: { fontSize: 22 },
  tribeCard: { marginHorizontal: 16, marginBottom: 16, borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  tribeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tribeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tribeEmoji: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' },
  tribeName: { fontSize: 18, fontWeight: '800', color: '#111' },
  tribeMembers: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  joinBtn: { backgroundColor: '#111', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  joinedBtn: { backgroundColor: 'rgba(255,255,255,0.8)', borderWidth: 1, borderColor: '#DDD' },
  joinBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  joinedBtnText: { color: '#374151' },
  challengeCard: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: 14 },
  challengeLabel: { fontSize: 10, fontWeight: '700', color: '#8B5CF6', letterSpacing: 1, marginBottom: 4 },
  challengeName: { fontSize: 15, fontWeight: '800', color: '#111', marginBottom: 4 },
  challengeMeta: { fontSize: 11, color: '#6B7280' },
});
