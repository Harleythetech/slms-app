import { useState } from 'react';
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
import { Text } from '@/components/ui/Text';
import { FormField } from '@/components/ui/FormField';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepIndicator } from '@/components/ui/StepIndicator';

const STEPS = ['Personal', 'Academic', 'Documents', 'Credentials'];

const COURSES = [
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Computer Science',
  'Bachelor of Science in Education',
  'Bachelor of Science in Nursing',
  'Bachelor of Science in Business Administration',
  'Bachelor of Science in Criminology',
];

const STRANDS = [
  'STEM - Science, Technology, Engineering, Mathematics',
  'ABM - Accountancy, Business and Management',
  'HUMSS - Humanities and Social Sciences',
  'GAS - General Academic Strand',
  'TVL - Technical-Vocational-Livelihood',
];

export default function NewApplicant() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [strand, setStrand] = useState('');
  const [course, setCourse] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [schoolYear, setSchoolYear] = useState('');

  const [docs, setDocs] = useState({
    form138: false,
    birthCertificate: false,
    goodMoral: false,
    idPhoto: false,
  });

  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canNext =
    step === 1
      ? firstName.trim().length > 0 && lastName.trim().length > 0 && birthdate.trim().length > 0 && phone.trim().length > 0 && address.trim().length > 0
      : step === 2
        ? strand.length > 0 && course.length > 0 && previousSchool.trim().length > 0
        : step === 3
          ? Object.values(docs).every(Boolean)
          : email.trim().length > 0 && password.length >= 8 && password === confirmPassword;

  const formContent = (
    <View className="gap-6">
      <StepIndicator currentStep={step} totalSteps={STEPS.length} labels={STEPS} />

      <View className="gap-6">

        {/* ── STEP 1: Personal Info ── */}
        {step === 1 && (
          <>
            <SectionHeader title="Personal Information" subtitle="Provide your legal name and contact details." />
            <View className="gap-4">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <FormField label="First Name" placeholder="Juan" value={firstName} onChangeText={setFirstName} autoCapitalize="words" autoCorrect={false} />
                </View>
                <View className="flex-1">
                  <FormField label="Last Name" placeholder="Dela Cruz" value={lastName} onChangeText={setLastName} autoCapitalize="words" autoCorrect={false} />
                </View>
              </View>
              <FormField label="Middle Name (Optional)" placeholder="Santos" value={middleName} onChangeText={setMiddleName} autoCapitalize="words" autoCorrect={false} />
              <FormField label="Date of Birth" placeholder="MM/DD/YYYY" value={birthdate} onChangeText={setBirthdate} keyboardType="numbers-and-punctuation" />
              <FormField label="Contact Number" placeholder="09XX-XXX-XXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" autoComplete="tel" />
              <FormField
                label="Home Address"
                placeholder="Street, Barangay, Municipality, Province"
                value={address}
                onChangeText={setAddress}
                autoCapitalize="words"
                multiline
                numberOfLines={3}
              />
            </View>
          </>
        )}

        {/* ── STEP 2: Academic Info ── */}
        {step === 2 && (
          <>
            <SectionHeader title="Academic Information" subtitle="Tell us about your academic background and program preference." />
            <View className="gap-5">
              <View className="gap-2">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Senior High School Strand
                </Text>
                {STRANDS.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setStrand(s)}
                    className={`flex-row items-center gap-3 rounded-xl border p-4 ${
                      strand === s ? 'border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                    }`}>
                    <View className={`h-5 w-5 items-center justify-center rounded-full border-2 ${strand === s ? 'border-blue-700' : 'border-slate-300 dark:border-slate-600'}`}>
                      {strand === s && <View className="h-2.5 w-2.5 rounded-full bg-blue-700" />}
                    </View>
                    <Text className={`flex-1 text-sm ${strand === s ? 'font-semibold text-blue-700' : 'text-slate-700 dark:text-slate-300'}`}>{s}</Text>
                  </Pressable>
                ))}
              </View>

              <View className="gap-2">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Preferred Course / Program
                </Text>
                {COURSES.map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setCourse(c)}
                    className={`flex-row items-center gap-3 rounded-xl border p-4 ${
                      course === c ? 'border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                    }`}>
                    <View className={`h-5 w-5 items-center justify-center rounded-full border-2 ${course === c ? 'border-blue-700' : 'border-slate-300 dark:border-slate-600'}`}>
                      {course === c && <View className="h-2.5 w-2.5 rounded-full bg-blue-700" />}
                    </View>
                    <Text className={`flex-1 text-sm ${course === c ? 'font-semibold text-blue-700' : 'text-slate-700 dark:text-slate-300'}`}>{c}</Text>
                  </Pressable>
                ))}
              </View>

              <FormField label="Previous School" placeholder="Name of your Senior High School" value={previousSchool} onChangeText={setPreviousSchool} autoCapitalize="words" autoCorrect={false} />
              <FormField label="School Year Graduated" placeholder="e.g. 2023–2024" value={schoolYear} onChangeText={setSchoolYear} keyboardType="numbers-and-punctuation" />
            </View>
          </>
        )}

        {/* ── STEP 3: Documents ── */}
        {step === 3 && (
          <>
            <SectionHeader title="Document Requirements" subtitle="Mark each document as ready to proceed with your application." />
            <View className="gap-3">
              {(
                [
                  { key: 'form138', label: 'Form 138 (Report Card)', desc: 'Original or certified copy of your senior high school report card.' },
                  { key: 'birthCertificate', label: 'PSA Birth Certificate', desc: 'Philippine Statistics Authority issued birth certificate.' },
                  { key: 'goodMoral', label: 'Certificate of Good Moral Character', desc: 'Issued by your previous school.' },
                  { key: 'idPhoto', label: '2x2 ID Photo', desc: 'Recent photo with white background, formal attire.' },
                ] as const
              ).map(({ key, label, desc }) => (
                <Pressable
                  key={key}
                  onPress={() => setDocs((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`flex-row items-start gap-4 rounded-2xl border p-4 ${
                    docs[key] ? 'border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                  }`}>
                  <View className={`mt-0.5 h-10 w-10 items-center justify-center rounded-xl ${docs[key] ? 'bg-blue-700' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <Ionicons name={docs[key] ? 'checkmark' : 'document-outline'} size={20} color={docs[key] ? '#fff' : '#94a3b8'} />
                  </View>
                  <View className="flex-1 gap-0.5">
                    <Text className={`text-sm font-semibold ${docs[key] ? 'text-blue-700' : 'text-slate-900 dark:text-white'}`}>{label}</Text>
                    <Text className="text-xs text-slate-500 dark:text-slate-400">{desc}</Text>
                    <Text className={`mt-1 text-xs font-medium ${docs[key] ? 'text-blue-600' : 'text-slate-400'}`}>
                      {docs[key] ? 'Marked as ready' : 'Tap to mark as ready'}
                    </Text>
                  </View>
                </Pressable>
              ))}
              <View className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                <Text className="text-xs text-amber-700 dark:text-amber-400">
                  <Text className="font-semibold">Note: </Text>
                  Physical copies will be required upon enrollment. Mark each item once you have it prepared.
                </Text>
              </View>
            </View>
          </>
        )}

        {/* ── STEP 4: Credentials ── */}
        {step === 4 && (
          <>
            <SectionHeader title="Create your account" subtitle="Set up your login credentials for the student portal." />
            <View className="gap-4">
              <FormField
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />
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
              <View className="gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">Application Summary</Text>
                {[
                  { label: 'Name', value: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}` },
                  { label: 'Course', value: course || '—' },
                  { label: 'Strand', value: strand.split(' - ')[0] || '—' },
                  { label: 'Previous School', value: previousSchool || '—' },
                ].map(({ label, value }) => (
                  <View key={label} className="flex-row justify-between gap-4">
                    <Text className="text-xs text-slate-400">{label}</Text>
                    <Text className="flex-1 text-right text-xs font-medium text-slate-700 dark:text-slate-300" numberOfLines={1}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </View>

      {/* Actions */}
      <View className="gap-2">
        <Pressable
          onPress={() => {
            if (step < STEPS.length) setStep(step + 1);
            else router.replace('/auth/login');
          }}
          disabled={!canNext}
          accessibilityRole="button"
          className={`w-full rounded-xl p-4 ${canNext ? 'bg-blue-700 active:bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
          <Text className={`text-center text-base font-bold ${canNext ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            {step === STEPS.length ? 'Submit Application' : 'Continue'}
          </Text>
        </Pressable>
        {step === 3 && (
          <Text className="text-center text-xs text-slate-400">All documents must be marked as ready to continue.</Text>
        )}
      </View>
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
                Join the ISCP academic community today.
              </Text>
              <Text className="text-base leading-relaxed text-blue-100/80">
                Complete your application in just a few steps and begin your academic journey at ISCP.
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

            {/* Mobile top */}
            <View className="w-full flex-1 lg:hidden" style={{ minHeight: 280 }}>
              <Pressable
                onPress={() => (step > 1 ? setStep(step - 1) : router.push('/auth/register' as any))}
                className="flex-row items-center gap-2 px-6 pt-4">
                <Ionicons name="arrow-back" size={20} color="#94a3b8" />
                <Text className="text-sm text-slate-400">Back</Text>
              </Pressable>
              <View className="flex-1 items-center justify-center px-6 py-4">
                <Image source={require('@/assets/ISCP_SEAL.png')} style={{ width: 80, height: 80 }} className="mb-4" resizeMode="contain" />
                <Text className="text-2xl font-bold text-white">New Applicant</Text>
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
                  <Text className="text-2xl font-bold text-slate-900 dark:text-white">New Applicant</Text>
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
