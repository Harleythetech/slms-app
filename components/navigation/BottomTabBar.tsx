import { Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';

interface TabItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  href: string;
}

const TABS: TabItem[] = [
  { label: 'Dashboard', icon: 'grid-outline',     iconFocused: 'grid',     href: '/student/dashboard' },
  { label: 'Courses',   icon: 'book-outline',     iconFocused: 'book',     href: '/student/courses' },
  { label: 'Grades',    icon: 'ribbon-outline',   iconFocused: 'ribbon',   href: '/student/grades' },
  { label: 'Profile',   icon: 'person-outline',   iconFocused: 'person',   href: '/student/profile' },
  { label: 'Settings',  icon: 'settings-outline', iconFocused: 'settings', href: '/student/settings' },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      style={{ paddingBottom: insets.bottom }}>
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Pressable
            key={tab.href}
            onPress={() => router.push(tab.href as any)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            className="flex-1 items-center justify-center py-3 active:opacity-70">
            <Ionicons
              name={isActive ? tab.iconFocused : tab.icon}
              size={22}
              color={isActive ? '#1d4ed8' : '#94a3b8'}
            />
            <Text variant="caption" weight={isActive ? 'semibold' : 'regular'}
              className={isActive ? 'mt-1 text-blue-700' : 'mt-1 text-slate-400'}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
