import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  {
    title: 'Enrollment for 2nd Semester Now Open',
    body: 'Enrollment for the 2nd Semester of AY 2024-2025 is now open for all eligible students. Please proceed to the enrollment portal to select your courses.',
    date: 'Oct 25, 2024',
    author: 'Admin',
    tag: 'Enrollment',
    status: 'Published',
  },
  {
    title: 'Midterm Examination Schedule Released',
    body: 'The midterm examination schedule has been finalized. Students are advised to check their respective course pages for specific dates and rooms.',
    date: 'Oct 22, 2024',
    author: 'Admin',
    tag: 'Exams',
    status: 'Published',
  },
  {
    title: 'System Maintenance — Nov 1, 2:00–4:00 AM',
    body: 'The ISCP Portal will undergo scheduled maintenance on November 1 from 2:00 AM to 4:00 AM. Please save your work before this window.',
    date: 'Oct 20, 2024',
    author: 'Admin',
    tag: 'System',
    status: 'Published',
  },
  {
    title: 'No Classes on Nov 1 (All Saints Day)',
    body: 'In observance of All Saints Day, there will be no classes on November 1, 2024. Classes will resume on November 4, 2024.',
    date: 'Oct 18, 2024',
    author: 'Admin',
    tag: 'Holiday',
    status: 'Published',
  },
  {
    title: 'Faculty Meeting Agenda — Oct 28',
    body: 'A faculty meeting will be held on October 28 at 2:00 PM in the conference room. All instructors are required to attend.',
    date: 'Oct 23, 2024',
    author: 'Admin',
    tag: 'Meeting',
    status: 'Draft',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    Published: {
      bg: 'bg-green-100 dark:bg-green-900/40',
      text: 'text-green-700 dark:text-green-400',
    },
    Draft: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-400' },
  };
  const s = styles[status] ?? styles.Published;
  return (
    <View className={`rounded-full px-2 py-0.5 ${s.bg}`}>
      <Text variant="caption" weight="semibold" className={s.text}>
        {status}
      </Text>
    </View>
  );
}

// ─── Announcements Page ───────────────────────────────────────────────────────

export default function AnnouncementsPage() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      {/* ── Header + Action ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="bg-blue-200 dark:bg-blue-800">
                <Ionicons name="megaphone" size={22} color="#1d4ed8" />
              </View>
              <View>
                <Text variant="subheading" weight="bold">
                  Announcements
                </Text>
                <Text variant="caption" color="muted">
                  Manage institutional announcements and broadcasts
                </Text>
              </View>
            </View>
            <Pressable className="flex-row items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 active:opacity-80">
              <Ionicons name="add" size={16} color="#fff" />
              <Text variant="label" weight="semibold" color="white">
                New Announcement
              </Text>
            </Pressable>
          </View>
        </Card>
      </View>

      {/* ── Announcements List ── */}
      <View className="flex-row flex-wrap">
        <Card size="full">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="subheading" weight="semibold">
                All Announcements
              </Text>
              <View className="flex-row items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700">
                <Ionicons name="search-outline" size={14} color="#94a3b8" />
                <Text variant="label" color="muted">
                  Search…
                </Text>
              </View>
            </View>

            <View className="gap-3">
              {ANNOUNCEMENTS.map((item, i) => (
                <View key={i} className="gap-2 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <View className="rounded-full bg-blue-100 px-2 py-0.5 dark:bg-blue-900/40">
                        <Text
                          variant="caption"
                          weight="semibold"
                          className="text-blue-700 dark:text-blue-400">
                          {item.tag}
                        </Text>
                      </View>
                      <StatusBadge status={item.status} />
                    </View>
                    <Pressable className="h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-200 active:opacity-70 dark:hover:bg-slate-700">
                      <Ionicons name="ellipsis-vertical" size={14} color="#94a3b8" />
                    </Pressable>
                  </View>
                  <Text variant="label" weight="semibold">
                    {item.title}
                  </Text>
                  <Text variant="caption" color="muted" numberOfLines={2}>
                    {item.body}
                  </Text>
                  <View className="flex-row items-center gap-3 pt-1">
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="person-outline" size={11} color="#94a3b8" />
                      <Text variant="caption" color="muted">
                        {item.author}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="calendar-outline" size={11} color="#94a3b8" />
                      <Text variant="caption" color="muted">
                        {item.date}
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
