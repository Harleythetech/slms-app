import { ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';

export default function CourseDetail() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">Course Details</Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400">
        Course content, modules, and assessments.
      </Text>
    </ScrollView>
  );
}
