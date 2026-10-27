import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    code: 'IT101',
    title: 'Information Technology 101',
    units: 3,
    instructor: 'Prof. Maria Santos',
    color: '#1d4ed8',
    assessments: [
      { name: 'Quiz 1', score: '18/20', grade: '1.25', type: 'Quiz' },
      { name: 'Lab Exercise 1', score: '48/50', grade: '1.00', type: 'Lab' },
      { name: 'Midterm Exam', score: '92/100', grade: '1.50', type: 'Exam' },
      { name: 'Lab Exercise 2', score: '45/50', grade: '1.25', type: 'Lab' },
    ],
    finalGrade: '1.50',
    status: 'Passing',
  },
  {
    code: 'MATH1',
    title: 'Mathematics in the Modern World',
    units: 3,
    instructor: 'Prof. Jose Reyes',
    color: '#7c3aed',
    assessments: [
      { name: 'Quiz 1', score: '15/20', grade: '1.75', type: 'Quiz' },
      { name: 'Problem Set 1', score: '42/50', grade: '1.50', type: 'Activity' },
      { name: 'Midterm Exam', score: '88/100', grade: '1.75', type: 'Exam' },
    ],
    finalGrade: '1.75',
    status: 'Passing',
  },
  {
    code: 'ENG2',
    title: 'Purposive Communication',
    units: 3,
    instructor: 'Prof. Ana Lim',
    color: '#0891b2',
    assessments: [
      { name: 'Oral Recitation', score: '95/100', grade: '1.25', type: 'Recitation' },
      { name: 'Written Report', score: '47/50', grade: '1.00', type: 'Activity' },
      { name: 'Midterm Exam', score: '90/100', grade: '1.25', type: 'Exam' },
    ],
    finalGrade: '1.25',
    status: 'Passing',
  },
  {
    code: 'PE1',
    title: 'Physical Education 1',
    units: 2,
    instructor: 'Coach Ricardo Cruz',
    color: '#059669',
    assessments: [
      { name: 'Skills Test 1', score: '100/100', grade: '1.00', type: 'Performance' },
      { name: 'Written Exam', score: '98/100', grade: '1.00', type: 'Exam' },
    ],
    finalGrade: '1.00',
    status: 'Passing',
  },
  {
    code: 'NSTP1',
    title: 'National Service Training Program 1',
    units: 3,
    instructor: 'Prof. Luz Flores',
    color: '#d97706',
    assessments: [
      { name: 'Community Service', score: '—', grade: '—', type: 'Service' },
      { name: 'Midterm Exam', score: '—', grade: '—', type: 'Exam' },
    ],
    finalGrade: 'INC',
    status: 'Incomplete',
  },
];

const TYPE_COLORS: Record<string, string> = {
  Quiz:        'bg-blue-100 dark:bg-blue-900/40',
  Lab:         'bg-violet-100 dark:bg-violet-900/40',
  Exam:        'bg-red-100 dark:bg-red-900/40',
  Activity:    'bg-amber-100 dark:bg-amber-900/40',
  Recitation:  'bg-cyan-100 dark:bg-cyan-900/40',
  Performance: 'bg-emerald-100 dark:bg-emerald-900/40',
  Service:     'bg-slate-100 dark:bg-slate-800',
};

