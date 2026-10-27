import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USERS = [
  {
    name: 'Juan Dela Cruz',
    id: '2024-00001',
    email: 'juan.delacruz@iscp.edu.ph',
    role: 'Student',
    program: 'BSIT',
    status: 'Active',
    joined: 'Oct 20, 2024',
  },
  {
    name: 'Maria Santos',
    id: 'FAC-002',
    email: 'maria.santos@iscp.edu.ph',
    role: 'Instructor',
    program: 'IT Dept.',
    status: 'Active',
    joined: 'Aug 15, 2024',
  },
  {
    name: 'Pedro Reyes',
    id: '2024-00002',
    email: 'pedro.reyes@iscp.edu.ph',
    role: 'Student',
    program: 'BSCS',
    status: 'Pending',
    joined: 'Oct 25, 2024',
  },
  {
    name: 'Ana Lim',
    id: '2024-00003',
    email: 'ana.lim@iscp.edu.ph',
    role: 'Student',
    program: 'BSIT',
    status: 'Active',
    joined: 'Oct 22, 2024',
  },
  {
    name: 'Carlos Mendoza',
    id: 'FAC-003',
    email: 'carlos.mendoza@iscp.edu.ph',
    role: 'Instructor',
    program: 'CS Dept.',
    status: 'Suspended',
    joined: 'Sep 01, 2024',
  },
  {
    name: 'Liza Garcia',
    id: '2024-00004',
    email: 'liza.garcia@iscp.edu.ph',
    role: 'Student',
    program: 'BSENT',
    status: 'Active',
    joined: 'Oct 24, 2024',
  },
  {
    name: 'Ramon Flores',
    id: 'FAC-004',
    email: 'ramon.flores@iscp.edu.ph',
    role: 'Instructor',
    program: 'Math Dept.',
    status: 'Active',
    joined: 'Aug 10, 2024',
  },
  {
    name: 'Sophia Cruz',
    id: '2024-00005',
    email: 'sophia.cruz@iscp.edu.ph',
    role: 'Student',
    program: 'BSIT',
    status: 'Active',
    joined: 'Oct 23, 2024',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-400' },
    Pending: {
      bg: 'bg-amber-100 dark:bg-amber-900/40',
      text: 'text-amber-700 dark:text-amber-400',
    },
    Suspended: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-600 dark:text-red-400' },
  };
  const s = styles[status] ?? styles.Active;
  return (
    <View className={`rounded-full px-2 py-0.5 ${s.bg}`}>
      <Text variant="caption" weight="semibold" className={s.text}>
        {status}
      </Text>
    </View>
  );
}

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    Student: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-400' },
    Instructor: {
      bg: 'bg-purple-100 dark:bg-purple-900/40',
      text: 'text-purple-700 dark:text-purple-400',
    },
  };
  const s = styles[role] ?? styles.Student;
  return (
    <View className={`rounded-full px-2 py-0.5 ${s.bg}`}>
      <Text variant="caption" weight="semibold" className={s.text}>
        {role}
      </Text>
    </View>
  );
}

// ─── Users Page ───────────────────────────────────────────────────────────────

export default function UsersPage() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      {/* ── Summary Stats ── */}
      <View className="lg:hidden">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={212}
          snapToAlignment="start"
          contentContainerStyle={{ paddingHorizontal: 4, gap: 12 }}>
          {[
            { label: 'Total Users', value: '1,248', icon: 'people-outline' as const, accent: true },
            { label: 'Students', value: '1,180', icon: 'school-outline' as const },
            { label: 'Instructors', value: '68', icon: 'person-outline' as const },
            { label: 'Pending', value: '12', icon: 'alert-circle-outline' as const },
          ].map((item) => (
            <View key={item.label} style={{ width: 200 }}>
              <Card size="full" tone={item.accent ? 'accent' : 'default'}>
                <View
                  style={{ minHeight: 80 }}
                  className="flex-row items-center justify-between gap-3">
                  <View className="gap-0.5">
                    <Text variant="label" color="muted">
                      {item.label}
                    </Text>
                    <Text
                      variant="heading"
                      weight="bold"
                      className={item.accent ? 'text-blue-700 dark:text-blue-400' : ''}>
                      {item.value}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className={
                      item.accent
                        ? 'bg-blue-200 dark:bg-blue-800'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={item.accent ? '#1d4ed8' : '#64748b'}
                    />
                  </View>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="hidden lg:-m-1 lg:flex lg:flex-row lg:flex-wrap">
        <Card size="quarter" tone="accent">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Total Users
              </Text>
              <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                1,248
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-blue-200 dark:bg-blue-800">
              <Ionicons name="people-outline" size={22} color="#1d4ed8" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Students
              </Text>
              <Text variant="heading" weight="bold">
                1,180
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-slate-300 dark:bg-slate-700">
              <Ionicons name="school-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Instructors
              </Text>
              <Text variant="heading" weight="bold">
                68
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-slate-300 dark:bg-slate-700">
              <Ionicons name="person-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Pending
              </Text>
              <Text variant="heading" weight="bold">
                12
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="bg-slate-300 dark:bg-slate-700">
              <Ionicons name="alert-circle-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
      </View>

      {/* ── User Table ── */}
      <View className="flex-row flex-wrap">
        <Card size="full">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                All Users
              </Text>
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700">
                  <Ionicons name="search-outline" size={14} color="#94a3b8" />
                  <Text variant="label" color="muted">
                    Search users…
                  </Text>
                </View>
                <Pressable className="flex-row items-center gap-1.5 rounded-lg bg-blue-700 px-3 py-1.5 active:opacity-80">
                  <Ionicons name="add" size={14} color="#fff" />
                  <Text variant="label" weight="semibold" color="white">
                    Add User
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Table header */}
            <View className="flex-row items-center px-1">
              <View style={{ flex: 1.5 }}>
                <Text variant="caption" color="muted">
                  Name
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="caption" color="muted">
                  ID
                </Text>
              </View>
              <View style={{ width: 100 }}>
                <Text variant="caption" color="muted">
                  Role
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="caption" color="muted">
                  Program / Dept
                </Text>
              </View>
              <View style={{ width: 90 }} className="items-end">
                <Text variant="caption" color="muted">
                  Status
                </Text>
              </View>
              <View style={{ width: 50 }} className="items-end">
                <Text variant="caption" color="muted">
                  {' '}
                </Text>
              </View>
            </View>

            <View className="gap-2">
              {USERS.map((item, i) => (
                <View
                  key={i}
                  className="flex-row items-center rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-800">
                  <View style={{ flex: 1.5 }}>
                    <Text variant="label" weight="medium" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text variant="caption" color="muted" numberOfLines={1}>
                      {item.email}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="label" color="muted">
                      {item.id}
                    </Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <RoleBadge role={item.role} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="label" color="muted" numberOfLines={1}>
                      {item.program}
                    </Text>
                  </View>
                  <View style={{ width: 90 }} className="items-end">
                    <StatusBadge status={item.status} />
                  </View>
                  <View style={{ width: 50 }} className="items-end">
                    <Pressable className="h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-200 active:opacity-70 dark:hover:bg-slate-700">
                      <Ionicons name="ellipsis-vertical" size={14} color="#94a3b8" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
