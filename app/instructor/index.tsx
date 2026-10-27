import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { code: 'BSIT-1A', subject: 'Information Technology 101', students: 38, room: 'Lab 3',   schedule: 'MWF · 7:30 – 9:00 AM',   pending: 5,  color: '#1d4ed8' },
  { code: 'BSIT-1B', subject: 'Information Technology 101', students: 35, room: 'Lab 4',   schedule: 'MWF · 9:00 – 10:30 AM',  pending: 3,  color: '#7c3aed' },
  { code: 'BSCS-2A', subject: 'Data Structures & Algorithms', students: 30, room: 'Lab 1', schedule: 'TTh · 1:00 – 2:30 PM',   pending: 0,  color: '#0891b2' },
  { code: 'BSIT-3A', subject: 'Web Development',             students: 32, room: 'Lab 2',  schedule: 'TTh · 3:00 – 4:30 PM',   pending: 8,  color: '#059669' },
];

const RECENT_SUBMISSIONS = [
  { student: 'Juan Dela Cruz',    section: 'BSIT-1A', task: 'Lab Exercise 3',   submitted: '2 hrs ago',  status: 'Pending' },
  { student: 'Maria Santos',      section: 'BSIT-1B', task: 'Lab Exercise 3',   submitted: '3 hrs ago',  status: 'Pending' },
  { student: 'Pedro Reyes',       section: 'BSIT-1A', task: 'Lab Exercise 3',   submitted: '5 hrs ago',  status: 'Graded' },
  { student: 'Ana Lim',           section: 'BSCS-2A', task: 'Problem Set 2',    submitted: 'Yesterday',  status: 'Graded' },
  { student: 'Carlos Mendoza',    section: 'BSIT-3A', task: 'Project Proposal', submitted: 'Yesterday',  status: 'Pending' },
];

