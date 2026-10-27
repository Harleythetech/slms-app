import { ScrollView, View, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/card';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SUBMISSION = {
  id: '1',
  student: 'Juan Dela Cruz',
  studentId: '2024-00001',
  section: 'BSIT-1A',
  subject: 'Information Technology 101',
  subjectCode: 'IT101',
  task: 'Lab Exercise 3',
  type: 'Lab',
  maxScore: 50,
  submittedAt: 'Oct 25, 2024 · 10:32 AM',
  instructions: 'Create a simple CRUD application using HTML, CSS, and JavaScript. The app should be able to add, view, edit, and delete records stored in localStorage.',
  files: [
    { name: 'lab3_juandelacruz.zip', size: '2.4 MB', type: 'zip' },
    { name: 'documentation.pdf',     size: '512 KB', type: 'pdf' },
  ],
  rubric: [
    { criterion: 'Functionality (CRUD)',  maxPoints: 20, description: 'All create, read, update, delete operations work correctly.' },
    { criterion: 'Code Quality',          maxPoints: 10, description: 'Code is clean, readable, and well-commented.' },
    { criterion: 'UI / UX',               maxPoints: 10, description: 'Interface is intuitive and visually clean.' },
    { criterion: 'Documentation',         maxPoints: 10, description: 'README and inline comments are complete.' },
  ],
};

const FILE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  zip: 'archive-outline',
  pdf: 'document-text-outline',
  default: 'document-outline',
};

// ─── Grading Detail ───────────────────────────────────────────────────────────

