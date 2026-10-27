import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@/components/context/ThemeContext';
import { AuthProvider } from '@/components/context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'GoogleSansFlex_9pt-Thin': require('../assets/fonts/GoogleSansFlex_9pt-Thin.ttf'),
    'GoogleSansFlex_9pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_9pt-ExtraLight.ttf'),
    'GoogleSansFlex_9pt-Light': require('../assets/fonts/GoogleSansFlex_9pt-Light.ttf'),
    'GoogleSansFlex_9pt-Regular': require('../assets/fonts/GoogleSansFlex_9pt-Regular.ttf'),
    'GoogleSansFlex_9pt-Medium': require('../assets/fonts/GoogleSansFlex_9pt-Medium.ttf'),
    'GoogleSansFlex_9pt-SemiBold': require('../assets/fonts/GoogleSansFlex_9pt-SemiBold.ttf'),
    'GoogleSansFlex_9pt-Bold': require('../assets/fonts/GoogleSansFlex_9pt-Bold.ttf'),
    'GoogleSansFlex_9pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_9pt-ExtraBold.ttf'),
    'GoogleSansFlex_9pt-Black': require('../assets/fonts/GoogleSansFlex_9pt-Black.ttf'),
    'GoogleSansFlex_24pt-Thin': require('../assets/fonts/GoogleSansFlex_24pt-Thin.ttf'),
    'GoogleSansFlex_24pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_24pt-ExtraLight.ttf'),
    'GoogleSansFlex_24pt-Light': require('../assets/fonts/GoogleSansFlex_24pt-Light.ttf'),
    'GoogleSansFlex_24pt-Regular': require('../assets/fonts/GoogleSansFlex_24pt-Regular.ttf'),
    'GoogleSansFlex_24pt-Medium': require('../assets/fonts/GoogleSansFlex_24pt-Medium.ttf'),
    'GoogleSansFlex_24pt-SemiBold': require('../assets/fonts/GoogleSansFlex_24pt-SemiBold.ttf'),
    'GoogleSansFlex_24pt-Bold': require('../assets/fonts/GoogleSansFlex_24pt-Bold.ttf'),
    'GoogleSansFlex_24pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_24pt-ExtraBold.ttf'),
    'GoogleSansFlex_24pt-Black': require('../assets/fonts/GoogleSansFlex_24pt-Black.ttf'),
    'GoogleSansFlex_36pt-Thin': require('../assets/fonts/GoogleSansFlex_36pt-Thin.ttf'),
    'GoogleSansFlex_36pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_36pt-ExtraLight.ttf'),
    'GoogleSansFlex_36pt-Light': require('../assets/fonts/GoogleSansFlex_36pt-Light.ttf'),
    'GoogleSansFlex_36pt-Regular': require('../assets/fonts/GoogleSansFlex_36pt-Regular.ttf'),
    'GoogleSansFlex_36pt-Medium': require('../assets/fonts/GoogleSansFlex_36pt-Medium.ttf'),
    'GoogleSansFlex_36pt-SemiBold': require('../assets/fonts/GoogleSansFlex_36pt-SemiBold.ttf'),
    'GoogleSansFlex_36pt-Bold': require('../assets/fonts/GoogleSansFlex_36pt-Bold.ttf'),
    'GoogleSansFlex_36pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_36pt-ExtraBold.ttf'),
    'GoogleSansFlex_36pt-Black': require('../assets/fonts/GoogleSansFlex_36pt-Black.ttf'),
    'GoogleSansFlex_72pt-Thin': require('../assets/fonts/GoogleSansFlex_72pt-Thin.ttf'),
    'GoogleSansFlex_72pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_72pt-ExtraLight.ttf'),
    'GoogleSansFlex_72pt-Light': require('../assets/fonts/GoogleSansFlex_72pt-Light.ttf'),
    'GoogleSansFlex_72pt-Regular': require('../assets/fonts/GoogleSansFlex_72pt-Regular.ttf'),
    'GoogleSansFlex_72pt-Medium': require('../assets/fonts/GoogleSansFlex_72pt-Medium.ttf'),
    'GoogleSansFlex_72pt-SemiBold': require('../assets/fonts/GoogleSansFlex_72pt-SemiBold.ttf'),
    'GoogleSansFlex_72pt-Bold': require('../assets/fonts/GoogleSansFlex_72pt-Bold.ttf'),
    'GoogleSansFlex_72pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_72pt-ExtraBold.ttf'),
    'GoogleSansFlex_72pt-Black': require('../assets/fonts/GoogleSansFlex_72pt-Black.ttf'),
    'GoogleSansFlex_120pt-Thin': require('../assets/fonts/GoogleSansFlex_120pt-Thin.ttf'),
    'GoogleSansFlex_120pt-ExtraLight': require('../assets/fonts/GoogleSansFlex_120pt-ExtraLight.ttf'),
    'GoogleSansFlex_120pt-Light': require('../assets/fonts/GoogleSansFlex_120pt-Light.ttf'),
    'GoogleSansFlex_120pt-Regular': require('../assets/fonts/GoogleSansFlex_120pt-Regular.ttf'),
    'GoogleSansFlex_120pt-Medium': require('../assets/fonts/GoogleSansFlex_120pt-Medium.ttf'),
    'GoogleSansFlex_120pt-SemiBold': require('../assets/fonts/GoogleSansFlex_120pt-SemiBold.ttf'),
    'GoogleSansFlex_120pt-Bold': require('../assets/fonts/GoogleSansFlex_120pt-Bold.ttf'),
    'GoogleSansFlex_120pt-ExtraBold': require('../assets/fonts/GoogleSansFlex_120pt-ExtraBold.ttf'),
    'GoogleSansFlex_120pt-Black': require('../assets/fonts/GoogleSansFlex_120pt-Black.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="student" />
          <Stack.Screen name="instructor" />
          <Stack.Screen name="admin" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
