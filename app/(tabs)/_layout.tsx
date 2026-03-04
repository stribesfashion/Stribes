import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'index', label: 'Home', icon: '⌂', route: '/' },
    { name: 'tryon', label: 'Try-On', icon: '◈', route: '/tryon' },
    { name: 'center', label: '', icon: '+', route: '/post' },
    { name: 'tribes', label: 'Tribes', icon: '⚇', route: '/tribes' },
    { name: 'me', label: 'Me', icon: '◉', route: '/me' },
  ];

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
      {tabs.map((tab, index) => {
        if (tab.name === 'center') {
          return (
            <TouchableOpacity key="center" style={styles.centerButton} onPress={() => router.push('/post')} activeOpacity={0.85}>
              <Text style={styles.centerIcon}>+</Text>
            </TouchableOpacity>
          );
        }
        const isActive = (pathname === '/' && tab.name === 'index') || (tab.name !== 'index' && pathname.includes(tab.name));
        return (
          <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={() => router.push(tab.route as any)} activeOpacity={0.7}>
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={() => <CustomTabBar />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tryon" />
      <Tabs.Screen name="tribes" />
      <Tabs.Screen name="me" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0', alignItems: 'center', justifyContent: 'space-around' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  tabIcon: { fontSize: 20, color: '#999' },
  tabIconActive: { color: '#8B5CF6' },
  tabLabel: { fontSize: 10, color: '#999', marginTop: 2, fontWeight: '500' },
  tabLabelActive: { color: '#8B5CF6', fontWeight: '700' },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#8B5CF6', marginTop: 2 },
  centerButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center', marginBottom: 10, shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 },
  centerIcon: { fontSize: 28, color: '#fff', fontWeight: '300', lineHeight: 32 },
});
