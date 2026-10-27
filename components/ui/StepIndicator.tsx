import { View } from 'react-native';
import { Text } from '@/components/ui/Text';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <View className="w-full gap-2">

      {/* Dots + connector lines */}
      <View className="flex-row items-center">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = i < currentStep - 1;
          const isActive = i === currentStep - 1;

          return (
            <View key={i} className="flex-1 flex-row items-center">

              {/* Left connector — hidden for first dot */}
              {i === 0 ? (
                <View className="flex-1" />
              ) : (
                <View
                  className={`h-0.5 flex-1 ${
                    isCompleted || isActive ? 'bg-blue-700' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              )}

              {/* Dot */}
              <View
                className={`h-8 w-8 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? 'border-blue-700 bg-blue-700'
                    : isActive
                      ? 'border-blue-700 bg-white dark:bg-slate-900'
                      : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
                }`}>
                {isCompleted ? (
                  <Text className="text-xs font-bold text-white">✓</Text>
                ) : (
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? 'text-blue-700' : 'text-slate-400 dark:text-slate-600'
                    }`}>
                    {i + 1}
                  </Text>
                )}
              </View>

              {/* Right connector — hidden for last dot */}
              {i === totalSteps - 1 ? (
                <View className="flex-1" />
              ) : (
                <View
                  className={`h-0.5 flex-1 ${
                    isCompleted ? 'bg-blue-700' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              )}

            </View>
          );
        })}
      </View>

      {/* Labels centered under each dot */}
      {labels && (
        <View className="flex-row">
          {labels.map((label, i) => {
            const isActive = i === currentStep - 1;
            const isCompleted = i < currentStep - 1;
            return (
              <View key={i} className="flex-1 items-center">
                <Text
                  className={`text-center text-xs ${
                    isActive
                      ? 'font-semibold text-blue-700'
                      : isCompleted
                        ? 'font-medium text-blue-600/60'
                        : 'text-slate-400 dark:text-slate-600'
                  }`}
                  numberOfLines={1}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
      )}

    </View>
  );
}
