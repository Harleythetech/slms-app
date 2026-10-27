import { ScrollView, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    code: 'IT101',
    title: 'Information Technology 101',
    color: '#1d4ed8',
    sections: [
      {
        section: 'BSIT-1A',
        assignments: [
          { id: '1',  title: 'Lab Exercise 3', type: 'Lab',      due: 'Oct 28', submitted: 33, graded: 28, maxScore: 50 },
          { id: '2',  title: 'Quiz 2',         type: 'Quiz',     due: 'Nov 3',  submitted: 30, graded: 30, maxScore: 20 },
        ],
      },
      {
        section: 'BSIT-1B',
        assignments: [
          { id: '3',  title: 'Lab Exercise 3', type: 'Lab',      due: 'Oct 28', submitted: 30, graded: 27, maxScore: 50 },
          { id: '4',  title: 'Quiz 2',         type: 'Quiz',     due: 'Nov 3',  submitted: 28, graded: 28, maxScore: 20 },
        ],
      },
    ],
  },
  {
    code: 'CS201',
    title: 'Data Structures & Algorithms',
    color: '#0891b2',
    sections: [
      {
        section: 'BSCS-2A',
        assignments: [
          { id: '5',  title: 'Problem Set 2',  type: 'Activity', due: 'Oct 27', submitted: 30, graded: 30, maxScore: 100 },
          { id: '6',  title: 'Midterm Exam',   type: 'Exam',     due: 'Oct 22', submitted: 30, graded: 30, maxScore: 100 },
        ],
      },
    ],
  },
  {
    code: 'IT301',
    title: 'Web Development',
    color: '#059669',
    sections: [
      {
        section: 'BSIT-3A',
        assignments: [
          { id: '7',  title: 'Project Proposal', type: 'Activity', due: 'Oct 25', submitted: 24, graded: 16, maxScore: 100 },
          { id: '8',  title: 'Lab Exercise 2',   type: 'Lab',      due: 'Oct 20', submitted: 32, graded: 32, maxScore: 50 },
        ],
      },
    ],
  },
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

// ─── Grading Index ────────────────────────────────────────────────────────────

