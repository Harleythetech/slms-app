import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/context/AuthContext';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STUDENT = {
  name: 'Juan Dela Cruz',
  initials: 'JD',
  id: '2024-00001',
  email: 'juan.delacruz@iscp.edu.ph',
  phone: '09XX-XXX-XXXX',
  course: 'BS Information Technology',
  year: '1st Year',
  section: 'BSIT-1A',
  semester: '1st Semester',
  ay: 'AY 2024–2025',
  address: 'Brgy. San Juan, Satura, Philippines',
  birthdate: 'January 1, 2006',
  gender: 'Male',
  status: 'Enrolled',
  gwa: '1.50',
  units: '24',
};

const ACCOUNT_ITEMS = [
  { label: 'Email Address', value: STUDENT.email, icon: 'mail-outline' as const },
  { label: 'Phone Number', value: STUDENT.phone, icon: 'call-outline' as const },
  {
    label: 'Password',
    value: '••••••••••',
    icon: 'lock-closed-outline' as const,
    action: 'Change',
  },
];

const PERSONAL_ITEMS = [
  { label: 'Full Name', value: STUDENT.name, icon: 'person-outline' as const },
  { label: 'Date of Birth', value: STUDENT.birthdate, icon: 'calendar-outline' as const },
  { label: 'Gender', value: STUDENT.gender, icon: 'transgender-outline' as const },
  { label: 'Home Address', value: STUDENT.address, icon: 'home-outline' as const },
];

const ACADEMIC_ITEMS = [
  { label: 'Student ID', value: STUDENT.id, icon: 'card-outline' as const },
  { label: 'Course / Program', value: STUDENT.course, icon: 'school-outline' as const },
  { label: 'Year Level', value: STUDENT.year, icon: 'layers-outline' as const },
  { label: 'Section', value: STUDENT.section, icon: 'people-outline' as const },
  {
    label: 'Academic Year',
    value: `${STUDENT.semester} · ${STUDENT.ay}`,
    icon: 'calendar-number-outline' as const,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  icon,
  action,
  last = false,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  action?: string;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center gap-3 py-3 ${!last ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="bg-slate-100 dark:bg-slate-800">
        <Ionicons name={icon} size={18} color="#64748b" />
      </View>
      <View className="flex-1 gap-0.5">
        <Text variant="caption" color="muted">
          {label}
        </Text>
        <Text variant="label" weight="medium">
          {value}
        </Text>
      </View>
      {action && (
        <Pressable>
          <Text variant="caption" weight="semibold" color="accent">
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}) {
  return (
    <Card size="full">
      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name={icon} size={18} color="#1d4ed8" />
          <Text variant="subheading" weight="semibold">
            {title}
          </Text>
        </View>
        <View className="h-px bg-slate-200 dark:bg-slate-700" />
        {children}
      </View>
    </Card>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      {/* ── Avatar + Identity Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="items-center gap-4 lg:flex-row lg:items-center">
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-blue-200 dark:bg-blue-800">
              <Text
                variant="heading"
                weight="bold"
                className="text-blue-700 dark:text-blue-300"
                style={{ fontSize: 32 }}>
                {STUDENT.initials}
              </Text>
            </View>

            {/* Info */}
            <View className="flex-1 items-center gap-1 lg:items-start">
              <Text variant="heading" weight="bold">
                {STUDENT.name}
              </Text>
              <Text variant="label" color="muted">
                {STUDENT.id} · {STUDENT.course}
              </Text>
              <Text variant="caption" color="muted">
                {STUDENT.year} · {STUDENT.section} · {STUDENT.semester}
              </Text>
              <View className="mt-1 flex-row gap-2">
                <View className="rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/40">
                  <Text
                    variant="caption"
                    weight="semibold"
                    className="text-green-700 dark:text-green-400">
                    {STUDENT.status}
                  </Text>
                </View>
                <View className="rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/40">
                  <Text
                    variant="caption"
                    weight="semibold"
                    className="text-blue-700 dark:text-blue-400">
                    GWA {STUDENT.gwa}
                  </Text>
                </View>
                <View className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                  <Text variant="caption" weight="semibold" color="muted">
                    {STUDENT.units} Units
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Two-column layout on desktop ── */}
      <View className="flex-row flex-wrap">
        {/* Left col */}
        <View className="w-full lg:w-1/2">
          {/* Account */}
          <SectionCard title="Account" icon="shield-checkmark-outline">
            {ACCOUNT_ITEMS.map((item, i) => (
              <InfoRow key={item.label} {...item} last={i === ACCOUNT_ITEMS.length - 1} />
            ))}
          </SectionCard>

          {/* Personal */}
          <SectionCard title="Personal Information" icon="person-circle-outline">
            {PERSONAL_ITEMS.map((item, i) => (
              <InfoRow key={item.label} {...item} last={i === PERSONAL_ITEMS.length - 1} />
            ))}
          </SectionCard>
        </View>

        {/* Right col */}
        <View className="w-full lg:w-1/2">
          {/* Academic */}
          <SectionCard title="Academic Information" icon="school-outline">
            {ACADEMIC_ITEMS.map((item, i) => (
              <InfoRow key={item.label} {...item} last={i === ACADEMIC_ITEMS.length - 1} />
            ))}
          </SectionCard>

          {/* Danger zone */}
          <Card size="full" tone="outline">
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="warning-outline" size={18} color="#ef4444" />
                <Text
                  variant="subheading"
                  weight="semibold"
                  className="text-red-600 dark:text-red-400">
                  Account Actions
                </Text>
              </View>
              <View className="h-px bg-slate-200 dark:bg-slate-700" />
              <Pressable
                onPress={() => {
                  logout();
                  router.replace('/auth/login' as any);
                }}
                className="flex-row items-center gap-3 rounded-xl bg-red-50 p-4 active:opacity-70 dark:bg-red-900/20">
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <View className="flex-1">
                  <Text
                    variant="label"
                    weight="semibold"
                    className="text-red-600 dark:text-red-400">
                    Sign Out
                  </Text>
                  <Text variant="caption" color="muted">
                    You will be redirected to the login screen.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#ef4444" />
              </Pressable>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
