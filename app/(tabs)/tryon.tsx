import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { OUTFITS } from '../../data/mockData';
import MannequinAvatar from '../../components/MannequinAvatar';

const { width } = Dimensions.get('window');

export default function TryOnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { outfitId } = useLocalSearchParams();
  const [mode, setMode] = useState<'photo' | 'mannequin'>('photo');
  const [selectedOutfit, setSelectedOutfit] = useState(OUTFITS.find(o => o.id === outfitId) || OUTFITS[0]);
  const [hasOutfit, setHasOutfit] = useState(!!outfitId);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Try-On Mirror ✦</Text>
          <Text style={styles.subtitle}>Snap a photo — see the look on you</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modeToggle}>
        <TouchableOpacity style={[styles.modeBtn, mode === 'photo' && styles.modeBtnActive]} onPress={() => setMode('photo')}>
          <Text style={[styles.modeBtnText, mode === 'photo' && styles.modeBtnTextActive]}>📸 My Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modeBtn, mode === 'mannequin' && styles.modeBtnActive]} onPress={() => setMode('mannequin')}>
          <Text style={[styles.modeBtnText, mode === 'mannequin' && styles.modeBtnTextActive]}>🧍 Mannequin</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tryOnArea}>
          <View style={styles.outfitPanel}>
            <Text style={styles.panelLabel}>OUTFIT</Text>
            {hasOutfit ? (
              <>
                <View style={[styles.outfitThumb, { backgroundColor: selectedOutfit.bgColor }]}>
                  <MannequinAvatar outfit={selectedOutfit} size="medium" />
                </View>
                <View style={styles.outfitPieces}>
                  <View style={styles.pieceTag}><Text style={styles.pieceTagText}>👕 {selectedOutfit.top.name.split(' ')[0]}</Text></View>
                  <View style={styles.pieceTag}><Text style={styles.pieceTagText}>👖 {selectedOutfit.bottom.name.split(' ')[0]}</Text></View>
                  <View style={styles.pieceTag}><Text style={styles.pieceTagText}>👢 {selectedOutfit.shoes.name.split(' ')[0]}</Text></View>
                </View>
                <TouchableOpacity style={styles.clearOutfit} onPress={() => setHasOutfit(false)}>
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emptyOutfit}>
                <Text style={styles.emptyOutfitIcon}>🖼️</Text>
                <Text style={styles.emptyOutfitText}>Outfit from feed</Text>
                <Text style={styles.emptyOutfitHint}>Tap "Try This Look"{'\n'}on any post</Text>
              </View>
            )}
          </View>
          <View style={styles.photoPanel}>
            <Text style={styles.panelLabel}>{mode === 'photo' ? 'YOUR PHOTO' : 'MANNEQUIN'}</Text>
            {mode === 'photo' ? (
              <TouchableOpacity style={styles.cameraArea}>
                <View style={styles.silhouette}>
                  <View style={styles.silhouetteHead} />
                  <View style={styles.silhouetteBody} />
                </View>
                <View style={styles.captureBtn}>
                  <View style={styles.captureBtnInner} />
                </View>
                <Text style={styles.cameraHint}>FRONT FACING</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.mannequinArea, { backgroundColor: selectedOutfit.bgColor }]}>
                <MannequinAvatar outfit={selectedOutfit} size="large" showLabels />
              </View>
            )}
          </View>
        </View>
        <View style={styles.moreLooks}>
          <View style={styles.moreLooksHeader}>
            <Text style={styles.moreLooksTitle}>More looks to try</Text>
            <TouchableOpacity><Text style={styles.allBtn}>All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {OUTFITS.map(outfit => (
              <TouchableOpacity key={outfit.id} style={[styles.lookCard, selectedOutfit.id === outfit.id && styles.lookCardActive]} onPress={() => { setSelectedOutfit(outfit); setHasOutfit(true); }}>
                <View style={[styles.lookThumb, { backgroundColor: outfit.bgColor }]}>
                  <Text style={{ fontSize: 24 }}>{outfit.top.emoji}</Text>
                  <Text style={{ fontSize: 20 }}>{outfit.bottom.emoji}</Text>
                </View>
                <Text style={styles.lookName}>{outfit.name}</Text>
                <Text style={styles.lookCreator}>@{outfit.creator}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {hasOutfit && (
          <TouchableOpacity style={styles.generateBtn}>
            <Text style={styles.generateBtnText}>⚡ Generate My Try-On</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, justifyContent: 'space-between' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { fontSize: 28, color: '#111', lineHeight: 32 },
  backText: { fontSize: 15, color: '#111', fontWeight: '500' },
  headerCenter: { alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 11, color: '#9CA3AF' },
  historyBtn: { backgroundColor: '#8B5CF6', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  historyText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  modeToggle: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 14, padding: 4, marginBottom: 16 },
  modeBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  modeBtnActive: { backgroundColor: '#111' },
  modeBtnText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  modeBtnTextActive: { color: '#fff' },
  tryOnArea: { flexDirection: 'row', marginHorizontal: 16, gap: 12, marginBottom: 20 },
  outfitPanel: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12, alignItems: 'center', position: 'relative', minHeight: 240, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  panelLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 8, alignSelf: 'flex-start' },
  outfitThumb: { width: '100%', height: 150, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  outfitPieces: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  pieceTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  pieceTagText: { fontSize: 10, fontWeight: '600', color: '#374151' },
  clearOutfit: { position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  clearIcon: { fontSize: 12, color: '#6B7280' },
  emptyOutfit: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyOutfitIcon: { fontSize: 32 },
  emptyOutfitText: { fontSize: 13, fontWeight: '700', color: '#111', textAlign: 'center' },
  emptyOutfitHint: { fontSize: 11, color: '#9CA3AF', textAlign: 'center' },
  photoPanel: { flex: 1, backgroundColor: '#111', borderRadius: 16, overflow: 'hidden', minHeight: 240 },
  cameraArea: { flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 16, minHeight: 240 },
  silhouette: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  silhouetteHead: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 4 },
  silhouetteBody: { width: 40, height: 80, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  captureBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  captureBtnInner: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff' },
  cameraHint: { fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 },
  mannequinArea: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 240, padding: 16 },
  moreLooks: { paddingHorizontal: 16, marginBottom: 20 },
  moreLooksHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  moreLooksTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  allBtn: { color: '#8B5CF6', fontWeight: '600', fontSize: 13 },
  lookCard: { width: 100, marginRight: 12, alignItems: 'center', borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  lookCardActive: { borderColor: '#8B5CF6' },
  lookThumb: { width: 100, height: 110, alignItems: 'center', justifyContent: 'center' },
  lookName: { fontSize: 11, fontWeight: '700', color: '#111', textAlign: 'center', marginTop: 4 },
  lookCreator: { fontSize: 10, color: '#9CA3AF', marginBottom: 4 },
  generateBtn: { marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  generateBtnText: { backgroundColor: '#8B5CF6', color: '#fff', fontWeight: '800', fontSize: 16, textAlign: 'center', padding: 18, borderRadius: 16 },
});
