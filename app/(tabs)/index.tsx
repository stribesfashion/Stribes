import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FEED_FILTERS, FEED_POSTS, LOOK_CHAINS } from '../../data/mockData';
import MannequinAvatar from '../../components/MannequinAvatar';

function TrendBar({ label, percent, color, change }: any) {
  const anim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(anim, { toValue: percent, duration: 900, useNativeDriver: false }).start();
  }, []);
  return (
    <View style={styles.trendRow}>
      <Text style={styles.trendLabel}>{label}</Text>
      <View style={styles.trendBarBg}>
        <Animated.View style={[styles.trendBarFill, { width: anim.interpolate({ inputRange: [0,100], outputRange: ['0%','100%'] }), backgroundColor: color }]} />
      </View>
      <Text style={[styles.trendChange, { color: change > 0 ? '#10B981' : '#EF4444' }]}>{change > 0 ? `+${change}%` : `${change}%`}</Text>
    </View>
  );
}

function FeedPost({ post, onTryThis, onRemix }: any) {
  const [sauced, setSauced] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handleSauce = () => {
    setSauced(!sauced);
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.3, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postUserRow}>
          <View style={styles.userAvatar}><Text style={{ fontSize: 18 }}>{post.userEmoji}</Text></View>
          <View>
            <Text style={styles.postUsername}>{post.user}</Text>
            <Text style={styles.postTribe}>✦ {post.tribe}</Text>
          </View>
        </View>
        <Text style={styles.moreBtn}>···</Text>
      </View>
      <View style={[styles.outfitDisplay, { backgroundColor: post.outfit.bgColor }]}>
        <Text style={styles.outfitTribeBadge}>✦ {post.outfit.tribe.toUpperCase()}</Text>
        <MannequinAvatar outfit={post.outfit} size="large" showLabels />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemTagsScroll}>
        {post.items.map((item: string, i: number) => (
          <View key={i} style={styles.itemTag}><Text style={styles.itemTagText}>👕 {item}</Text></View>
        ))}
      </ScrollView>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.tryBtn} onPress={() => onTryThis(post.outfit)}>
          <Text style={styles.tryBtnText}>⚡ Try This Look</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.remixBtn} onPress={() => onRemix(post.outfit)}>
          <Text style={styles.remixBtnText}>↺ Remix — swap pieces</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sauceRow}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity onPress={handleSauce} style={styles.sauceBtn}>
            <Text style={styles.sauceDiamond}>✦</Text>
            <Text style={styles.sauceCount}>{sauced ? post.sauce + 1 : post.sauce}</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity><Text style={styles.commentIcon}>💬</Text></TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity><Text style={styles.bookmarkIcon}>🔖</Text></TouchableOpacity>
      </View>
      <Text style={styles.sauceLabel}><Text style={{ fontWeight: '700' }}>✦ {sauced ? post.sauce + 1 : post.sauce} sauce</Text></Text>
      <Text style={styles.postCaption}><Text style={{ fontWeight: '700' }}>{post.user}</Text> {post.caption}</Text>
      <Text style={styles.postTime}>{post.timeAgo}</Text>
    </View>
  );
}