const ANNOUNCEMENTS = [
  { title: 'Midterm Exam Schedule Finalized',    date: 'Oct 25', tag: 'Exams' },
  { title: 'Faculty Meeting — Oct 28, 2:00 PM', date: 'Oct 23', tag: 'Meeting' },
  { title: 'Grade Submission Deadline: Nov 5',   date: 'Oct 20', tag: 'Deadline' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon, accent = false }: {
  label: string; value: string;
  icon: keyof typeof Ionicons.glyphMap; accent?: boolean;
}) {
  return (
    <Card size="quarter" tone={accent ? 'accent' : 'default'}>
      <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
        <View className="gap-0.5">
          <Text variant="label" color="muted">{label}</Text>
          <Text variant="heading" weight="bold" className={accent ? 'text-blue-700 dark:text-blue-400' : ''}>
            {value}
          </Text>
        </View>
        <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
          className={accent ? 'bg-blue-200 dark:bg-blue-800' : 'bg-slate-300 dark:bg-slate-700'}>
          <Ionicons name={icon} size={22} color={accent ? '#1d4ed8' : '#64748b'} />
        </View>
      </View>
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function InstructorDashboard() {
  const router = useRouter();
  const totalStudents = SECTIONS.reduce((s, c) => s + c.students, 0);
  const totalPending  = SECTIONS.reduce((s, c) => s + c.pending, 0);

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Instructor Info Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="flex-row items-center gap-4">
            <View style={{ width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}
              className="bg-blue-200 dark:bg-blue-800">
              <Text variant="subheading" weight="bold" className="text-blue-700 dark:text-blue-300">MS</Text>
            </View>
            <View style={{ flex: 1 }} className="gap-0.5">
              <Text variant="subheading" weight="bold">Prof. Maria Santos</Text>
              <Text variant="label" color="muted">Department of Information Technology</Text>
              <Text variant="caption" color="muted">1st Semester · AY 2024–2025</Text>
            </View>
            <View className="rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/40">
              <Text variant="caption" weight="semibold" className="text-green-700 dark:text-green-400">Active</Text>
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
            { label: 'Sections',         value: String(SECTIONS.length), icon: 'people-outline' as const,        accent: true },
            { label: 'Total Students',   value: String(totalStudents),   icon: 'person-outline' as const },
            { label: 'Pending to Grade', value: String(totalPending),    icon: 'alert-circle-outline' as const },
            { label: 'Subjects',         value: '3',                     icon: 'book-outline' as const },
          ].map((item) => (
            <View key={item.label} style={{ width: 200 }}>
              <StatCard {...item} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="hidden lg:flex lg:flex-row lg:flex-wrap lg:-m-1">
        <StatCard label="Sections"         value={String(SECTIONS.length)} icon="people-outline"       accent />
        <StatCard label="Total Students"   value={String(totalStudents)}   icon="person-outline" />
        <StatCard label="Pending to Grade" value={String(totalPending)}    icon="alert-circle-outline" />
        <StatCard label="Subjects"         value="3"                       icon="book-outline" />
      </View>

      {/* ── My Sections + Recent Submissions ── */}
      <View className="flex-row flex-wrap">
        <Card size="twoThirds">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">My Sections</Text>
              <Pressable onPress={() => router.push('/instructor/section' as any)}>
                <Text variant="caption" color="accent">View all</Text>
              </Pressable>
            </View>
            <View className="gap-2">
              {SECTIONS.map((item) => (
                <Pressable
                  key={item.code}
                  onPress={() => router.push(`/instructor/section/${item.code}` as any)}
                  className="flex-row items-center gap-3 rounded-xl bg-slate-100 p-3 active:opacity-70 dark:bg-slate-800">
                  <View style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: item.color + '22' }}>
                    <Text variant="caption" weight="bold" style={{ color: item.color }}>{item.code.slice(0, 2)}</Text>
                  </View>
                  <View style={{ flex: 1 }} className="gap-0.5">
                    <Text variant="label" weight="semibold" numberOfLines={1}>{item.subject}</Text>
                    <Text variant="caption" color="muted">{item.code} · {item.schedule}</Text>
                  </View>
                  <View className="items-end gap-1">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="person-outline" size={12} color="#94a3b8" />
                      <Text variant="caption" color="muted">{item.students}</Text>
                    </View>
                    {item.pending > 0 && (
                      <View className="rounded-full bg-red-100 px-2 py-0.5 dark:bg-red-900/40">
                        <Text variant="caption" weight="bold" className="text-red-600 dark:text-red-400">
                          {item.pending}
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </Card>

        <Card size="third">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Announcements</Text>
              <Text variant="caption" color="accent">See all</Text>
            </View>
            <View className="gap-3">
              {ANNOUNCEMENTS.map((item, i) => (
                <View key={i} className={`gap-1.5 ${i < ANNOUNCEMENTS.length - 1 ? 'border-b border-slate-200 pb-3 dark:border-slate-700' : ''}`}>
                  <View className="flex-row items-center gap-2">
                    <View className="rounded-full bg-blue-100 px-2 py-0.5 dark:bg-blue-900/40">
                      <Text variant="caption" weight="semibold" className="text-blue-700 dark:text-blue-400">{item.tag}</Text>
                    </View>
                    <Text variant="caption" color="muted">{item.date}</Text>
                  </View>
                  <Text variant="label" weight="medium">{item.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* ── Recent Submissions ── */}
      <View className="flex-row flex-wrap">
        <Card size="full">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Recent Submissions</Text>
              <Pressable onPress={() => router.push('/instructor/grading' as any)}>
                <Text variant="caption" color="accent">Grade all</Text>
              </Pressable>
            </View>
            {/* Header */}
            <View className="flex-row items-center px-1">
              <View style={{ flex: 1 }}><Text variant="caption" color="muted">Student</Text></View>
              <View style={{ width: 80 }} className="items-start"><Text variant="caption" color="muted">Section</Text></View>
              <View style={{ flex: 1 }}><Text variant="caption" color="muted">Task</Text></View>
              <View style={{ width: 80 }} className="items-end"><Text variant="caption" color="muted">Submitted</Text></View>
              <View style={{ width: 64 }} className="items-end"><Text variant="caption" color="muted">Status</Text></View>
            </View>
            <View className="gap-2">
              {RECENT_SUBMISSIONS.map((item, i) => (
                <View key={i} className="flex-row items-center rounded-xl bg-slate-100 px-3 py-2.5 dark:bg-slate-800">
                  <View style={{ flex: 1 }}>
                    <Text variant="label" weight="medium" numberOfLines={1}>{item.student}</Text>
                  </View>
                  <View style={{ width: 80 }}>
                    <Text variant="caption" color="muted">{item.section}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="label" color="muted" numberOfLines={1}>{item.task}</Text>
                  </View>
                  <View style={{ width: 80 }} className="items-end">
                    <Text variant="caption" color="muted">{item.submitted}</Text>
                  </View>
                  <View style={{ width: 64 }} className="items-end">
                    <View className={`rounded-full px-2 py-0.5 ${item.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/40' : 'bg-green-100 dark:bg-green-900/40'}`}>
                      <Text variant="caption" weight="semibold" className={item.status === 'Pending' ? 'text-amber-700 dark:text-amber-400' : 'text-green-700 dark:text-green-400'}>
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
