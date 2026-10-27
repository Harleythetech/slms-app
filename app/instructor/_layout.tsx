import { View } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/components/context/AuthContext';

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV = [
  {
    label: 'Dashboard',
    icon: 'grid-outline' as const,
    iconFocused: 'grid' as const,
    href: '/instructor',
  },
  {
    label: 'Sections',
    icon: 'people-outline' as const,
    iconFocused: 'people' as const,
    href: '/instructor/section',
  },
  {
    label: 'Grading',
    icon: 'ribbon-outline' as const,
    iconFocused: 'ribbon' as const,
    href: '/instructor/grading',
  },
  {
    label: 'Settings',
    icon: 'settings-outline' as const,
    iconFocused: 'settings' as const,
    href: '/instructor/settings',
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View className="hidden h-full w-64 flex-col border-r border-slate-200 bg-white lg:flex dark:border-slate-800 dark:bg-slate-950">
      <View className="flex-row items-center gap-3 border-b border-slate-200 px-5 py-5 dark:border-slate-800">
        <Image
          source={require('@/assets/ISCP_SEAL.png')}
          style={{ width: 36, height: 36 }}
          resizeMode="contain"
        />
        <View>
          <Text variant="label" weight="bold">
            ISCP Portal
          </Text>
          <Text variant="caption" color="muted">
            Instructor
          </Text>
        </View>
      </View>
      <View className="flex-1 gap-1 px-3 py-4">
        {NAV.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/instructor' && pathname.startsWith(item.href));
          return (
            <Pressable
              key={item.href}
              onPress={() => router.push(item.href as any)}
              className={`flex-row items-center gap-3 rounded-xl px-3 py-3 active:opacity-80 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
              <Ionicons
                name={isActive ? item.iconFocused : item.icon}
                size={20}
                color={isActive ? '#1d4ed8' : '#64748b'}
              />
              <Text
                variant="label"
                weight={isActive ? 'semibold' : 'medium'}
                className={isActive ? 'text-blue-700' : 'text-slate-600 dark:text-slate-400'}>
                {item.label}
              </Text>
              {isActive && <View className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-700" />}
            </Pressable>
          );
        })}
      </View>
      <View className="border-t border-slate-200 px-3 py-4 dark:border-slate-800">
        <Pressable
          onPress={() => {
            logout();
            router.replace('/auth/login' as any);
          }}
          className="flex-row items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-100 active:opacity-80 dark:hover:bg-slate-800/60">
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text variant="label" weight="medium" className="text-red-500">
            Sign out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  '/instructor': 'Dashboard',
  '/instructor/section': 'Sections',
  '/instructor/grading': 'Grading',
  '/instructor/settings': 'Settings',
};

function TopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const title =
    Object.entries(PAGE_TITLES).find(
      ([key]) => pathname === key || pathname.startsWith(key + '/')
    )?.[1] ?? 'Instructor Portal';

  return (
    <View className="hidden flex-row items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:flex dark:border-slate-800 dark:bg-slate-950">
      <Text variant="subheading" weight="bold">
        {title}
      </Text>
      <View className="flex-row items-center gap-3">
        <Pressable className="relative h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 active:opacity-70 dark:hover:bg-slate-800">
          <Ionicons name="notifications-outline" size={20} color="#64748b" />
          <View className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-700" />
        </Pressable>
        <Pressable
          onPress={() => router.push('/instructor/settings' as any)}
          className="h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 active:opacity-70 dark:hover:bg-slate-800">
          <Ionicons
            name={pathname.startsWith('/instructor/settings') ? 'settings' : 'settings-outline'}
            size={20}
            color={pathname.startsWith('/instructor/settings') ? '#1d4ed8' : '#64748b'}
          />
        </Pressable>
        <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-blue-700 active:opacity-70">
          <Text variant="label" weight="bold" color="white">
            MS
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────

function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      style={{ paddingBottom: insets.bottom }}>
      {NAV.map((tab) => {
        const isActive =
          pathname === tab.href || (tab.href !== '/instructor' && pathname.startsWith(tab.href));
        return (
          <Pressable
            key={tab.href}
            onPress={() => router.push(tab.href as any)}
            className="flex-1 items-center justify-center py-3 active:opacity-70">
            <Ionicons
              name={isActive ? tab.iconFocused : tab.icon}
              size={22}
              color={isActive ? '#1d4ed8' : '#94a3b8'}
            />
            <Text
              variant="caption"
              weight={isActive ? 'semibold' : 'regular'}
              className={isActive ? 'mt-1 text-blue-700' : 'mt-1 text-slate-400'}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function InstructorLayout() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top', 'bottom']}>
      <View className="flex-1 lg:flex-row">
        <Sidebar />
        <View className="flex-1">
          <TopHeader />
          <View className="flex-1">
            <Slot />
          </View>
        </View>
        <View className="lg:hidden">
          <BottomTabBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
