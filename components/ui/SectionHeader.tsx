import { View } from 'react-native';
import { Text } from '@/components/ui/Text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View className="gap-1">
      <Text className="text-lg font-bold text-slate-900 dark:text-white">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</Text>
      )}
    </View>
  );
}
