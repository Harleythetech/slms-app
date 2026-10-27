import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const COURSES = [
  {
    code: 'IT101',
    title: 'Information Technology 101',
    instructor: 'Prof. Maria Santos',
    units: 3,
    schedule: 'MWF · 7:30 – 9:00 AM',
    room: 'Lab 3',
    progress: 68,
    pending: 1,
    grade: '1.50',
    color: '#1d4ed8',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    accent: 'text-blue-700 dark:text-blue-400',
  },
  {
    code: 'MATH1',
    title: 'Mathematics in the Modern World',
    instructor: 'Prof. Jose Reyes',
    units: 3,
    schedule: 'TTh · 9:00 – 10:30 AM',
    room: 'Rm 201',
    progress: 55,
    pending: 1,
    grade: '1.75',
    color: '#7c3aed',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
    accent: 'text-violet-700 dark:text-violet-400',
  },
  {
    code: 'ENG2',
    title: 'Purposive Communication',
    instructor: 'Prof. Ana Lim',
    units: 3,
    schedule: 'MWF · 1:00 – 2:30 PM',
    room: 'Rm 105',
    progress: 72,
    pending: 0,
    grade: '1.25',
    color: '#0891b2',
    bg: 'bg-cyan-100 dark:bg-cyan-900/40',
    accent: 'text-cyan-700 dark:text-cyan-400',
  },
  {
    code: 'PE1',
    title: 'Physical Education 1',
    instructor: 'Coach Ricardo Cruz',
    units: 2,
    schedule: 'TTh · 3:00 – 4:30 PM',
    room: 'Gym',
    progress: 80,
    pending: 0,
    grade: '1.00',
    color: '#059669',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    accent: 'text-emerald-700 dark:text-emerald-400',
  },
  {
    code: 'NSTP1',
    title: 'National Service Training Program 1',
    instructor: 'Prof. Luz Flores',
    units: 3,
    schedule: 'Sat · 8:00 – 11:00 AM',
    room: 'Rm 301',
    progress: 60,
    pending: 0,
    grade: 'INC',
    color: '#d97706',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    accent: 'text-amber-700 dark:text-amber-400',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <View className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <View
        className="h-full rounded-full bg-blue-600"
        style={{ width: `${value}%` }}
      />
    </View>
  );
}

function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/student/courses/${course.code}` as any)}>
      <Card size="full">
        <View className="gap-4">
          {/* Header */}
          <View className="flex-row items-start gap-3">
            <View
              style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: course.color + '22' }}>
              <Text variant="label" weight="bold" style={{ color: course.color }}>
                {course.code.slice(0, 2)}
              </Text>
            </View>
            <View className="flex-1 gap-0.5">
              <Text variant="label" weight="semibold" color="muted">{course.code}</Text>
              <Text variant="subheading" weight="semibold" numberOfLines={1}>{course.title}</Text>
              <Text variant="caption" color="muted">{course.instructor}</Text>
            </View>
            <View className="items-end gap-1">
              <Text variant="subheading" weight="bold" style={{ color: course.color }}>
                {course.grade}
              </Text>
              <Text variant="caption" color="muted">Current</Text>
            </View>
          </View>

          {/* Progress */}
          <View className="gap-1.5">
            <View className="flex-row items-center justify-between">
              <Text variant="caption" color="muted">Course Progress</Text>
              <Text variant="caption" weight="semibold" color="muted">{course.progress}%</Text>
            </View>
            <ProgressBar value={course.progress} />
          </View>

          {/* Footer */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Ionicons name="time-outline" size={13} color="#94a3b8" />
                <Text variant="caption" color="muted">{course.schedule}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="location-outline" size={13} color="#94a3b8" />
                <Text variant="caption" color="muted">{course.room}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              {course.pending > 0 && (
                <View className="flex-row items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 dark:bg-red-900/40">
                  <Ionicons name="alert-circle-outline" size={12} color="#ef4444" />
                  <Text variant="caption" weight="semibold" className="text-red-600 dark:text-red-400">
                    {course.pending} pending
                  </Text>
                </View>
              )}
              <Text variant="caption" color="muted">{course.units} units</Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export default function Courses() {
  const totalUnits = COURSES.reduce((sum, c) => sum + c.units, 0);

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Summary ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <View className="items-center gap-0.5 lg:items-start">
              <Text variant="subheading" weight="bold">Enrolled Courses</Text>
              <Text variant="caption" color="muted">1st Semester · AY 2024–2025</Text>
            </View>
            <View className="flex-row justify-center gap-6 lg:gap-8">
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                  {COURSES.length}
                </Text>
                <Text variant="caption" color="muted">Subjects</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                  {totalUnits}
                </Text>
                <Text variant="caption" color="muted">Units</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Course List — 2-col on desktop, 1-col on mobile ── */}
      <View className="flex-row flex-wrap">
        {COURSES.map((course) => (
          <View key={course.code} className="w-full lg:w-1/2">
            <CourseCard course={course} />
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
