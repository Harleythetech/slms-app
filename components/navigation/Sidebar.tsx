import { Image, Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/components/context/AuthContext';

interface NavItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'grid-outline', iconFocused: 'grid', href: '/student/dashboard' },
  { label: 'Courses', icon: 'book-outline', iconFocused: 'book', href: '/student/courses' },
  { label: 'Grades', icon: 'ribbon-outline', iconFocused: 'ribbon', href: '/student/grades' },
  { label: 'Profile', icon: 'person-outline', iconFocused: 'person', href: '/student/profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View className="hidden h-full w-64 flex-col border-r border-slate-200 bg-white lg:flex dark:border-slate-800 dark:bg-slate-950">
      {/* Logo */}
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
            Student
          </Text>
        </View>
      </View>

      {/* Nav Items */}
      <View className="flex-1 gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Pressable
              key={item.href}
              onPress={() => router.push(item.href as any)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              className={`flex-row items-center gap-3 rounded-xl px-3 py-3 active:opacity-80 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}>
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

      {/* Bottom — Settings + Sign out */}
      <View className="gap-1 border-t border-slate-200 px-3 py-4 dark:border-slate-800">
        {(() => {
          const isActive = pathname.startsWith('/student/settings');
          return (
            <Pressable
              onPress={() => router.push('/student/settings' as any)}
              className={`flex-row items-center gap-3 rounded-xl px-3 py-3 active:opacity-80 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}>
              <Ionicons
                name={isActive ? 'settings' : 'settings-outline'}
                size={20}
                color={isActive ? '#1d4ed8' : '#64748b'}
              />
              <Text
                variant="label"
                weight={isActive ? 'semibold' : 'medium'}
                className={isActive ? 'text-blue-700' : 'text-slate-600 dark:text-slate-400'}>
                Settings
              </Text>
              {isActive && <View className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-700" />}
            </Pressable>
          );
        })()}
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
