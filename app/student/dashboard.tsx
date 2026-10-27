import { ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { subject: 'Information Technology 101', code: 'IT101', time: '7:30 – 9:00 AM', room: 'Lab 3', days: 'MWF' },
  { subject: 'Mathematics in the Modern World', code: 'MATH1', time: '9:00 – 10:30 AM', room: 'Rm 201', days: 'TTh' },
  { subject: 'Purposive Communication', code: 'ENG2', time: '1:00 – 2:30 PM', room: 'Rm 105', days: 'MWF' },
  { subject: 'Physical Education 1', code: 'PE1', time: '3:00 – 4:30 PM', room: 'Gym', days: 'TTh' },
];

const DEADLINES = [
  { subject: 'IT101', task: 'Lab Exercise 3', due: 'Today', urgent: true },
  { subject: 'MATH1', task: 'Problem Set 2', due: 'Tomorrow', urgent: true },
  { subject: 'ENG2', task: 'Reflection Paper', due: 'Oct 28', urgent: false },
  { subject: 'PE1', task: 'Physical Activity Log', due: 'Oct 30', urgent: false },
];

const RECENT_GRADES = [
  { subject: 'IT101', description: 'Midterm Exam', grade: '1.50', score: '92/100' },
  { subject: 'MATH1', description: 'Long Quiz 2', grade: '1.75', score: '88/100' },
  { subject: 'ENG2', description: 'Oral Recitation', grade: '1.25', score: '95/100' },
  { subject: 'PE1', description: 'Skills Test', grade: '1.00', score: '100/100' },
];

