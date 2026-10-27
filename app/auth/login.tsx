import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput } from '@/components/ui/Text';
import { GoogleLogo } from '@/components/ui/GoogleLogo';
import { useAuth } from '@/components/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  function handleLogin() {
    setError('');
    const user = login(email, password);
    if (!user) {
      setError('Invalid email or password. Try the demo accounts below.');
      return;
    }
    router.replace(user.homePath as any);
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top', 'bottom']}>
      <View className="flex-1 flex-col lg:flex-row">
        {/* LEFT PANEL: Full-Height Branding (Visible on Web / Large Screens Only) */}
        <View className="hidden bg-blue-800 p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between dark:bg-blue-950">
          <View className="flex-row items-center gap-4">
            <Image
              source={require('@/assets/ISCP_SEAL.png')}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text className="text-xl font-bold tracking-tight text-white">ISCP Student Portal</Text>
          </View>

          <View className="max-w-lg gap-4">
            <Text className="text-4xl font-extrabold leading-tight text-white">
              Access your courses, grades, and schedules in one place.
            </Text>
            <Text className="text-base leading-relaxed text-blue-100/80">
              Sign in with your institutional credentials to view learning modules, submit
              assessments, and track your academic progress.
            </Text>
            <Text className="text-xs text-blue-200/60">
              Academic Portal System - V1.0 | Experimental Build
            </Text>
          </View>
        </View>

        {/* RIGHT PANEL: Full-Screen Mobile View & Right-Half Web Form */}
        <ScrollView
          className="flex-1 bg-slate-950 lg:bg-white dark:bg-slate-950 lg:dark:bg-slate-950"
          contentContainerClassName="flex-grow items-center lg:items-stretch lg:px-16 lg:justify-center"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}>
          {/* Logo + Title — top on mobile */}
          <View className="w-full flex-1 items-center justify-center px-6 lg:hidden">
            <Image
              source={require('@/assets/ISCP_SEAL.png')}
              style={{ width: 200, height: 200 }}
              className="mb-4"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-white lg:text-slate-900 lg:dark:text-white">
              ISCP Student Portal
            </Text>
            <Text className="mt-1 text-center text-sm text-slate-300 lg:text-slate-500 lg:dark:text-slate-400">
              Sign in to access your academic dashboard.
            </Text>
          </View>

          {/* Main Form Container */}
          <View
            className="w-full gap-6 self-center rounded-tl-3xl rounded-tr-3xl bg-white px-6 pb-12 pt-8 lg:max-w-md lg:rounded-none lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 dark:bg-slate-900 lg:dark:bg-transparent"
            style={
              !isDesktop
                ? {
                    shadowColor: '#3b82f6',
                    shadowOffset: { width: 0, height: -8 },
                    shadowOpacity: 0.45,
                    shadowRadius: 24,
                    elevation: 20,
                  }
                : undefined
            }>
            {/* Header — desktop only */}
            <View className="hidden w-full lg:flex lg:items-start">
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back
              </Text>
              <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter your institutional email and password to login.
              </Text>
            </View>

            {/* Form Inputs */}
            <View className="w-full gap-4">
              <View className="gap-1.5">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email Address
                </Text>
                <TextInput
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-600"
                  placeholder="student@iscp.edu.ph"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View className="gap-1.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Password
                  </Text>
                  <Pressable onPress={() => router.push('/auth/forgot-password' as any)}>
                    <Text className="text-xs font-semibold text-blue-700 dark:text-blue-500">
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>

                <View className="relative justify-center">
                  <TextInput
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 pr-12 text-slate-900 outline-none focus:border-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-600"
                    placeholder="Enter your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 p-1"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#64748b"
                    />
                  </Pressable>
                </View>
              </View>

              {error ? (
                <View className="flex-row items-center gap-2 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-900/20">
                  <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
                  <Text className="text-sm text-red-600 dark:text-red-400">{error}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleLogin}
                accessibilityRole="button"
                accessibilityLabel="Login"
                className="mt-2 w-full rounded-xl bg-blue-700 p-4 hover:bg-blue-800 active:scale-[0.99] active:bg-blue-800">
                <Text className="text-center text-base font-bold text-white">Login</Text>
              </Pressable>
            </View>

            {/* Divider */}
            <View className="w-full flex-row items-center gap-3">
              <View className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <Text className="text-xs uppercase text-slate-400">or</Text>
              <View className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </View>

            {/* Google SSO */}
            <Pressable
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              className="w-full flex-row items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 hover:bg-slate-50 active:scale-[0.99] active:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 dark:active:bg-slate-800">
              <GoogleLogo size={20} />
              <Text className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Continue with Google
              </Text>
            </Pressable>
            {/* Sign Up Link */}
            <View className="items-center">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{' '}
                <Link
                  href={'/auth/register' as any}
                  className="font-semibold text-blue-700 dark:text-blue-500">
                  Sign up
                </Link>
              </Text>
            </View>

            {/* Demo Accounts */}
            <View className="gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
              <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Demo Accounts
              </Text>
              <View className="gap-1">
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  student@iscp.edu.ph / student123 → Student Portal
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  instructor@iscp.edu.ph / instructor123 → Instructor Portal
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  admin@iscp.edu.ph / admin123 → Admin Panel
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
