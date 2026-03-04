import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { USER_PROFILE, STYLE_DNA } from '../../data/mockData';

const { width } = Dimensions.get('window');

function DNABars() {
  return (
    <View style={styles.dnaBars}>
      {STYLE_DNA.map((item, i) => {
        const anim = useRef(new Animated.Value(0)).current;
        useEffect(() => {
          Animated.timing(anim, { toValue: item.percent, duration: 900 + i * 100, useNativeDriver: false }).start();
        }, []);
        return (
          <View key={i} style={styles.dnaRow}>
            <View style={[styles.dnaDot, { backgroundColor: item.color }]} />
            <Text style={styles.dnaLabel}>{item.label}</Text>
            <View style={styles.dnaBarBg}>
              <Animated.View style={[styles.dnaBarFill, { width: anim.interpolate({ inputRange: [0,100], outputRange: ['0%','100%'] }), backgroundColor: item.color }]} />
            </View>
            <Text style={styles.dnaPercent}>{item.percent}%</Text>
          </View>
        );
      })}
    </View>
  );
}

export default function MeScreen() {
  const insets = useSafeAreaInsets();
  const looks = ['👕','🧥','🌿','👗','⚡','🌙','🎭','⏰','✨'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>⚙️</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 28 }}>{USER_PROFILE.emoji}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
            <Text style={styles.profileHandle}>{USER_PROFILE.handle} · {USER_PROFILE.location}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{USER_PROFILE.looks}</Text>
                <Text style={styles.statLabel}>Looks</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{USER_PROFILE.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>✦ {USER_PROFILE.sauce}</Text>
                <Text style={styles.statLabel}>Sauce</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.dnaSection}>
          <Text style={styles.sectionTitle}>🧬 Your Style DNA</Text>
          <View style={styles.donutContainer}>
            <View style={styles.donutCircle}>
              <View style={styles.donutInner}>
                <Text style={styles.donutLabel}>DNA</Text>
                <Text style={styles.donutLevel}>Level {USER_PROFILE.dnaLevel}</Text>
              </View>
            </View>
          </View>
          <DNABars />
        </View>
        <View style={styles.looksSection}>
          <Text style={styles.sectionTitle}>Your Looks</Text>
          <View style={styles.looksGrid}>
            {looks.map((emoji, i) => (
              <TouchableOpacity key={i} style={styles.lookCell}>
                <Text style={{ fontSize: 28 }}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '900', color: '#EC4899', fontStyle: 'italic' },
  profileCard: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 20, backgroundColor: '#EDE7F6', borderRadius: 20, padding: 16, alignItems: 'center', gap: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: '900', color: '#111' },
  profileHandle: { fontSize: 12, color: '#6B7280', marginBottom: 10 },
  statsRow: { flexDirection: 'row', gap: 16 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '800', color: '#111' },
  statLabel: { fontSize: 10, color: '#6B7280' },
  dnaSection: { marginHorizontal: 16, marginBottom: 24, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 16 },
  donutContainer: { alignItems: 'center', marginBottom: 20 },
  donutCircle: { width: 160, height: 160, borderRadius: 80, borderWidth: 24, borderColor: '#EC4899', alignItems: 'center', justifyContent: 'center' },
  donutInner: { alignItems: 'center' },
  donutLabel: { fontSize: 14, fontWeight: '800', color: '#111' },
  donutLevel: { fontSize: 11, color: '#6B7280' },
  dnaBars: { gap: 10 },
  dnaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dnaDot: { width: 10, height: 10, borderRadius: 5 },
  dnaLabel: { width: 80, fontSize: 13, color: '#374151', fontWeight: '500' },
  dnaBarBg: { flex: 1, height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, overflow: 'hidden' },
  dnaBarFill: { height: '100%', borderRadius: 2 },
  dnaPercent: { width: 36, fontSize: 12, fontWeight: '700', color: '#374151', textAlign: 'right' },
  looksSection: { paddingHorizontal: 16 },
  looksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  lookCell: { width: (width - 48) / 3, height: (width - 48) / 3, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