function LookChainSection() {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Look Chains 🔗</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
      </View>
      {LOOK_CHAINS.map(chain => (
        <View key={chain.id} style={styles.chainCard}>
          <Text style={styles.chainName}>✦ {chain.chain[0].outfit.name} · {chain.remixCount} remixes this week</Text>
          {chain.chain.map((item, index) => (
            <View key={index} style={styles.chainItem}>
              <View style={styles.chainLeft}>
                <View style={styles.chainAvatar}><Text style={{ fontSize: 16 }}>{item.userEmoji}</Text></View>
                {index < chain.chain.length - 1 && <View style={styles.chainLine} />}
              </View>
              <View style={styles.chainContent}>
                <View style={styles.chainUserRow}>
                  <Text style={styles.chainUsername}>{item.user}</Text>
                  <View style={[styles.chainBadge, item.badge === 'original' ? styles.originalBadge : styles.remixBadge]}>
                    <Text style={styles.chainBadgeText}>{item.badge}</Text>
                  </View>
                </View>
                <Text style={styles.chainAction}>{item.action}</Text>
                <View style={styles.chainOutfitRow}>
                  <View style={[styles.chainOutfitThumb, { backgroundColor: item.outfit.bgColor }]}>
                    <Text style={{ fontSize: 20 }}>{item.outfit.top.emoji}</Text>
                  </View>
                  <View style={styles.chainOutfitInfo}>
                    <Text style={styles.chainOutfitName}>{item.outfit.name}</Text>
                    <Text style={styles.chainOutfitSauce}>✦ {(item.sauce / 1000).toFixed(1)}k sauce</Text>
                  </View>
                  <TouchableOpacity style={styles.chainTryBtn} onPress={() => router.push({ pathname: '/tryon', params: { outfitId: item.outfit.id } })}>
                    <Text style={styles.chainTryBtnText}>Try</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('For You');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>STRIBES</Text>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {FEED_FILTERS.map(filter => (
          <TouchableOpacity key={filter} style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]} onPress={() => setActiveFilter(filter)}>
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter === 'For You' ? '+ ' : ''}{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.trendCard}>
          <TrendBar label="Streetwear" percent={65} color="#EC4899" change={1} />
          <TrendBar label="Minimal" percent={45} color="#8B5CF6" change={-2} />
          <TrendBar label="Techwear" percent={30} color="#3B82F6" change={4} />
        </View>
        <LookChainSection />
        <View style={styles.section}>
          <View style={styles.alertBanner}>
            <Text style={styles.alertDot}>●</Text>
            <Text style={styles.alertText}>247 new looks dropped in your tribes · tap to explore</Text>
          </View>
          {FEED_POSTS.map(post => (
            <FeedPost key={post.id} post={post}
              onTryThis={(outfit: any) => router.push({ pathname: '/tryon', params: { outfitId: outfit.id } })}
              onRemix={(outfit: any) => router.push({ pathname: '/remix', params: { outfitId: outfit.id } })}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.styleReportBanner}>
          <Text style={styles.styleReportText}>✦ YOUR WEEKLY STYLE REPORT</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 8 },
  logo: { fontSize: 26, fontWeight: '900', color: '#EC4899', letterSpacing: 2, fontStyle: 'italic' },
  notifBtn: { position: 'relative', padding: 4 },
  notifIcon: { fontSize: 22 },
  notifDot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EC4899' },
  filterScroll: { paddingLeft: 16, marginBottom: 8, flexGrow: 0 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterChipActive: { backgroundColor: '#111' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filterTextActive: { color: '#fff' },
  trendCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#111', borderRadius: 16, padding: 16 },
  trendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  trendLabel: { width: 80, fontSize: 12, color: '#aaa' },
  trendBarBg: { flex: 1, height: 4, backgroundColor: '#333', borderRadius: 2, overflow: 'hidden' },
  trendBarFill: { height: '100%', borderRadius: 2 },
  trendChange: { width: 36, fontSize: 11, textAlign: 'right', fontWeight: '600' },
  section: { paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111' },
  viewAll: { fontSize: 13, color: '#EC4899', fontWeight: '600' },
  alertBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 12, padding: 12, marginBottom: 16 },
  alertDot: { color: '#EC4899', marginRight: 8, fontSize: 10 },
  alertText: { color: '#fff', fontSize: 13, fontWeight: '500', flex: 1 },
  postCard: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  postUserRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  userAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDE7F6', alignItems: 'center', justifyContent: 'center' },
  postUsername: { fontSize: 14, fontWeight: '700', color: '#111' },
  postTribe: { fontSize: 12, color: '#8B5CF6', fontWeight: '500' },
  moreBtn: { fontSize: 18, color: '#999', letterSpacing: 2 },
  outfitDisplay: { width: '100%', height: 360, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  outfitTribeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontSize: 11, fontWeight: '700', color: '#111' },
  itemTagsScroll: { paddingHorizontal: 14, paddingVertical: 10 },
  itemTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  itemTagText: { fontSize: 12, fontWeight: '600', color: '#333' },
  postActions: { paddingHorizontal: 14, gap: 8, marginBottom: 10 },
  tryBtn: { backgroundColor: '#ECFDF5', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#10B981' },
  tryBtnText: { color: '#10B981', fontWeight: '700', fontSize: 14 },
  remixBtn: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  remixBtnText: { color: '#374151', fontWeight: '600', fontSize: 14 },
  sauceRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 8, gap: 14 },
  sauceBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sauceDiamond: { fontSize: 18, color: '#8B5CF6' },
  sauceCount: { fontSize: 14, color: '#374151', fontWeight: '600' },
  commentIcon: { fontSize: 20 },
  bookmarkIcon: { fontSize: 20 },
  sauceLabel: { paddingHorizontal: 14, fontSize: 13, color: '#111', marginBottom: 4 },
  postCaption: { paddingHorizontal: 14, fontSize: 13, color: '#374151', marginBottom: 4 },
  postTime: { paddingHorizontal: 14, paddingBottom: 14, fontSize: 11, color: '#9CA3AF' },
  chainCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  chainName: { fontSize: 12, color: '#8B5CF6', fontWeight: '600', marginBottom: 16 },
  chainItem: { flexDirection: 'row', marginBottom: 8 },
  chainLeft: { alignItems: 'center', marginRight: 12, width: 36 },
  chainAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EDE7F6', alignItems: 'center', justifyContent: 'center' },
  chainLine: { width: 2, flex: 1, backgroundColor: '#DDD6FE', marginTop: 4, minHeight: 40 },
  chainContent: { flex: 1, paddingBottom: 16 },
  chainUserRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  chainUsername: { fontSize: 13, fontWeight: '700', color: '#111' },
  chainBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  originalBadge: { backgroundColor: '#FEF3C7' },
  remixBadge: { backgroundColor: '#EDE7F6' },
  chainBadgeText: { fontSize: 10, fontWeight: '700', color: '#374151', textTransform: 'uppercase' },
  chainAction: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  chainOutfitRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 10 },
  chainOutfitThumb: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  chainOutfitInfo: { flex: 1 },
  chainOutfitName: { fontSize: 13, fontWeight: '700', color: '#111' },
  chainOutfitSauce: { fontSize: 11, color: '#8B5CF6' },
  chainTryBtn: { backgroundColor: '#8B5CF6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  chainTryBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  styleReportBanner: { marginHorizontal: 16, backgroundColor: '#111', borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 8 },
  styleReportText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
});
