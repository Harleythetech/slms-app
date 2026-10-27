import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top', 'bottom']}>
      <View className="flex-1 flex-col lg:flex-row">

        {/* LEFT PANEL — Desktop Branding */}
        <View className="hidden bg-blue-800 p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between dark:bg-blue-950">
          <View className="flex-row items-center gap-4">
            <Image
              source={require('@/assets/ISCP_SEAL.png')}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text className="text-xl font-bold tracking-tight text-white">
              ISCP Student Portal
            </Text>
          </View>
          <View className="max-w-lg gap-4">
            <Text className="text-4xl font-extrabold leading-tight text-white">
              Join the ISCP academic community today.
            </Text>
            <Text className="text-base leading-relaxed text-blue-100/80">
              Whether you&apos;re an existing student or a new applicant, get started with your
              academic journey in just a few steps.
            </Text>
            <Text className="text-xs text-blue-200/60">
              Academic Portal System - V1.0 | Experimental Build
            </Text>
          </View>
        </View>

        {/* RIGHT PANEL */}
        <View className="flex-1 bg-slate-950 lg:bg-white lg:dark:bg-slate-950">
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: isDesktop ? 'center' : 'flex-start', paddingHorizontal: isDesktop ? 64 : 0 }}
            keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets={true}>

          {/* Logo + Title — mobile top, fills remaining space above card */}
          <View className="flex-1 items-center justify-center px-6 py-8 lg:hidden">
            <Image
              source={require('@/assets/ISCP_SEAL.png')}
              style={{ width: 200, height: 200 }}
              className="mb-4"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-white">ISCP Student Portal</Text>
            <Text className="mt-1 text-center text-sm text-slate-300">
              Choose how you&apos;d like to register.
            </Text>
          </View>

          {/* Card */}
          <View
            className="gap-6 bg-white px-6 pb-12 pt-8 dark:bg-slate-900"
            style={{
              width: '100%',
              ...(isDesktop ? {
                maxWidth: 448,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                paddingHorizontal: 0,
                paddingBottom: 0,
                paddingTop: 0,
              } : {
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: -8 },
                shadowOpacity: 0.45,
                shadowRadius: 24,
                elevation: 20,
              }),
            }}>

            {/* Desktop header */}
            <View className="hidden lg:flex lg:items-start">
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                Create an account
              </Text>
              <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose how you&apos;d like to register.
              </Text>
            </View>

            {/* Path Options */}
            <View className="gap-4">
              <Pressable
                onPress={() => router.push('/auth/register/existing-student')}
                accessibilityRole="button"
                accessibilityLabel="Register as existing student"
                className="w-full flex-row items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 active:scale-[0.99] active:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:active:bg-slate-700">
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40">
                  <Ionicons name="school-outline" size={24} color="#1d4ed8" />
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-base font-bold text-slate-900 dark:text-white">Existing Student</Text>
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    Already enrolled? Verify your student ID to get started.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </Pressable>

              <Pressable
                onPress={() => router.push('/auth/register/new-applicant')}
                accessibilityRole="button"
                accessibilityLabel="Register as new applicant"
                className="w-full flex-row items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 active:scale-[0.99] active:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:active:bg-slate-700">
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
                  <Ionicons name="person-add-outline" size={24} color="#059669" />
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-base font-bold text-slate-900 dark:text-white">New Applicant</Text>
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    Applying for the first time? Fill out the full application form.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </Pressable>
            </View>

            {/* Sign in link */}
            <View className="items-center">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-semibold text-blue-700 dark:text-blue-500">
                  Sign in
                </Link>
              </Text>
            </View>

          </View>
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}
