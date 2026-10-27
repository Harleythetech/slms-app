import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput } from '@/components/ui/Text';
import { FormField } from '@/components/ui/FormField';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepIndicator } from '@/components/ui/StepIndicator';

const STEPS = ['Verification', 'OTP', 'Set Password'];

export default function ExistingStudent() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const [step, setStep] = useState(1);

  // Step 1
  const [studentId, setStudentId] = useState('');
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
      ? studentId.trim().length > 0 && email.trim().length > 0
      : step === 2
        ? otp.every((d) => d.length === 1)
        : password.length >= 8 && password === confirmPassword;

  const formContent = (
    <View className="gap-6">
      <StepIndicator currentStep={step} totalSteps={STEPS.length} labels={STEPS} />

      <View className="gap-6">
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            <SectionHeader
              title="Verify your identity"
              subtitle="Enter your student ID and institutional email address."
            />
            <View className="gap-4">
              <FormField
                label="Student ID"
                placeholder="2024-00000"
                value={studentId}
                onChangeText={setStudentId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormField
                label="Email Address"
                placeholder="student@institution.edu"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />
            </View>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            <SectionHeader
              title="Enter verification code"
              subtitle={`We sent a 6-digit code to ${email}. Enter it below.`}
            />
            <View className="gap-6 items-center">
              <View className="flex-row justify-between gap-2" style={{ maxWidth: 320, width: "100%" }}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(r: any) => (otpRefs.current[i] = r)}
                    value={digit}
                    onChangeText={(v) => handleOtpChange(v, i)}
                    onKeyPress={(e) => handleOtpKeyPress(e, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={{ width: 44, height: 52 }} className={`rounded-xl border text-center text-xl font-bold text-black dark:text-white ${digit ? 'border-blue-700' : 'border-slate-200 dark:border-slate-700'}`}
                    placeholderTextColor="#475569"
                  />
                ))}
              </View>
              <Pressable onPress={() => {}} className="items-center">
                <Text className="text-sm font-semibold text-blue-700 dark:text-blue-500">
                  Didn&apos;t receive a code? Resend
                </Text>
              </Pressable>
            </View>
          </>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <>
            <SectionHeader
              title="Set your password"
              subtitle="Create a strong password for your account."
            />
            <View className="gap-4">
              <FormField
                label="Password"
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                suffix={
                  <Pressable onPress={() => setShowPassword(!showPassword)} accessibilityLabel={showPassword ? 'Hide' : 'Show'}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
                  </Pressable>
                }
              />
              <FormField
                label="Confirm Password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                error={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : undefined}
                suffix={
                  <Pressable onPress={() => setShowConfirm(!showConfirm)} accessibilityLabel={showConfirm ? 'Hide' : 'Show'}>
                    <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
                  </Pressable>
                }
              />
              <View className="gap-1.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                {[
                  { label: 'At least 8 characters', met: password.length >= 8 },
                  { label: 'Contains a number', met: /\d/.test(password) },
                  { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
                ].map(({ label, met }) => (
                  <View key={label} className="flex-row items-center gap-2">
                    <Ionicons name={met ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={met ? '#16a34a' : '#94a3b8'} />
                    <Text className={`text-sm ${met ? 'text-green-600 dark:text-green-500' : 'text-slate-400'}`}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </View>

      {/* Actions */}
      <Pressable
        onPress={() => {
          if (step < STEPS.length) setStep(step + 1);
          else router.replace('/auth/login');
        }}
        disabled={!canNext}
        accessibilityRole="button"
        className={`w-full rounded-xl p-4 ${canNext ? 'bg-blue-700 active:bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
        <Text className={`text-center text-base font-bold ${canNext ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
          {step === STEPS.length ? 'Complete Registration' : 'Continue'}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top', 'bottom']}>

        <View className="flex-1 flex-col lg:flex-row">

          {/* LEFT PANEL — Desktop */}
          <View className="hidden bg-blue-800 p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between dark:bg-blue-950">
            <View className="flex-row items-center gap-4">
              <Image source={require('@/assets/ISCP_SEAL.png')} style={{ width: 100, height: 100 }} resizeMode="contain" />
              <Text className="text-xl font-bold tracking-tight text-white">ISCP Student Portal</Text>
            </View>
            <View className="max-w-lg gap-4">
              <Text className="text-4xl font-extrabold leading-tight text-white">
                Welcome back to the ISCP community.
              </Text>
              <Text className="text-base leading-relaxed text-blue-100/80">
                Verify your student ID to connect your existing enrollment record to your new portal account.
              </Text>
              <Text className="text-xs text-blue-200/60">Academic Portal System - V1.0 | Experimental Build</Text>
            </View>
          </View>

          {/* RIGHT PANEL */}
          <View className="flex-1 bg-slate-950 lg:bg-white lg:dark:bg-slate-950">
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, justifyContent: isDesktop ? 'center' : 'flex-start', paddingHorizontal: isDesktop ? 64 : 0 }}
              keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets={true}>

            {/* Mobile top — back + branding */}
            <View className="w-full flex-1 lg:hidden" style={{ minHeight: 280 }}>
              <Pressable
                onPress={() => (step > 1 ? setStep(step - 1) : router.push('/auth/register' as any))}
                className="flex-row items-center gap-2 px-6 pt-4">
                <Ionicons name="arrow-back" size={20} color="#94a3b8" />
                <Text className="text-sm text-slate-400">Back</Text>
              </Pressable>
              <View className="flex-1 items-center justify-center px-6 py-4">
                <Image source={require('@/assets/ISCP_SEAL.png')} style={{ width: 80, height: 80 }} className="mb-4" resizeMode="contain" />
                <Text className="text-2xl font-bold text-white">Existing Student</Text>
                <Text className="mt-1 text-center text-sm text-slate-300">Step {step} of {STEPS.length} — {STEPS[step - 1]}</Text>
              </View>
            </View>

            {/* Form card */}
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

              {/* Desktop back + header */}
              <View className="hidden lg:flex lg:flex-row lg:items-center lg:gap-3">
                <Pressable
                  onPress={() => (step > 1 ? setStep(step - 1) : router.push('/auth/register' as any))}
                  className="h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                  accessibilityLabel="Go back">
                  <Ionicons name="arrow-back" size={20} color="#64748b" />
                </Pressable>
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-white">Existing Student</Text>
                  <Text className="text-sm text-slate-500 dark:text-slate-400">Step {step} of {STEPS.length}</Text>
                </View>
              </View>

              {formContent}
            </View>
            </ScrollView>
          </View>
        </View>

    </SafeAreaView>
  );
}
