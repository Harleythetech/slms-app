import { Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';

const PAGE_TITLES: Record<string, string> = {
  '/student/dashboard': 'Dashboard',
  '/student/courses':   'Courses',
  '/student/grades':    'Grades',
  '/student/profile':   'Profile',
  '/student/settings':  'Settings',
};

function getTitle(pathname: string): string {
  for (const [key, value] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(key)) return value;
  }
  return 'Student Portal';
}

export function TopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const title = getTitle(pathname);

  return (
    <View className="hidden flex-row items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 lg:flex">

      <Text variant="subheading" weight="bold">{title}</Text>

      <View className="flex-row items-center gap-3">
        {/* Notifications */}
        <Pressable
          accessibilityLabel="Notifications"
          className="relative h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 active:opacity-70 dark:hover:bg-slate-800">
          <Ionicons name="notifications-outline" size={20} color="#64748b" />
          <View className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-700" />
        </Pressable>

        {/* Settings */}
        <Pressable
          onPress={() => router.push('/student/settings' as any)}
          accessibilityLabel="Settings"
          className="h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 active:opacity-70 dark:hover:bg-slate-800">
          <Ionicons
            name={pathname.startsWith('/student/settings') ? 'settings' : 'settings-outline'}
            size={20}
            color={pathname.startsWith('/student/settings') ? '#1d4ed8' : '#64748b'}
          />
        </Pressable>

        {/* Avatar */}
        <Pressable
          onPress={() => router.push('/student/profile' as any)}
          accessibilityLabel="Profile"
          className="h-9 w-9 items-center justify-center rounded-full bg-blue-700 active:opacity-70">
          <Text variant="label" weight="bold" color="white">JD</Text>
        </Pressable>
      </View>
    </View>
  );
}
