import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Text, TextInput } from '@/components/ui/Text';
import { StepIndicator } from '@/components/ui/StepIndicator';

const STEPS = ['Email', 'Verify', 'Reset'];

export default function ForgotPassword() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme().colorScheme;
  const dark = scheme === 'dark';
  const isDesktop = width >= 1024;

  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState('');

  // Step 2
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<any[]>([]);

  // Step 3
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleOtpChange(value: string, index: number) {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyPress(e: any, index: number) {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  const canNext =
    step === 1
      ? email.trim().length > 0
      : step === 2
        ? otp.every((d) => d.length === 1)
        : password.length >= 8 && password === confirmPassword;

  const stepMeta = [
    {
      title: 'Forgot your password?',
      subtitle: "Enter your institutional email and we'll send you a verification code.",
    },
    {
      title: 'Check your email',
      subtitle: `We sent a 6-digit code to ${email}. Enter it below to continue.`,
    },
    {
      title: 'Set a new password',
      subtitle: 'Create a strong new password for your account.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top', 'bottom']}>
      <View className="flex-1 flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <View className="hidden bg-blue-800 p-12 dark:bg-blue-950 lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
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
              Let&apos;s get you back in.
            </Text>
            <Text className="text-base leading-relaxed text-blue-100/80">
              Reset your password in just a few steps using your institutional email address.
            </Text>
            <Text className="text-xs text-blue-200/60">
              Academic Portal System - V1.0 | Experimental Build
            </Text>
          </View>
        </View>

        {/* RIGHT PANEL */}
        <ScrollView
          className="flex-1 bg-slate-950 lg:bg-white lg:dark:bg-slate-950"
          contentContainerClassName="flex-grow lg:items-stretch lg:px-16 lg:justify-center"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}>
          {/* Mobile top */}
          <View className="w-full flex-1 lg:hidden" style={{ minHeight: 280 }}>
            <Pressable
              onPress={() => (step > 1 ? setStep(step - 1) : router.push('/auth/login' as any))}
              className="flex-row items-center gap-2 px-6 pt-4">
              <Ionicons name="arrow-back" size={20} color="#94a3b8" />
              <Text className="text-sm text-slate-400">Back</Text>
            </Pressable>
            <View className="flex-1 items-center justify-center px-6 py-4">
              <Image
                source={require('@/assets/ISCP_SEAL.png')}
                style={{ width: 80, height: 80 }}
                className="mb-4"
                resizeMode="contain"
              />
              <Text className="text-center text-2xl font-bold text-white">
                {stepMeta[step - 1].title}
              </Text>
              <Text className="mt-2 px-4 text-center text-sm text-slate-300">
                {stepMeta[step - 1].subtitle}
              </Text>
            </View>
          </View>

          {/* Form card */}
          <View
            className="w-full gap-6 bg-white px-6 pb-12 pt-8 dark:bg-slate-900"
            style={{
              ...(isDesktop
                ? {
                    maxWidth: 448,
                    alignSelf: 'center',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }
                : {
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
            <View className="hidden lg:flex lg:flex-col lg:gap-1">
              <Pressable
                onPress={() => (step > 1 ? setStep(step - 1) : router.push('/auth/login' as any))}
                className="mb-4 flex-row items-center gap-2 self-start">
                <Ionicons name="arrow-back" size={18} color="#64748b" />
                <Text className="text-sm text-slate-500 dark:text-slate-400">Back to login</Text>
              </Pressable>
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                {stepMeta[step - 1].title}
              </Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                {stepMeta[step - 1].subtitle}
              </Text>
            </View>

            {/* Step indicator */}
            <StepIndicator currentStep={step} totalSteps={STEPS.length} labels={STEPS} />

            {/* ── STEP 1: Email ── */}
            {step === 1 && (
              <View className="gap-1.5">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email Address
                </Text>
                <TextInput
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-700 dark:border-slate-700 dark:focus:border-blue-600"
                  style={{
                    backgroundColor: dark ? '#1e293b' : '#f8fafc',
                    color: dark ? '#f1f5f9' : '#0f172a',
                  }}
                  placeholder="student@institution.edu"
                  placeholderTextColor={dark ? '#475569' : '#94a3b8'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                />
              </View>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 2 && (
              <View className="items-center gap-4">
                <View
                  className="flex-row justify-between gap-2"
                  style={{ maxWidth: 320, width: '100%' }}>
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(r: any) => (otpRefs.current[i] = r)}
                      value={digit}
                      onChangeText={(v) => handleOtpChange(v, i)}
                      onKeyPress={(e) => handleOtpKeyPress(e, i)}
                      keyboardType="number-pad"
                      maxLength={1}
                      className={`rounded-xl border text-center text-xl font-bold ${
                        digit ? 'border-blue-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                      style={{
                        width: 44,
                        height: 52,
                        backgroundColor: dark ? '#1e293b' : '#f8fafc',
                        color: dark ? '#f1f5f9' : '#0f172a',
                      }}
                      placeholderTextColor={dark ? '#475569' : '#94a3b8'}
                    />
                  ))}
                </View>
                <Pressable onPress={() => {}} className="items-center">
                  <Text className="text-sm font-semibold text-blue-700 dark:text-blue-500">
                    Didn&apos;t receive a code? Resend
                  </Text>
                </Pressable>
              </View>
            )}

            {/* ── STEP 3: New Password ── */}
            {step === 3 && (
              <View className="gap-4">
                {/* Password */}
                <View className="gap-1.5">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    New Password
                  </Text>
                  <View className="relative justify-center">
                    <TextInput
                      className="w-full rounded-xl border border-slate-200 p-4 pr-12 outline-none focus:border-blue-700 dark:border-slate-700 dark:focus:border-blue-600"
                      style={{
                        backgroundColor: dark ? '#1e293b' : '#f8fafc',
                        color: dark ? '#f1f5f9' : '#0f172a',
                      }}
                      placeholder="At least 8 characters"
                      placeholderTextColor={dark ? '#475569' : '#94a3b8'}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect={false}
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

                {/* Confirm Password */}
                <View className="gap-1.5">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Confirm Password
                  </Text>
                  <View className="relative justify-center">
                    <TextInput
                      className={`w-full rounded-xl border p-4 pr-12 outline-none ${
                        confirmPassword.length > 0 && password !== confirmPassword
                          ? 'border-red-400 dark:border-red-500'
                          : 'border-slate-200 focus:border-blue-700 dark:border-slate-700 dark:focus:border-blue-600'
                      }`}
                      style={{
                        backgroundColor: dark ? '#1e293b' : '#f8fafc',
                        color: dark ? '#f1f5f9' : '#0f172a',
                      }}
                      placeholder="Repeat your password"
                      placeholderTextColor={dark ? '#475569' : '#94a3b8'}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirm}
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect={false}
                    />
                    <Pressable
                      onPress={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 p-1"
                      accessibilityLabel={showConfirm ? 'Hide password' : 'Show password'}>
                      <Ionicons
                        name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#64748b"
                      />
                    </Pressable>
                  </View>
                  {confirmPassword.length > 0 && password !== confirmPassword && (
                    <Text className="text-xs text-red-500">Passwords do not match</Text>
                  )}
                </View>

                {/* Password strength */}
                <View className="gap-1.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                  {[
                    { label: 'At least 8 characters', met: password.length >= 8 },
                    { label: 'Contains a number', met: /\d/.test(password) },
                    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
                  ].map(({ label, met }) => (
                    <View key={label} className="flex-row items-center gap-2">
                      <Ionicons
                        name={met ? 'checkmark-circle' : 'ellipse-outline'}
                        size={16}
                        color={met ? '#16a34a' : '#94a3b8'}
                      />
                      <Text
                        className={`text-sm ${met ? 'text-green-600 dark:text-green-500' : 'text-slate-400'}`}>
                        {label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* CTA */}
            <Pressable
              onPress={() => {
                if (step < STEPS.length) setStep(step + 1);
                else router.replace('/auth/login' as any);
              }}
              disabled={!canNext}
              accessibilityRole="button"
              className={`w-full rounded-xl p-4 ${canNext ? 'bg-blue-700 active:bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <Text
                className={`text-center text-base font-bold ${canNext ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                {step === 1
                  ? 'Send Verification Code'
                  : step === 2
                    ? 'Verify Code'
                    : 'Reset Password'}
              </Text>
            </Pressable>

            {/* Back to login */}
            <View className="items-center">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Remember your password?{' '}
                <Text
                  onPress={() => router.push('/auth/login' as any)}
                  className="font-semibold text-blue-700 dark:text-blue-500">
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
