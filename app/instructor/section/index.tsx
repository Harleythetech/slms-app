import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    code: 'BSIT-1A',
    subject: 'Information Technology 101',
    subjectCode: 'IT101',
    students: 38,
    room: 'Lab 3',
    schedule: 'MWF · 7:30 – 9:00 AM',
    pending: 5,
    avgGrade: '1.62',
    color: '#1d4ed8',
    submitted: 33,
  },
  {
    code: 'BSIT-1B',
    subject: 'Information Technology 101',
    subjectCode: 'IT101',
    students: 35,
    room: 'Lab 4',
    schedule: 'MWF · 9:00 – 10:30 AM',
    pending: 3,
    avgGrade: '1.75',
    color: '#7c3aed',
    submitted: 32,
  },
  {
    code: 'BSCS-2A',
    subject: 'Data Structures & Algorithms',
    subjectCode: 'CS201',
    students: 30,
    room: 'Lab 1',
    schedule: 'TTh · 1:00 – 2:30 PM',
    pending: 0,
    avgGrade: '1.88',
    color: '#0891b2',
    submitted: 30,
  },
  {
    code: 'BSIT-3A',
    subject: 'Web Development',
    subjectCode: 'IT301',
    students: 32,
    room: 'Lab 2',
    schedule: 'TTh · 3:00 – 4:30 PM',
    pending: 8,
    avgGrade: '1.50',
    color: '#059669',
    submitted: 24,
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

export default function Sections() {
  const router = useRouter();
  const totalStudents = SECTIONS.reduce((s, c) => s + c.students, 0);
  const totalPending  = SECTIONS.reduce((s, c) => s + c.pending, 0);

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Summary ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <View className="items-center gap-0.5 lg:items-start">
              <Text variant="subheading" weight="bold">My Sections</Text>
              <Text variant="caption" color="muted">1st Semester · AY 2024–2025</Text>
            </View>
            <View className="flex-row justify-center gap-8">
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                  {SECTIONS.length}
                </Text>
                <Text variant="caption" color="muted">Sections</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                  {totalStudents}
                </Text>
                <Text variant="caption" color="muted">Students</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className={totalPending > 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-700 dark:text-blue-400'}>
                  {totalPending}
                </Text>
                <Text variant="caption" color="muted">Pending</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Section Cards ── */}
      <View className="flex-row flex-wrap">
        {SECTIONS.map((section) => (
          <View key={section.code} className="w-full lg:w-1/2">
            <Pressable onPress={() => router.push(`/instructor/section/${section.code}` as any)}>
              <Card size="full">
                <View className="gap-4">

                  {/* Header */}
                  <View className="flex-row items-start gap-3">
                    <View style={{ width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: section.color + '22' }}>
                      <Text variant="label" weight="bold" style={{ color: section.color }}>
                        {section.subjectCode.slice(0, 2)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} className="gap-0.5">
                      <Text variant="caption" weight="semibold" color="muted">{section.subjectCode} · {section.code}</Text>
                      <Text variant="subheading" weight="semibold" numberOfLines={1}>{section.subject}</Text>
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={12} color="#94a3b8" />
                          <Text variant="caption" color="muted">{section.schedule}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="location-outline" size={12} color="#94a3b8" />
                          <Text variant="caption" color="muted">{section.room}</Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
                  </View>

                  {/* Divider */}
                  <View className="h-px bg-slate-200 dark:bg-slate-700" />

                  {/* Stats row */}
                  <View className="flex-row justify-between">
                    <View className="items-center gap-0.5">
                      <Text variant="subheading" weight="bold">{section.students}</Text>
                      <Text variant="caption" color="muted">Students</Text>
                    </View>
                    <View className="items-center gap-0.5">
                      <Text variant="subheading" weight="bold">{section.submitted}/{section.students}</Text>
                      <Text variant="caption" color="muted">Submitted</Text>
                    </View>
                    <View className="items-center gap-0.5">
                      <Text variant="subheading" weight="bold" style={{ color: section.pending > 0 ? '#ef4444' : undefined }}>
                        {section.pending}
                      </Text>
                      <Text variant="caption" color="muted">Pending</Text>
                    </View>
                    <View className="items-center gap-0.5">
                      <Text variant="subheading" weight="bold" style={{ color: section.color }}>
                        {section.avgGrade}
                      </Text>
                      <Text variant="caption" color="muted">Avg. Grade</Text>
                    </View>
                  </View>

                </View>
              </Card>
            </Pressable>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
