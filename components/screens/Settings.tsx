import { ScrollView, View, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/components/context/ThemeContext';
import { useAuth } from '@/components/context/AuthContext';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SettingsRow({
  icon,
  label,
  description,
  right,
  onPress,
  destructive = false,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !right}
      className={`flex-row items-center gap-3 py-3 active:opacity-70 ${!last ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={
          destructive ? 'bg-red-100 dark:bg-red-900/30' : 'bg-slate-100 dark:bg-slate-800'
        }>
        <Ionicons name={icon} size={18} color={destructive ? '#ef4444' : '#64748b'} />
      </View>
      <View style={{ flex: 1 }} className="gap-0.5">
        <Text variant="label" weight="medium" className={destructive ? 'text-red-500' : ''}>
          {label}
        </Text>
        {description && (
          <Text variant="caption" color="muted">
            {description}
          </Text>
        )}
      </View>
      {right ?? (onPress && <Ionicons name="chevron-forward" size={16} color="#94a3b8" />)}
    </Pressable>
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

// ─── Settings ─────────────────────────────────────────────────────────────────

export function Settings({ role = 'student' }: { role?: 'student' | 'instructor' | 'admin' }) {
  const router = useRouter();
  const { colorScheme, themeMode, setThemeMode } = useTheme();
  const { logout } = useAuth();

  // Notifications (local state only — no backend yet)
  const [pushEnabled, setPushEnabled] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [announcements, setAnnouncements] = useState(false);

  const signOutPath = '/auth/login';

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      {/* ── Profile Summary ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="flex-row items-center gap-4">
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-blue-200 dark:bg-blue-800">
              <Text variant="subheading" weight="bold" className="text-blue-700 dark:text-blue-300">
                {role === 'student' ? 'JD' : role === 'instructor' ? 'MS' : 'AD'}
              </Text>
            </View>
            <View style={{ flex: 1 }} className="gap-0.5">
              <Text variant="subheading" weight="bold">
                {role === 'student'
                  ? 'Juan Dela Cruz'
                  : role === 'instructor'
                    ? 'Prof. Maria Santos'
                    : 'System Administrator'}
              </Text>
              <Text variant="label" color="muted">
                {role === 'student'
                  ? '2024-00001 · BSIT-1A'
                  : role === 'instructor'
                    ? 'Dept. of Information Technology'
                    : 'ISCP Portal Administration'}
              </Text>
              <Text variant="caption" color="muted">
                {role === 'student'
                  ? 'juan.delacruz@iscp.edu.ph'
                  : role === 'instructor'
                    ? 'maria.santos@iscp.edu.ph'
                    : 'admin@iscp.edu.ph'}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                router.push(
                  role === 'student'
                    ? ('/student/profile' as any)
                    : role === 'instructor'
                      ? ('/instructor' as any)
                      : ('/admin' as any)
                )
              }
              className="rounded-full bg-blue-100 px-3 py-1.5 dark:bg-blue-900/40">
              <Text variant="caption" weight="semibold" color="accent">
                Edit
              </Text>
            </Pressable>
          </View>
        </Card>
      </View>

      {/* ── Two column on desktop ── */}
      <View className="flex-row flex-wrap">
        {/* Left col */}
        <View className="w-full lg:w-1/2">
          {/* Appearance */}
          <SectionCard title="Appearance" icon="color-palette-outline">
            {[
              {
                value: 'system' as const,
                label: 'Follow System Theme',
                description: "Match your device's light/dark setting",
                icon: 'phone-portrait-outline' as const,
              },
              {
                value: 'dark' as const,
                label: 'Dark Mode',
                description: 'Always use dark theme',
                icon: 'moon-outline' as const,
              },
              {
                value: 'light' as const,
                label: 'Light Mode',
                description: 'Always use light theme',
                icon: 'sunny-outline' as const,
              },
            ].map((option, i, arr) => {
              const selected = themeMode === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setThemeMode(option.value)}
                  className={`flex-row items-center gap-3 py-3 active:opacity-70 ${i < arr.length - 1 ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className={
                      selected
                        ? 'bg-blue-100 dark:bg-blue-900/40'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }>
                    <Ionicons
                      name={option.icon}
                      size={18}
                      color={selected ? '#1d4ed8' : '#64748b'}
                    />
                  </View>
                  <View style={{ flex: 1 }} className="gap-0.5">
                    <Text variant="label" weight="medium">
                      {option.label}
                    </Text>
                    <Text variant="caption" color="muted">
                      {option.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className={
                      selected ? 'border-blue-700' : 'border-slate-300 dark:border-slate-600'
                    }>
                    {selected && (
                      <View
                        style={{ width: 10, height: 10, borderRadius: 5 }}
                        className="bg-blue-700"
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </SectionCard>

          {/* Account */}
          <SectionCard title="Account" icon="shield-checkmark-outline">
            <SettingsRow
              icon="mail-outline"
              label="Email Address"
              description={
                role === 'student'
                  ? 'juan.delacruz@iscp.edu.ph'
                  : role === 'instructor'
                    ? 'maria.santos@iscp.edu.ph'
                    : 'admin@iscp.edu.ph'
              }
              onPress={() => {}}
            />
            <SettingsRow
              icon="lock-closed-outline"
              label="Change Password"
              description="Update your login credentials"
              onPress={() => router.push('/auth/forgot-password' as any)}
            />
            <SettingsRow
              icon="finger-print-outline"
              label="Biometric Login"
              description="Use Face ID or fingerprint to sign in"
              last
              right={
                <Switch
                  value={false}
                  trackColor={{ false: '#334155', true: '#1d4ed8' }}
                  thumbColor="#fff"
                />
              }
            />
          </SectionCard>
        </View>

        {/* Right col */}
        <View className="w-full lg:w-1/2">
          {/* Notifications */}
          <SectionCard title="Notifications" icon="notifications-outline">
            <SettingsRow
              icon="notifications-circle-outline"
              label="Push Notifications"
              description="Receive alerts on your device"
              right={
                <Switch
                  value={pushEnabled}
                  onValueChange={setPushEnabled}
                  trackColor={{ false: '#334155', true: '#1d4ed8' }}
                  thumbColor="#fff"
                />
              }
            />
            <SettingsRow
              icon="ribbon-outline"
              label={
                role === 'student'
                  ? 'Grade Alerts'
                  : role === 'instructor'
                    ? 'Submission Alerts'
                    : 'System Alerts'
              }
              description={
                role === 'student'
                  ? 'Notify when grades are posted'
                  : role === 'instructor'
                    ? 'Notify on new submissions'
                    : 'Notify on system events and user registrations'
              }
              right={
                <Switch
                  value={gradeAlerts}
                  onValueChange={setGradeAlerts}
                  disabled={!pushEnabled}
                  trackColor={{ false: '#334155', true: '#1d4ed8' }}
                  thumbColor="#fff"
                />
              }
            />
            <SettingsRow
              icon="alarm-outline"
              label="Deadline Reminders"
              description="Get reminders before due dates"
              right={
                <Switch
                  value={deadlineAlerts}
                  onValueChange={setDeadlineAlerts}
                  disabled={!pushEnabled}
                  trackColor={{ false: '#334155', true: '#1d4ed8' }}
                  thumbColor="#fff"
                />
              }
            />
            <SettingsRow
              icon="megaphone-outline"
              label="Announcements"
              description="Institutional news and updates"
              last
              right={
                <Switch
                  value={announcements}
                  onValueChange={setAnnouncements}
                  disabled={!pushEnabled}
                  trackColor={{ false: '#334155', true: '#1d4ed8' }}
                  thumbColor="#fff"
                />
              }
            />
          </SectionCard>

          {/* About */}
          <SectionCard title="About" icon="information-circle-outline">
            <SettingsRow
              icon="school-outline"
              label="Institution"
              description="International State College of the Philippines"
            />
            <SettingsRow
              icon="code-slash-outline"
              label="App Version"
              description="V1.0.0 · Experimental Build"
            />
            <SettingsRow icon="document-text-outline" label="Terms of Service" onPress={() => {}} />
            <SettingsRow icon="lock-open-outline" label="Privacy Policy" onPress={() => {}} last />
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
              <SettingsRow
                icon="log-out-outline"
                label="Sign Out"
                description="You will be returned to the login screen"
                onPress={() => {
                  logout();
                  router.replace(signOutPath as any);
                }}
                destructive
                last
              />
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