export default function Grading() {
  const router = useRouter();

  // Compute totals
  const allAssignments = SUBJECTS.flatMap(s => s.sections.flatMap(sec => sec.assignments));
  const totalPending   = allAssignments.reduce((sum, a) => sum + (a.submitted - a.graded), 0);
  const totalGraded    = allAssignments.reduce((sum, a) => sum + a.graded, 0);
  const totalSubmitted = allAssignments.reduce((sum, a) => sum + a.submitted, 0);

  // Track collapsed state per subject
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (code: string) => setCollapsed(prev => ({ ...prev, [code]: !prev[code] }));

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Summary Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <View className="items-center gap-0.5 lg:items-start">
              <Text variant="subheading" weight="bold">Grading Overview</Text>
              <Text variant="caption" color="muted">All subjects · 1st Semester AY 2024–2025</Text>
            </View>
            <View className="flex-row justify-center gap-8">
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">{SUBJECTS.length}</Text>
                <Text variant="caption" color="muted">Subjects</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-amber-600 dark:text-amber-400">{totalPending}</Text>
                <Text variant="caption" color="muted">Pending</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-green-600 dark:text-green-400">{totalGraded}/{totalSubmitted}</Text>
                <Text variant="caption" color="muted">Graded</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Subjects ── */}
      {SUBJECTS.map((subject) => {
        const subjectPending = subject.sections
          .flatMap(s => s.assignments)
          .reduce((sum, a) => sum + (a.submitted - a.graded), 0);
        const isCollapsed = collapsed[subject.code];

        return (
          <View key={subject.code} className="gap-2">

            {/* Subject Header */}
            <Pressable
              onPress={() => toggle(subject.code)}
              className="flex-row items-center gap-3 px-1">
              <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: subject.color + '22' }}>
                <Text variant="caption" weight="bold" style={{ color: subject.color }}>
                  {subject.code.slice(0, 2)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="subheading" weight="bold">{subject.code}</Text>
                <Text variant="caption" color="muted">{subject.title}</Text>
              </View>
              {subjectPending > 0 && (
                <View className="rounded-full bg-amber-100 px-2.5 py-1 dark:bg-amber-900/40">
                  <Text variant="caption" weight="bold" className="text-amber-700 dark:text-amber-400">
                    {subjectPending} pending
                  </Text>
                </View>
              )}
              <Ionicons
                name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                size={18}
                color="#64748b"
              />
            </Pressable>

            {/* Sections under this subject */}
            {!isCollapsed && (
              <View className="flex-row flex-wrap">
                {subject.sections.map((sec) => {
                  const secPending = sec.assignments.reduce((sum, a) => sum + (a.submitted - a.graded), 0);
                  return (
                    <View key={sec.section} className="w-full lg:w-1/2">
                      <Card size="full">
                        <View className="gap-3">

                          {/* Section header */}
                          <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                              <Ionicons name="people-outline" size={16} color={subject.color} />
                              <Text variant="label" weight="bold" style={{ color: subject.color }}>
                                {sec.section}
                              </Text>
                            </View>
                            {secPending > 0 ? (
                              <View className="rounded-full bg-amber-100 px-2 py-0.5 dark:bg-amber-900/40">
                                <Text variant="caption" weight="bold" className="text-amber-700 dark:text-amber-400">
                                  {secPending} to grade
                                </Text>
                              </View>
                            ) : (
                              <View className="rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/40">
                                <Text variant="caption" weight="bold" className="text-green-700 dark:text-green-400">
                                  All graded
                                </Text>
                              </View>
                            )}
                          </View>

                          <View className="h-px bg-slate-200 dark:bg-slate-700" />

                          {/* Assignments */}
                          <View className="gap-2">
                            {sec.assignments.map((assignment) => {
                              const pending = assignment.submitted - assignment.graded;
                              return (
                                <Pressable
                                  key={assignment.id}
                                  onPress={() => router.push(`/instructor/grading/${assignment.id}` as any)}
                                  className="flex-row items-center gap-3 rounded-xl bg-slate-100 px-3 py-3 active:opacity-70 dark:bg-slate-800">

                                  {/* Title + type */}
                                  <View style={{ flex: 1 }} className="gap-1">
                                    <Text variant="label" weight="medium" numberOfLines={1}>{assignment.title}</Text>
                                    <View className="flex-row items-center gap-2">
                                      <View className={`rounded-full px-2 py-0.5 ${TYPE_COLORS[assignment.type]}`}>
                                        <Text variant="caption" weight="semibold" className={TYPE_TEXT[assignment.type]}>
                                          {assignment.type}
                                        </Text>
                                      </View>
                                      <View className="flex-row items-center gap-1">
                                        <Ionicons name="calendar-outline" size={11} color="#94a3b8" />
                                        <Text variant="caption" color="muted">Due {assignment.due}</Text>
                                      </View>
                                    </View>
                                  </View>

                                  {/* Submitted */}
                                  <View className="items-end gap-0.5">
                                    <Text variant="label" weight="semibold">{assignment.graded}/{assignment.submitted}</Text>
                                    <Text variant="caption" color="muted">graded</Text>
                                  </View>

                                  {/* Status */}
                                  <View>
                                    {pending > 0 ? (
                                      <View className="rounded-full bg-amber-100 px-2 py-0.5 dark:bg-amber-900/40">
                                        <Text variant="caption" weight="bold" className="text-amber-700 dark:text-amber-400">
                                          {pending} left
                                        </Text>
                                      </View>
                                    ) : (
                                      <View style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}
                                        className="bg-green-100 dark:bg-green-900/40">
                                        <Ionicons name="checkmark" size={16} color="#16a34a" />
                                      </View>
                                    )}
                                  </View>

                                </Pressable>
                              );
                            })}
                          </View>

                        </View>
                      </Card>
                    </View>
                  );
                })}
              </View>
            )}

          </View>
        );
      })}

    </ScrollView>
  );
}