const TYPE_TEXT: Record<string, string> = {
  Quiz:        'text-blue-700 dark:text-blue-400',
  Lab:         'text-violet-700 dark:text-violet-400',
  Exam:        'text-red-600 dark:text-red-400',
  Activity:    'text-amber-700 dark:text-amber-400',
  Recitation:  'text-cyan-700 dark:text-cyan-400',
  Performance: 'text-emerald-700 dark:text-emerald-400',
  Service:     'text-slate-500 dark:text-slate-400',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradeChip({ grade, passing }: { grade: string; passing: boolean }) {
  if (grade === '—') return <Text variant="label" color="muted">—</Text>;
  return (
    <View className={`rounded-full px-2.5 py-0.5 ${passing ? 'bg-green-100 dark:bg-green-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
      <Text variant="caption" weight="bold" className={passing ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
        {grade}
      </Text>
    </View>
  );
}

function SubjectCard({ subject }: { subject: typeof SUBJECTS[0] }) {
  const isPassing = subject.status === 'Passing';

  return (
    <Card size="full">
      <View className="gap-4">

        {/* Subject Header */}
        <View className="flex-row items-start gap-3">
          <View
            style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: subject.color + '22' }}>
            <Text variant="label" weight="bold" style={{ color: subject.color }}>
              {subject.code.slice(0, 2)}
            </Text>
          </View>
          <View style={{ flex: 1 }} className="gap-0.5">
            <Text variant="label" weight="semibold" color="muted">{subject.code} · {subject.units} units</Text>
            <Text variant="subheading" weight="semibold">{subject.title}</Text>
            <Text variant="caption" color="muted">{subject.instructor}</Text>
          </View>
          <View className="items-end gap-1">
            <Text variant="heading" weight="bold" style={{ color: isPassing ? '#16a34a' : '#d97706' }}>
              {subject.finalGrade}
            </Text>
            <View className={`rounded-full px-2 py-0.5 ${isPassing ? 'bg-green-100 dark:bg-green-900/40' : 'bg-amber-100 dark:bg-amber-900/40'}`}>
              <Text variant="caption" weight="semibold" className={isPassing ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}>
                {subject.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-slate-200 dark:bg-slate-700" />

        {/* Assessments table */}
        <View className="gap-2">
          <View className="flex-row items-center px-1">
            <View style={{ flex: 1 }}><Text variant="caption" color="muted">Assessment</Text></View>
            <View style={{ width: 72 }} className="items-center"><Text variant="caption" color="muted">Type</Text></View>
            <View style={{ width: 56 }} className="items-end"><Text variant="caption" color="muted">Score</Text></View>
            <View style={{ width: 48 }} className="items-end"><Text variant="caption" color="muted">Grade</Text></View>
          </View>
          {subject.assessments.map((item, i) => (
            <View
              key={i}
              className="flex-row items-center rounded-xl bg-slate-100 px-3 py-2.5 dark:bg-slate-800">
              <View style={{ flex: 1 }}>
                <Text variant="label" weight="medium" numberOfLines={1}>{item.name}</Text>
              </View>
              <View style={{ width: 72 }} className="items-center">
                <View className={`rounded-full px-2 py-0.5 ${TYPE_COLORS[item.type]}`}>
                  <Text variant="caption" weight="semibold" className={TYPE_TEXT[item.type]} numberOfLines={1}>
                    {item.type}
                  </Text>
                </View>
              </View>
              <View style={{ width: 56 }} className="items-end">
                <Text variant="label" color="muted">{item.score}</Text>
              </View>
              <View style={{ width: 48 }} className="items-end">
                <GradeChip grade={item.grade} passing={item.grade !== '—' && parseFloat(item.grade) <= 3.0} />
              </View>
            </View>
          ))}
        </View>

      </View>
    </Card>
  );
}

// ─── Grades ───────────────────────────────────────────────────────────────────

export default function Grades() {
  const passingSubjects = SUBJECTS.filter(s => s.status === 'Passing');
  const totalUnits = SUBJECTS.reduce((sum, s) => sum + s.units, 0);
  const gwa = (
    SUBJECTS.filter(s => s.finalGrade !== 'INC')
      .reduce((sum, s) => sum + parseFloat(s.finalGrade) * s.units, 0) /
    SUBJECTS.filter(s => s.finalGrade !== 'INC')
      .reduce((sum, s) => sum + s.units, 0)
  ).toFixed(2);

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Summary Banner ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <View className="items-center gap-0.5 lg:items-start">
              <Text variant="subheading" weight="bold">Academic Standing</Text>
              <Text variant="caption" color="muted">1st Semester · AY 2024–2025</Text>
            </View>
            <View className="flex-row justify-between gap-6 lg:gap-8">
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">{gwa}</Text>
                <Text variant="caption" color="muted">GWA</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">{passingSubjects.length}/{SUBJECTS.length}</Text>
                <Text variant="caption" color="muted">Passing</Text>
              </View>
              <View className="items-center gap-0.5">
                <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">{totalUnits}</Text>
                <Text variant="caption" color="muted">Units</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Legend ── */}
      <View className="flex-row flex-wrap gap-2 px-1">
        {Object.entries(TYPE_COLORS).map(([type]) => (
          <View key={type} className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${TYPE_COLORS[type]}`}>
            <Text variant="caption" weight="semibold" className={TYPE_TEXT[type]}>{type}</Text>
          </View>
        ))}
      </View>

      {/* ── Subject Grade Cards ── */}
      <View className="flex-row flex-wrap">
        {SUBJECTS.map((subject) => (
          <View key={subject.code} className="w-full lg:w-1/2">
            <SubjectCard subject={subject} />
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
