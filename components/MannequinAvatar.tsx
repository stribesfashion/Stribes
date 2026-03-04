import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OutfitItem {
  emoji: string;
  color: string;
  name: string;
}

interface Outfit {
  bgColor: string;
  avatarColor: string;
  top: OutfitItem;
  bottom: OutfitItem;
  shoes: OutfitItem;
  accessory?: OutfitItem;
}

interface Props {
  outfit: Outfit;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

export default function MannequinAvatar({ outfit, size = 'medium', showLabels = false }: Props) {
  const scale = size === 'large' ? 1.4 : size === 'small' ? 0.7 : 1;
  const headSize = 50 * scale;
  const torsoH = 70 * scale;
  const legsH = 80 * scale;
  const feetH = 30 * scale;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.head, { width: headSize, height: headSize, borderRadius: headSize / 2, backgroundColor: outfit.avatarColor + '99' }]} />
      <View style={[styles.torso, { width: 70 * scale, height: torsoH, backgroundColor: outfit.avatarColor, borderRadius: 8 * scale }]}>
        <Text style={{ fontSize: 22 * scale, opacity: 0.6 }}>{outfit.top.emoji}</Text>
      </View>
      <View style={[styles.legs, { width: 60 * scale, height: legsH, backgroundColor: outfit.avatarColor + 'CC', borderRadius: 6 * scale }]}>
        <Text style={{ fontSize: 18 * scale, opacity: 0.7 }}>{outfit.bottom.emoji}</Text>
      </View>
      <View style={[styles.feet, { width: 50 * scale, height: feetH }]}>
        <View style={[styles.foot, { backgroundColor: '#222', borderRadius: 6 * scale, width: 20 * scale, height: feetH }]}>
          <Text style={{ fontSize: 12 * scale }}>{outfit.shoes.emoji}</Text>
        </View>
        <View style={[styles.foot, { backgroundColor: '#222', borderRadius: 6 * scale, width: 20 * scale, height: feetH }]}>
          <Text style={{ fontSize: 12 * scale }}>{outfit.shoes.emoji}</Text>
        </View>
      </View>
      {showLabels && (
        <>
          <View style={[styles.label, { top: headSize + 8, left: -90 * scale }]}>
            <View style={styles.labelDot} />
            <Text style={styles.labelText}>{outfit.top.name}</Text>
          </View>
          <View style={[styles.label, { top: headSize + torsoH + 20, left: -85 * scale }]}>
            <View style={styles.labelDot} />
            <Text style={styles.labelText}>{outfit.bottom.name}</Text>
          </View>
          <View style={[styles.label, { top: headSize + torsoH + legsH + 10, left: -80 * scale }]}>
            <View style={[styles.labelDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.labelText}>{outfit.shoes.name}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', justifyContent: 'flex-end', position: 'relative' },
  head: { marginBottom: 2 },
  torso: { alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  legs: { alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  feet: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  foot: { alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2 },
  label: { position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.92)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  labelDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#8B5CF6', marginRight: 5 },
  labelText: { fontSize: 11, fontWeight: '600', color: '#111' },
});
