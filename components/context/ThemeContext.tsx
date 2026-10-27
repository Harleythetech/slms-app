import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { colorScheme as nwColorScheme, useColorScheme as useNWColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ────────────────────────────────────────────────────────────────────

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  /** The resolved color scheme currently in use. */
  colorScheme: 'light' | 'dark';
  /** The user's theme preference. */
  themeMode: ThemeMode;
  /** Set the theme preference. */
  setThemeMode: (value: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colorScheme: 'light',
  themeMode: 'system',
  setThemeMode: () => {},
});

const STORAGE_KEY = '@slms_theme';

/**
 * Returns the concrete 'light' or 'dark' value to pass to NativeWind.
 * On web, `colorScheme.set('system')` doesn't toggle the `.dark` class on
 * <html>, so Tailwind `dark:` utilities never activate. We resolve the
 * system preference ourselves and pass a concrete value instead.
 * On native, `set('system')` works correctly (Appearance.setColorScheme(null)),
 * so we pass 'system' as-is to let the OS handle it.
 */
function resolveColorScheme(mode: ThemeMode): 'light' | 'dark' | 'system' {
  if (mode === 'system') {
    if (Platform.OS === 'web') {
      const systemDark =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      return systemDark ? 'dark' : 'light';
    }
    return 'system';
  }
  return mode;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme } = useNWColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  // Load persisted preference on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          const mode: ThemeMode =
            saved.themeMode ?? (saved.systemTheme ? 'system' : saved.darkMode ? 'dark' : 'light');
          setThemeModeState(mode);
          try {
            nwColorScheme.set(resolveColorScheme(mode));
          } catch {
            // darkMode flag may not be ready yet — ignore
          }
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  // Persist whenever preference changes
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ themeMode }));
  }, [themeMode, loaded]);

  // Re-apply theme when system theme preference changes (web only)
  // On native, NativeWind handles this automatically via Appearance.
  useEffect(() => {
    if (!loaded || themeMode !== 'system' || Platform.OS !== 'web') return;
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;
    const handler = () => {
      try {
        nwColorScheme.set(mq.matches ? 'dark' : 'light');
      } catch {
        // darkMode flag may not be ready yet — ignore
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [loaded, themeMode]);

  function setThemeMode(value: ThemeMode) {
    setThemeModeState(value);
    try {
      nwColorScheme.set(resolveColorScheme(value));
    } catch {
      // darkMode flag may not be ready yet — ignore
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: colorScheme ?? 'light',
        themeMode,
        setThemeMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme() {
  return useContext(ThemeContext);
}