const ANNOUNCEMENTS = [
  { title: 'Enrollment for 2nd Semester', date: 'Oct 25', tag: 'Enrollment' },
  { title: 'Midterm Examination Schedule Released', date: 'Oct 22', tag: 'Exams' },
  { title: 'No Classes on Nov 1 (All Saints Day)', date: 'Oct 20', tag: 'Holiday' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon, accent = false }: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent?: boolean;
}) {
  return (
    <Card size="quarter" tone={accent ? 'accent' : 'default'}>
      <View style={{ minHeight: 80 }} className="flex-row items-center justify-between gap-3">
        <View>
          <Text variant="label" color="muted">{label}</Text>
          <Text variant="heading" weight="bold" className={accent ? 'text-blue-700 dark:text-blue-400' : ''}>
            {value}
          </Text>
        </View>
        <View
          style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
          className={accent ? 'bg-blue-200 dark:bg-blue-800' : 'bg-slate-300 dark:bg-slate-700'}>
          <Ionicons name={icon} size={22} color={accent ? '#1d4ed8' : '#64748b'} />
        </View>
      </View>
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Student Info Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-blue-200 dark:bg-blue-800">
              <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-300">JD</Text>
            </View>
            <View className="flex-1 gap-0.5">
              <Text variant="subheading" weight="bold">Juan Dela Cruz</Text>
              <Text variant="label" color="muted">2024-00001 · BS Information Technology</Text>
              <Text variant="caption" color="muted">1st Year · 1st Semester · AY 2024–2025</Text>
            </View>
            <View className="items-end gap-0.5">
              <View className="rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/40">
                <Text variant="caption" weight="semibold" className="text-green-700 dark:text-green-400">
                  Enrolled
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Stat Cards ── */}
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
            { label: 'GWA', value: '1.50', icon: 'school-outline' as const },
            { label: 'Enrolled Units', value: '24', icon: 'layers-outline' as const },
            { label: 'Pending Tasks', value: '2', icon: 'alert-circle-outline' as const },
            { label: 'Balance', value: '₱1,000', icon: 'wallet-outline' as const },
          ].map((item) => (
            <View key={item.label} style={{ width: 200 }}>
              <StatCard {...item} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="hidden lg:flex lg:flex-row lg:flex-wrap lg:-m-1">
        <StatCard label="GWA" value="1.50" icon="school-outline"/>
        <StatCard label="Enrolled Units" value="24" icon="layers-outline" />
        <StatCard label="Pending Tasks" value="2" icon="alert-circle-outline" />
        <StatCard label="Balance" value="₱1,000" icon="wallet-outline" />
      </View>

      {/* ── Schedule + Deadlines ── */}
      <View className="flex-row flex-wrap">
        <Card size="twoThirds">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Class Schedule</Text>
              <Text variant="caption" color="accent">This Week</Text>
            </View>
            <View className="gap-2">
              {SCHEDULE.map((item) => (
                <View
                  key={item.code}
                  className="flex-row items-center gap-3 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                  <View className="h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                    <Text variant="caption" weight="bold" className="text-blue-700 dark:text-blue-400">
                      {item.code.slice(0, 2)}
                    </Text>
                  </View>
                  <View className="flex-1 gap-0.5">
                    <Text variant="label" weight="semibold" numberOfLines={1}>{item.subject}</Text>
                    <Text variant="caption" color="muted">{item.days} · {item.time}</Text>
                  </View>
                  <View className="items-end gap-0.5">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="location-outline" size={11} color="#94a3b8" />
                      <Text variant="caption" color="muted">{item.room}</Text>
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
              <Text variant="subheading" weight="semibold">Deadlines</Text>
              <View className="rounded-full bg-red-100 px-2 py-0.5 dark:bg-red-900/40">
                <Text variant="caption" weight="bold" className="text-red-600 dark:text-red-400">
                  {DEADLINES.filter(d => d.urgent).length} urgent
                </Text>
              </View>
            </View>
            <View className="gap-2">
              {DEADLINES.map((item, i) => (
                <View key={i} className="flex-row items-start gap-3">
                  <View className={`mt-0.5 h-2 w-2 rounded-full ${item.urgent ? 'bg-red-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <View className="flex-1 gap-0.5">
                    <Text variant="label" weight="medium" numberOfLines={1}>{item.task}</Text>
                    <Text variant="caption" color="muted">{item.subject}</Text>
                  </View>
                  <Text variant="caption" className={item.urgent ? 'text-red-500' : 'text-slate-400'}>
                    {item.due}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* ── Recent Grades + Announcements ── */}
      <View className="flex-row flex-wrap">
        <Card size="twoThirds">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">Recent Grades</Text>
              <Text variant="caption" color="accent">View all</Text>
            </View>
            <View className="gap-2">
              {/* Table header */}
              <View className="flex-row px-3">
                <Text variant="caption" color="muted" className="flex-1">Subject</Text>
                <Text variant="caption" color="muted" className="flex-1">Assessment</Text>
                <Text variant="caption" color="muted" className="w-16 text-right">Score</Text>
                <Text variant="caption" color="muted" className="w-12 text-right">Grade</Text>
              </View>
              {RECENT_GRADES.map((item, i) => (
                <View
                  key={i}
                  className="flex-row items-center rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-800">
                  <Text variant="label" weight="semibold" className="flex-1">{item.subject}</Text>
                  <Text variant="label" color="muted" className="flex-1" numberOfLines={1}>{item.description}</Text>
                  <Text variant="label" color="muted" className="w-16 text-right">{item.score}</Text>
                  <Text variant="label" weight="bold" className="w-12 text-right text-blue-700 dark:text-blue-400">
                    {item.grade}
                  </Text>
                </View>
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
                <View key={i} className="gap-1.5 border-b border-slate-200 pb-3 last:border-0 last:pb-0 dark:border-slate-700">
                  <View className="flex-row items-center gap-2">
                    <View className="rounded-full bg-blue-100 px-2 py-0.5 dark:bg-blue-900/40">
                      <Text variant="caption" weight="semibold" className="text-blue-700 dark:text-blue-400">
                        {item.tag}
                      </Text>
                    </View>
                    <Text variant="caption" color="muted">{item.date}</Text>
                  </View>
                  <Text variant="label" weight="medium" numberOfLines={2}>{item.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </View>

    </ScrollView>
  );
}
