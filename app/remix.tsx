import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { OUTFITS, CLOTHING_ITEMS } from '../../data/mockData';
import MannequinAvatar from '../../components/MannequinAvatar';

const { width } = Dimensions.get('window');
type ClothingCategory = 'tops' | 'bottoms' | 'shoes' | 'accessories';
const CATEGORIES: { key: ClothingCategory; label: string; emoji: string }[] = [
  { key: 'tops', label: 'Tops', emoji: '👕' },
  { key: 'bottoms', label: 'Bottoms', emoji: '👖' },
  { key: 'shoes', label: 'Shoes', emoji: '👢' },
  { key: 'accessories', label: 'Extras', emoji: '👜' },
];

export default function RemixScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { outfitId } = useLocalSearchParams();
  const baseOutfit = OUTFITS.find(o => o.id === outfitId) || OUTFITS[0];
  const [remixedOutfit, setRemixedOutfit] = useState({ ...baseOutfit });
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>('tops');

  const swapPiece = (category: ClothingCategory, item: any) => {
    const key = category === 'tops' ? 'top' : category === 'bottoms' ? 'bottom' : category === 'shoes' ? 'shoes' : 'accessory';
    setRemixedOutfit(prev => ({ ...prev, [key]: item }));
  };

  const currentItems = CLOTHING_ITEMS[activeCategory] || [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Remix ↺</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.previewArea, { backgroundColor: remixedOutfit.bgColor }]}>
          <Text style={styles.previewLabel}>YOUR REMIX</Text>
          <MannequinAvatar outfit={remixedOutfit} size="large" showLabels />
          <View style={styles.previewBadge}><Text style={styles.previewBadgeText}>↺ REMIX</Text></View>
        </View>
        <View style={styles.currentPieces}>
          <Text style={styles.currentPiecesTitle}>Tap a piece to swap it</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {([
              { label: remixedOutfit.top.name, emoji: remixedOutfit.top.emoji, cat: 'tops' as ClothingCategory },
              { label: remixedOutfit.bottom.name, emoji: remixedOutfit.bottom.emoji, cat: 'bottoms' as ClothingCategory },
              { label: remixedOutfit.shoes.name, emoji: remixedOutfit.shoes.emoji, cat: 'shoes' as ClothingCategory },
            ]).map((piece, i) => (
              <TouchableOpacity key={i} style={[styles.pieceChip, activeCategory === piece.cat && styles.pieceChipActive]} onPress={() => setActiveCategory(piece.cat)}>
                <Text style={styles.pieceChipEmoji}>{piece.emoji}</Text>
                <Text style={styles.pieceChipLabel}>{piece.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.categoryRow}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.key} style={[styles.catBtn, activeCategory === cat.key && styles.catBtnActive]} onPress={() => setActiveCategory(cat.key)}>
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text style={[styles.catLabel, activeCategory === cat.key && styles.catLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.swapTitle}>Tap to swap</Text>
        <View style={styles.itemsGrid}>
          {currentItems.map((item: any) => {
            const currentKey = activeCategory === 'tops' ? 'top' : activeCategory === 'bottoms' ? 'bottom' : activeCategory === 'shoes' ? 'shoes' : 'accessory';
            const isSelected = (remixedOutfit as any)[currentKey]?.id === item.id;
            return (
              <TouchableOpacity key={item.id} style={[styles.itemCard, isSelected && styles.itemCardSelected]} onPress={() => swapPiece(activeCategory, item)}>
                <View style={[styles.itemThumb, { backgroundColor: item.color + '22' }]}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemTribeBadge}><Text style={styles.itemTribeText}>{item.tribe}</Text></View>
                {isSelected && <View style={styles.selectedBadge}><Text style={styles.selectedBadgeText}>✓</Text></View>}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.postBtn}>
          <Text style={styles.postBtnText}>↺ Post This Remix</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 16, color: '#374151' },
  title: { fontSize: 18, fontWeight: '800', color: '#111' },
  saveBtn: { backgroundColor: '#8B5CF6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  previewArea: { marginHorizontal: 16, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 16, position: 'relative', minHeight: 280 },
  previewLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(0,0,0,0.4)', letterSpacing: 1, marginBottom: 12 },
  previewBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#8B5CF6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  previewBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  currentPieces: { paddingHorizontal: 16, marginBottom: 16 },
  currentPiecesTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 10 },
  pieceChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 2, borderColor: 'transparent' },
  pieceChipActive: { borderColor: '#8B5CF6', backgroundColor: '#EDE7F6' },
  pieceChipEmoji: { fontSize: 16 },
  pieceChipLabel: { fontSize: 12, fontWeight: '600', color: '#374151' },
  categoryRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  catBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: '#F3F4F6' },
  catBtnActive: { backgroundColor: '#111' },
  catEmoji: { fontSize: 16, marginBottom: 2 },
  catLabel: { fontSize: 10, fontWeight: '600', color: '#6B7280' },
  catLabelActive: { color: '#fff' },
  swapTitle: { paddingHorizontal: 16, fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 12 },
  itemsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8, marginBottom: 20 },
  itemCard: { width: (width - 56) / 3, backgroundColor: '#fff', borderRadius: 16, padding: 10, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  itemCardSelected: { borderColor: '#8B5CF6' },
  itemThumb: { width: 60, height: 60, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  itemEmoji: { fontSize: 28 },
  itemName: { fontSize: 11, fontWeight: '600', color: '#111', textAlign: 'center', marginBottom: 4 },
  itemTribeBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  itemTribeText: { fontSize: 9, color: '#6B7280', fontWeight: '600' },
  selectedBadge: { position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' },
  selectedBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  postBtn: { marginHorizontal: 16, backgroundColor: '#111', borderRadius: 16, padding: 18, alignItems: 'center' },
  postBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
