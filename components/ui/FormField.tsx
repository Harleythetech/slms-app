import { ReactNode } from 'react';
import { View, TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Text, TextInput } from '@/components/ui/Text';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  rightLabel?: ReactNode;
  suffix?: ReactNode;
}

export function FormField({
  label,
  error,
  rightLabel,
  suffix,
  style,
  ...inputProps
}: FormFieldProps) {
  const scheme = useColorScheme().colorScheme;
  const dark = scheme === 'dark';

  return (
    <View className="gap-1.5">
      {label.length > 0 && (
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </Text>
          {rightLabel}
        </View>
      )}
      <View className="relative justify-center">
        <TextInput
          className={`w-full rounded-xl border p-4 outline-none ${
            error
              ? 'border-red-400 focus:border-red-500 dark:border-red-500'
              : 'border-slate-200 focus:border-blue-700 dark:border-slate-700 dark:focus:border-blue-600'
          } ${suffix ? 'pr-12' : ''}`}
          style={[
            {
              backgroundColor: dark ? '#1e293b' : '#f8fafc',
              color: dark ? '#f1f5f9' : '#0f172a',
            },
            style,
          ]}
          placeholderTextColor={dark ? '#475569' : '#94a3b8'}
          {...inputProps}
        />
        {suffix && <View className="absolute right-4">{suffix}</View>}
      </View>
      {error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
}