export default function GradingDetail() {
  const { submissionID } = useLocalSearchParams<{ submissionID: string }>();
  const router = useRouter();

  const [scores, setScores] = useState<Record<string, string>>(
    Object.fromEntries(SUBMISSION.rubric.map(r => [r.criterion, '']))
  );
  const [feedback, setFeedback] = useState('');

  const totalScore = SUBMISSION.rubric.reduce((sum, r) => {
    const v = parseInt(scores[r.criterion] ?? '0') || 0;
    return sum + Math.min(v, r.maxPoints);
  }, 0);

  const allFilled = SUBMISSION.rubric.every(r => scores[r.criterion] !== '');

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">

      {/* ── Header ── */}
      <View className="flex-row flex-wrap">
        <Card size="full" tone="accent">
          <View className="gap-3">
            <View className="flex-row items-start gap-3">
              <Pressable
                onPress={() => router.push('/instructor/grading' as any)}
                style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                className="bg-blue-200 dark:bg-blue-800">
                <Ionicons name="arrow-back" size={18} color="#1d4ed8" />
              </Pressable>
              <View style={{ flex: 1 }} className="gap-0.5">
                <Text variant="caption" color="muted">{SUBMISSION.subjectCode} · {SUBMISSION.section}</Text>
                <Text variant="subheading" weight="bold">{SUBMISSION.task}</Text>
                <Text variant="caption" color="muted">{SUBMISSION.subject}</Text>
              </View>
              <View className="rounded-full bg-amber-100 px-3 py-1 dark:bg-amber-900/40">
                <Text variant="caption" weight="semibold" className="text-amber-700 dark:text-amber-400">
                  Pending
                </Text>
              </View>
            </View>

            {/* Student info */}
            <View className="flex-row items-center gap-3 rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
                className="bg-blue-200 dark:bg-blue-800">
                <Text variant="caption" weight="bold" className="text-blue-700 dark:text-blue-300">JD</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="label" weight="semibold">{SUBMISSION.student}</Text>
                <Text variant="caption" color="muted">{SUBMISSION.studentId} · {SUBMISSION.section}</Text>
              </View>
              <View className="items-end gap-0.5">
                <Text variant="caption" color="muted">Submitted</Text>
                <Text variant="caption" weight="medium">{SUBMISSION.submittedAt}</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* ── Two column on desktop ── */}
      <View className="flex-row flex-wrap">

        {/* Left — submission details */}
        <View className="w-full lg:w-1/2">

          {/* Instructions */}
          <Card size="full">
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="document-text-outline" size={18} color="#1d4ed8" />
                <Text variant="subheading" weight="semibold">Instructions</Text>
              </View>
              <View className="h-px bg-slate-200 dark:bg-slate-700" />
              <Text variant="body" color="muted">{SUBMISSION.instructions}</Text>
            </View>
          </Card>

          {/* Submitted Files */}
          <Card size="full">
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="attach-outline" size={18} color="#1d4ed8" />
                <Text variant="subheading" weight="semibold">Submitted Files</Text>
              </View>
              <View className="h-px bg-slate-200 dark:bg-slate-700" />
              <View className="gap-2">
                {SUBMISSION.files.map((file, i) => (
                  <Pressable
                    key={i}
                    className="flex-row items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 active:opacity-70 dark:bg-slate-800">
                    <Ionicons
                      name={FILE_ICONS[file.type] ?? FILE_ICONS.default}
                      size={22}
                      color="#64748b"
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="label" weight="medium">{file.name}</Text>
                      <Text variant="caption" color="muted">{file.size}</Text>
                    </View>
                    <Ionicons name="download-outline" size={18} color="#1d4ed8" />
                  </Pressable>
                ))}
              </View>
            </View>
          </Card>

        </View>

        {/* Right — rubric + scoring */}
        <View className="w-full lg:w-1/2">
          <Card size="full">
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="ribbon-outline" size={18} color="#1d4ed8" />
                  <Text variant="subheading" weight="semibold">Rubric & Scoring</Text>
                </View>
                <View className="items-end">
                  <Text variant="heading" weight="bold" className="text-blue-700 dark:text-blue-400">
                    {totalScore}/{SUBMISSION.maxScore}
                  </Text>
                  <Text variant="caption" color="muted">Total Score</Text>
                </View>
              </View>
              <View className="h-px bg-slate-200 dark:bg-slate-700" />

              {/* Rubric rows */}
              <View className="gap-3">
                {SUBMISSION.rubric.map((item) => (
                  <View key={item.criterion} className="gap-1.5 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                    <View className="flex-row items-start justify-between gap-3">
                      <View style={{ flex: 1 }}>
                        <Text variant="label" weight="semibold">{item.criterion}</Text>
                        <Text variant="caption" color="muted">{item.description}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <TextInput
                          value={scores[item.criterion]}
                          onChangeText={(v) => setScores(prev => ({ ...prev, [item.criterion]: v }))}
                          keyboardType="number-pad"
                          maxLength={3}
                          placeholder="0"
                          placeholderTextColor="#94a3b8"
                          style={{
                            width: 52,
                            height: 36,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#334155',
                            backgroundColor: '#1e293b',
                            color: '#f1f5f9',
                            textAlign: 'center',
                            fontFamily: 'GoogleSansFlex_9pt-Bold',
                            fontSize: 15,
                          }}
                        />
                        <Text variant="label" color="muted">/{item.maxPoints}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Feedback */}
              <View className="gap-1.5">
                <Text variant="label" weight="semibold">Feedback</Text>
                <TextInput
                  value={feedback}
                  onChangeText={setFeedback}
                  placeholder="Write feedback for the student (optional)..."
                  placeholderTextColor="#475569"
                  multiline
                  numberOfLines={4}
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#334155',
                    backgroundColor: '#1e293b',
                    color: '#f1f5f9',
                    padding: 12,
                    fontFamily: 'GoogleSansFlex_9pt-Regular',
                    fontSize: 13,
                    minHeight: 96,
                    textAlignVertical: 'top',
                  }}
                />
              </View>

              {/* Submit */}
              <Pressable
                onPress={() => router.push('/instructor/grading' as any)}
                disabled={!allFilled}
                className={`w-full rounded-xl p-4 ${allFilled ? 'bg-blue-700 active:bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <Text
                  variant="label"
                  weight="bold"
                  className={allFilled ? 'text-center text-white' : 'text-center text-slate-400 dark:text-slate-500'}>
                  Submit Grade
                </Text>
              </Pressable>

            </View>
          </Card>
        </View>

      </View>
    </ScrollView>
  );
}
