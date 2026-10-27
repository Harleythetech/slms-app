import { View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sidebar } from '@/components/navigation/Sidebar';
import { TopHeader } from '@/components/navigation/TopHeader';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';

export default function StudentLayout() {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 dark:bg-slate-950"
      edges={['top', 'bottom']}>

      {/* Desktop: sidebar left, content right */}
      {/* Mobile: content top, tab bar bottom */}
      <View className="flex-1 lg:flex-row">

        {/* Sidebar — desktop only */}
        <Sidebar />

        {/* Main content area */}
        <View className="flex-1">

          {/* Top header — desktop only */}
          <TopHeader />

          {/* Page content */}
          <View className="flex-1">
            <Slot />
          </View>

        </View>

        {/* Bottom tab bar — mobile only */}
        <View className="lg:hidden">
          <BottomTabBar />
        </View>

      </View>
    </SafeAreaView>
  );
}
