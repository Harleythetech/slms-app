import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STUDENTS = [
  { id: '2024-00001', name: 'Juan Dela Cruz',    grade: '1.50', submitted: 4, total: 5, status: 'Passing' },
  { id: '2024-00002', name: 'Maria Santos',       grade: '1.75', submitted: 5, total: 5, status: 'Passing' },
  { id: '2024-00003', name: 'Pedro Reyes',        grade: '2.00', submitted: 3, total: 5, status: 'Passing' },
  { id: '2024-00004', name: 'Ana Lim',            grade: '1.25', submitted: 5, total: 5, status: 'Passing' },
  { id: '2024-00005', name: 'Carlos Mendoza',     grade: '2.25', submitted: 2, total: 5, status: 'Passing' },
  { id: '2024-00006', name: 'Rosa Garcia',        grade: '1.50', submitted: 4, total: 5, status: 'Passing' },
  { id: '2024-00007', name: 'Miguel Torres',      grade: '3.00', submitted: 3, total: 5, status: 'Passing' },
  { id: '2024-00008', name: 'Luisa Flores',       grade: 'INC',  submitted: 1, total: 5, status: 'Incomplete' },
];

const ASSIGNMENTS = [
  { title: 'Lab Exercise 1',   type: 'Lab',      due: 'Oct 5',  submissions: 38, graded: 38, maxScore: 50 },
  { title: 'Quiz 1',           type: 'Quiz',     due: 'Oct 12', submissions: 37, graded: 37, maxScore: 20 },
  { title: 'Lab Exercise 2',   type: 'Lab',      due: 'Oct 18', submissions: 35, graded: 35, maxScore: 50 },
  { title: 'Midterm Exam',     type: 'Exam',     due: 'Oct 22', submissions: 38, graded: 38, maxScore: 100 },
  { title: 'Lab Exercise 3',   type: 'Lab',      due: 'Oct 28', submissions: 33, graded: 28, maxScore: 50 },
];

const TYPE_COLORS: Record<string, string> = {
  Lab:      'bg-violet-100 dark:bg-violet-900/40',
  Quiz:     'bg-blue-100 dark:bg-blue-900/40',
  Exam:     'bg-red-100 dark:bg-red-900/40',
  Activity: 'bg-amber-100 dark:bg-amber-900/40',
};

const TYPE_TEXT: Record<string, string> = {
  Lab:      'text-violet-700 dark:text-violet-400',
  Quiz:     'text-blue-700 dark:text-blue-400',
  Exam:     'text-red-600 dark:text-red-400',
  Activity: 'text-amber-700 dark:text-amber-400',
};

// ─── Section Detail ───────────────────────────────────────────────────────────

