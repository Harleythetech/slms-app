import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Stack.Screen options={{ title: 'Page not found', headerShown: false }} />

      {/* Decorative background blobs */}
      <View className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 dark:bg-indigo-500/25" />
      <View className="absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-sky-400/20 dark:bg-sky-500/20" />
      <View className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-violet-500/20 dark:bg-violet-500/20" />

      <SafeAreaView className="flex-1 px-6 py-4">
        {/* Main content */}
        <View className="flex-1 items-center justify-center">
          {/* Icon card */}
          <View className="mb-6 h-28 w-28 items-center justify-center rounded-[32px] bg-indigo-600 shadow-2xl shadow-indigo-500/40 dark:bg-indigo-500">
            <View className="absolute inset-0 rounded-[32px] border border-white/20" />
            <Ionicons name="school" size={52} color="white" />
            <View className="absolute -bottom-2 -right-2 h-10 w-10 items-center justify-center rounded-full border-4 border-slate-50 bg-rose-500 dark:border-slate-950">
              <Ionicons name="help" size={20} color="white" />
            </View>
          </View>

          {/* 404 */}
          <Text className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white">
            4
            <Text className="text-indigo-600 dark:text-indigo-400">0</Text>4
          </Text>

          <Text className="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white">
            Looks like you skipped class
          </Text>
          <Text className="mt-3 max-w-xs text-center text-base leading-6 text-slate-500 dark:text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
            back to your lessons.
          </Text>

          {/* Actions */}
          <View className="mt-10 w-full max-w-sm gap-3">
            <Link href="/" asChild>
              <Pressable className="flex-row items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 shadow-lg shadow-indigo-500/30 active:scale-95 active:bg-indigo-700 dark:bg-indigo-500">
                <Ionicons name="home" size={18} color="white" />
                <Text className="text-base font-bold text-white">Back to Home</Text>
              </Pressable>
            </Link>

            {router.canGoBack() && (
              <Pressable
                onPress={() => router.back()}
                className="flex-row items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 active:scale-95 active:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:active:bg-slate-800">
                <Ionicons name="arrow-back" size={18} color="#6366f1" />
                <Text className="text-base font-semibold text-slate-700 dark:text-slate-200">
                  Go Back
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Footer */}
        <Text className="pb-2 text-center text-xs font-medium tracking-wide text-slate-400 dark:text-slate-600">
          Student Learning Management System
        </Text>
      </SafeAreaView>
    </View>
  );
}
