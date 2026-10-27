import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const COURSES = [
  {
    code: 'IT101',
    title: 'Information Technology 101',
    units: 3,
    enrolled: 73,
    sections: 2,
    instructor: 'Maria Santos',
    status: 'Active',
    color: '#1d4ed8',
  },
  {
    code: 'MATH1',
    title: 'Mathematics in the Modern World',
    units: 3,
    enrolled: 145,
    sections: 4,
    instructor: 'Ramon Flores',
    status: 'Active',
    color: '#7c3aed',
  },
  {
    code: 'ENG2',
    title: 'Purposive Communication',
    units: 3,
    enrolled: 90,
    sections: 3,
    instructor: 'Liza Garcia',
    status: 'Active',
    color: '#0891b2',
  },
  {
    code: 'PE1',
    title: 'Physical Education 1',
    units: 2,
    enrolled: 60,
    sections: 2,
    instructor: 'Carlos Mendoza',
    status: 'Archived',
    color: '#059669',
  },
  {
    code: 'IT102',
    title: 'Web Development',
    units: 3,
    enrolled: 32,
    sections: 1,
    instructor: 'Maria Santos',
    status: 'Active',
    color: '#1d4ed8',
  },
  {
    code: 'CS201',
    title: 'Data Structures & Algorithms',
    units: 3,
    enrolled: 30,
    sections: 1,
    instructor: 'Ramon Flores',
    status: 'Active',
    color: '#7c3aed',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-400' },
    Archived: { bg: 'bg-slate-200 dark:bg-slate-700', text: 'text-slate-500 dark:text-slate-400' },
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

// ─── Courses Page ──────────────────────────────────────────────────────────────

export default function CoursesPage() {
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
            { label: 'Total Courses', value: '48', icon: 'book-outline' as const, accent: true },
            { label: 'Active', value: '42', icon: 'checkmark-circle-outline' as const },
            { label: 'Archived', value: '6', icon: 'archive-outline' as const },
            { label: 'Total Enrolled', value: '2,340', icon: 'people-outline' as const },
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
                Total Courses
              </Text>
              <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                48
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
              <Ionicons name="book-outline" size={22} color="#1d4ed8" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Active
              </Text>
              <Text variant="heading" weight="bold">
                42
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
              <Ionicons name="checkmark-circle-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Archived
              </Text>
              <Text variant="heading" weight="bold">
                6
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
              <Ionicons name="archive-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
        <Card size="quarter">
          <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
            <View className="gap-0.5">
              <Text variant="label" color="muted">
                Total Enrolled
              </Text>
              <Text variant="heading" weight="bold">
                2,340
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
              <Ionicons name="people-outline" size={22} color="#64748b" />
            </View>
          </View>
        </Card>
      </View>

      {/* ── Course Cards Grid ── */}
      <View className="flex-row flex-wrap">
        <Card size="full">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                All Courses
              </Text>
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700">
                  <Ionicons name="search-outline" size={14} color="#94a3b8" />
                  <Text variant="label" color="muted">
                    Search courses…
                  </Text>
                </View>
                <Pressable className="flex-row items-center gap-1.5 rounded-lg bg-blue-700 px-3 py-1.5 active:opacity-80">
                  <Ionicons name="add" size={14} color="#fff" />
                  <Text variant="label" weight="semibold" color="white">
                    Add Course
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="gap-2">
              {COURSES.map((item, i) => (
                <View
                  key={i}
                  className="flex-row items-center rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-800">
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: item.color + '22',
                    }}>
                    <Text variant="label" weight="bold" style={{ color: item.color }}>
                      {item.code.slice(0, 2)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} className="ml-3 gap-0.5">
                    <Text variant="label" weight="semibold" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text variant="caption" color="muted">
                        {item.code}
                      </Text>
                      <Text variant="caption" color="muted">
                        ·
                      </Text>
                      <Text variant="caption" color="muted">
                        {item.units} units
                      </Text>
                      <Text variant="caption" color="muted">
                        ·
                      </Text>
                      <Text variant="caption" color="muted">
                        {item.instructor}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="people-outline" size={12} color="#94a3b8" />
                      <Text variant="caption" color="muted">
                        {item.enrolled}
                      </Text>
                    </View>
                    <StatusBadge status={item.status} />
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