export default function SectionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const avgGrade = (
    STUDENTS.filter(s => s.grade !== 'INC')
      .reduce((sum, s) => sum + parseFloat(s.grade), 0) /
    STUDENTS.filter(s => s.grade !== 'INC').length
  ).toFixed(2);

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Section Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-4">
            <View className="flex-row items-start gap-3">
              <Pressable
                onPress={() => router.push('/instructor/section' as any)}
                style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                className="bg-blue-200 dark:bg-blue-800">
                <Ionicons name="arrow-back" size={18} color="#1d4ed8" />
              </Pressable>
              <View style={{ flex: 1 }} className="gap-0.5">
                <Text variant="caption" color="muted">IT101 · {id}</Text>
                <Text variant="subheading" weight="bold">Information Technology 101</Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={12} color="#94a3b8" />
                    <Text variant="caption" color="muted">MWF · 7:30 – 9:00 AM</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={12} color="#94a3b8" />
                    <Text variant="caption" color="muted">Lab 3</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View className="flex-row justify-around">
              {[
                { label: 'Students',   value: String(STUDENTS.length) },
                { label: 'Avg. Grade', value: avgGrade },
                { label: 'Passing',    value: String(STUDENTS.filter(s => s.status === 'Passing').length) },
                { label: 'Incomplete', value: String(STUDENTS.filter(s => s.status === 'Incomplete').length) },
              ].map(({ label, value }) => (
                <View key={label} className="items-center gap-0.5">
                  <Text variant="subheading" weight="bold" className="text-blue-700 dark:text-blue-400">{value}</Text>
                  <Text variant="caption" color="muted">{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* ── Assignments + Roster ── */}
      <View className="flex-row flex-wrap">

        {/* Assignments */}
        <Card size="twoThirds">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Assignments</Text>
              <View className="rounded-full bg-amber-100 px-2 py-0.5 dark:bg-amber-900/40">
                <Text variant="caption" weight="bold" className="text-amber-700 dark:text-amber-400">
                  {ASSIGNMENTS.filter(a => a.graded < a.submissions).length} need grading
                </Text>
              </View>
            </View>

            {/* Header */}
            <View className="flex-row items-center px-1">
              <View style={{ flex: 1 }}><Text variant="caption" color="muted">Title</Text></View>
              <View style={{ width: 64 }} className="items-center"><Text variant="caption" color="muted">Type</Text></View>
              <View style={{ width: 56 }} className="items-end"><Text variant="caption" color="muted">Due</Text></View>
              <View style={{ width: 72 }} className="items-end"><Text variant="caption" color="muted">Submitted</Text></View>
              <View style={{ width: 60 }} className="items-end"><Text variant="caption" color="muted">Graded</Text></View>
            </View>

            <View className="gap-2">
              {ASSIGNMENTS.map((item, i) => {
                const needsGrading = item.graded < item.submissions;
                return (
                  <Pressable
                    key={i}
                    onPress={() => router.push(`/instructor/grading/${i}` as any)}
                    className="flex-row items-center rounded-xl bg-slate-100 px-3 py-2.5 active:opacity-70 dark:bg-slate-800">
                    <View style={{ flex: 1 }}>
                      <Text variant="label" weight="medium" numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={{ width: 64 }} className="items-center">
                      <View className={`rounded-full px-2 py-0.5 ${TYPE_COLORS[item.type] ?? 'bg-slate-200'}`}>
                        <Text variant="caption" weight="semibold" className={TYPE_TEXT[item.type] ?? ''}>
                          {item.type}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: 56 }} className="items-end">
                      <Text variant="caption" color="muted">{item.due}</Text>
                    </View>
                    <View style={{ width: 72 }} className="items-end">
                      <Text variant="label" color="muted">{item.submissions}/{STUDENTS.length}</Text>
                    </View>
                    <View style={{ width: 60 }} className="items-end">
                      {needsGrading ? (
                        <View className="rounded-full bg-amber-100 px-2 py-0.5 dark:bg-amber-900/40">
                          <Text variant="caption" weight="bold" className="text-amber-700 dark:text-amber-400">
                            {item.submissions - item.graded} left
                          </Text>
                        </View>
                      ) : (
                        <View className="rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/40">
                          <Text variant="caption" weight="bold" className="text-green-700 dark:text-green-400">Done</Text>
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Card>

        {/* Student Roster */}
        <Card size="third">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Roster</Text>
              <Text variant="caption" color="muted">{STUDENTS.length} students</Text>
            </View>
            <View className="gap-2">
              {STUDENTS.map((student, i) => (
                <View
                  key={student.id}
                  className={`flex-row items-center gap-3 ${i < STUDENTS.length - 1 ? 'border-b border-slate-200 pb-2 dark:border-slate-700' : ''}`}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
                    className="bg-slate-200 dark:bg-slate-700">
                    <Text variant="caption" weight="bold" color="muted">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} className="gap-0.5">
                    <Text variant="label" weight="medium" numberOfLines={1}>{student.name}</Text>
                    <Text variant="caption" color="muted">{student.submitted}/{student.total} submitted</Text>
                  </View>
                  <View className="items-end gap-1">
                    <Text variant="label" weight="bold"
                      style={{ color: student.status === 'Passing' ? '#16a34a' : '#d97706' }}>
                      {student.grade}
                    </Text>
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
