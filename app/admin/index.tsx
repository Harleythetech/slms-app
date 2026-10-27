import { ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RECENT_USERS = [
  { name: 'Juan Dela Cruz', role: 'Student', id: '2024-00001', status: 'Active', joined: 'Oct 20' },
  { name: 'Maria Santos', role: 'Instructor', id: 'FAC-002', status: 'Active', joined: 'Oct 18' },
  { name: 'Pedro Reyes', role: 'Student', id: '2024-00002', status: 'Pending', joined: 'Oct 25' },
  { name: 'Ana Lim', role: 'Student', id: '2024-00003', status: 'Active', joined: 'Oct 22' },
  {
    name: 'Carlos Mendoza',
    role: 'Instructor',
    id: 'FAC-003',
    status: 'Suspended',
    joined: 'Oct 15',
  },
];

const COURSE_OVERVIEW = [
  {
    code: 'IT101',
    title: 'Information Technology 101',
    enrolled: 73,
    sections: 2,
    status: 'Active',
  },
  {
    code: 'MATH1',
    title: 'Mathematics in the Modern World',
    enrolled: 145,
    sections: 4,
    status: 'Active',
  },
  { code: 'ENG2', title: 'Purposive Communication', enrolled: 90, sections: 3, status: 'Active' },
  { code: 'PE1', title: 'Physical Education 1', enrolled: 60, sections: 2, status: 'Archived' },
];

const ANNOUNCEMENTS = [
  { title: 'Enrollment for 2nd Semester Now Open', date: 'Oct 25', tag: 'Enrollment' },
  { title: 'Midterm Examination Schedule Released', date: 'Oct 22', tag: 'Exams' },
  { title: 'System Maintenance — Nov 1, 2:00–4:00 AM', date: 'Oct 20', tag: 'System' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent?: boolean;
}) {
  return (
    <Card size="quarter" tone={accent ? 'accent' : 'default'}>
      <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
        <View className="gap-0.5">
          <Text variant="label" color="muted">
            {label}
          </Text>
          <Text
            variant="heading"
            weight="bold"
            className={accent ? 'text-blue-700 dark:text-blue-400' : ''}>
            {value}
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
          className={accent ? 'bg-blue-200 dark:bg-blue-800' : 'bg-slate-300 dark:bg-slate-700'}>
          <Ionicons name={icon} size={22} color={accent ? '#1d4ed8' : '#64748b'} />
        </View>
      </View>
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      {/* ── Admin Info Banner ── */}
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
                AD
              </Text>
            </View>
            <View style={{ flex: 1 }} className="gap-0.5">
              <Text variant="subheading" weight="bold">
                Admin Dashboard
              </Text>
              <Text variant="label" color="muted">
                International State College of the Philippines
              </Text>
              <Text variant="caption" color="muted">
                1st Semester · AY 2024–2025
              </Text>
            </View>
            <View className="rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/40">
              <Text
                variant="caption"
                weight="semibold"
                className="text-green-700 dark:text-green-400">
                Operational
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Stat Cards — carousel on mobile, grid on desktop ── */}
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
            { label: 'Active Courses', value: '48', icon: 'book-outline' as const },
            { label: 'Pending Approvals', value: '12', icon: 'alert-circle-outline' as const },
            { label: 'System Uptime', value: '99.9%', icon: 'server-outline' as const },
          ].map((item) => (
            <View key={item.label} style={{ width: 200 }}>
              <StatCard {...item} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="hidden lg:-m-1 lg:flex lg:flex-row lg:flex-wrap">
        <StatCard label="Total Users" value="1,248" icon="people-outline" accent />
        <StatCard label="Active Courses" value="48" icon="book-outline" />
        <StatCard label="Pending Approvals" value="12" icon="alert-circle-outline" />
        <StatCard label="System Uptime" value="99.9%" icon="server-outline" />
      </View>

      {/* ── Recent User Registrations + Announcements ── */}
      <View className="flex-row flex-wrap">
        <Card size="twoThirds">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                Recent User Registrations
              </Text>
              <Text variant="caption" color="accent">
                View all
              </Text>
            </View>
            {/* Header */}
            <View className="flex-row items-center px-1">
              <View style={{ flex: 1 }}>
                <Text variant="caption" color="muted">
                  Name
                </Text>
              </View>
              <View style={{ width: 80 }}>
                <Text variant="caption" color="muted">
                  Role
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="caption" color="muted">
                  ID
                </Text>
              </View>
              <View style={{ width: 80 }} className="items-end">
                <Text variant="caption" color="muted">
                  Status
                </Text>
              </View>
            </View>
            <View className="gap-2">
              {RECENT_USERS.map((item, i) => (
                <View
                  key={i}
                  className="flex-row items-center rounded-xl bg-slate-100 px-3 py-2.5 dark:bg-slate-800">
                  <View style={{ flex: 1 }}>
                    <Text variant="label" weight="medium" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text variant="caption" color="muted">
                      Joined {item.joined}
                    </Text>
                  </View>
                  <View style={{ width: 80 }}>
                    <Text variant="caption" color="muted">
                      {item.role}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="label" color="muted" numberOfLines={1}>
                      {item.id}
                    </Text>
                  </View>
                  <View style={{ width: 80 }} className="items-end">
                    <View
                      className={`rounded-full px-2 py-0.5 ${
                        item.status === 'Active'
                          ? 'bg-green-100 dark:bg-green-900/40'
                          : item.status === 'Pending'
                            ? 'bg-amber-100 dark:bg-amber-900/40'
                            : 'bg-red-100 dark:bg-red-900/40'
                      }`}>
                      <Text
                        variant="caption"
                        weight="semibold"
                        className={
                          item.status === 'Active'
                            ? 'text-green-700 dark:text-green-400'
                            : item.status === 'Pending'
                              ? 'text-amber-700 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400'
                        }>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card>

        <Card size="third">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                Announcements
              </Text>
              <Text variant="caption" color="accent">
                See all
              </Text>
            </View>
            <View className="gap-3">
              {ANNOUNCEMENTS.map((item, i) => (
                <View
                  key={i}
                  className={`gap-1.5 ${i < ANNOUNCEMENTS.length - 1 ? 'border-b border-slate-200 pb-3 dark:border-slate-700' : ''}`}>
                  <View className="flex-row items-center gap-2">
                    <View className="rounded-full bg-blue-100 px-2 py-0.5 dark:bg-blue-900/40">
                      <Text
                        variant="caption"
                        weight="semibold"
                        className="text-blue-700 dark:text-blue-400">
                        {item.tag}
                      </Text>
                    </View>
                    <Text variant="caption" color="muted">
                      {item.date}
                    </Text>
                  </View>
                  <Text variant="label" weight="medium" numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* ── Course Overview ── */}
      <View className="flex-row flex-wrap">
        <Card size="full">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                Course Overview
              </Text>
              <Text variant="caption" color="accent">
                Manage
              </Text>
            </View>
            {/* Header */}
            <View className="flex-row items-center px-1">
              <View style={{ width: 60 }}>
                <Text variant="caption" color="muted">
                  Code
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="caption" color="muted">
                  Title
                </Text>
              </View>
              <View style={{ width: 80 }} className="items-end">
                <Text variant="caption" color="muted">
                  Enrolled
                </Text>
              </View>
              <View style={{ width: 70 }} className="items-end">
                <Text variant="caption" color="muted">
                  Sections
                </Text>
              </View>
              <View style={{ width: 80 }} className="items-end">
                <Text variant="caption" color="muted">
                  Status
                </Text>
              </View>
            </View>
            <View className="gap-2">
              {COURSE_OVERVIEW.map((item, i) => (
                <View
                  key={i}
                  className="flex-row items-center rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-800">
                  <View style={{ width: 60 }}>
                    <Text
                      variant="label"
                      weight="bold"
                      className="text-blue-700 dark:text-blue-400">
                      {item.code}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="label" weight="medium" numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{ width: 80 }} className="items-end">
                    <Text variant="label" color="muted">
                      {item.enrolled}
                    </Text>
                  </View>
                  <View style={{ width: 70 }} className="items-end">
                    <Text variant="label" color="muted">
                      {item.sections}
                    </Text>
                  </View>
                  <View style={{ width: 80 }} className="items-end">
                    <View
                      className={`rounded-full px-2 py-0.5 ${item.status === 'Active' ? 'bg-green-100 dark:bg-green-900/40' : 'bg-slate-200 dark:bg-slate-700'}`}>
                      <Text
                        variant="caption"
                        weight="semibold"
                        className={
                          item.status === 'Active'
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }>
                        {item.status}
                      </Text>
                    </View>
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
