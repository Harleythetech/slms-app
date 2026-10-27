import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'student' | 'instructor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  /** Where this role's portal lives. */
  homePath: string;
}

interface AuthContextValue {
  /** The currently logged-in user, or null. */
  session: User | null;
  /** True until we've checked AsyncStorage for a saved session. */
  loaded: boolean;
  /** Validate email/password against dummy accounts and set the session. Returns the user on success, null on failure. */
  login: (email: string, password: string) => User | null;
  /** Clear the session and redirect to login. */
  logout: () => void;
}

// ─── Dummy Accounts ───────────────────────────────────────────────────────────

const DUMMY_ACCOUNTS: Record<string, { password: string; user: User }> = {
  'student@iscp.edu.ph': {
    password: 'student123',
    user: {
      id: '2024-00001',
      name: 'Juan Dela Cruz',
      email: 'student@iscp.edu.ph',
      role: 'student',
      initials: 'JD',
      homePath: '/student/dashboard',
    },
  },
  'instructor@iscp.edu.ph': {
    password: 'instructor123',
    user: {
      id: 'FAC-002',
      name: 'Prof. Maria Santos',
      email: 'instructor@iscp.edu.ph',
      role: 'instructor',
      initials: 'MS',
      homePath: '/instructor',
    },
  },
  'admin@iscp.edu.ph': {
    password: 'admin123',
    user: {
      id: 'ADMIN-001',
      name: 'System Administrator',
      email: 'admin@iscp.edu.ph',
      role: 'admin',
      initials: 'AD',
      homePath: '/admin',
    },
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  session: null,
  loaded: false,
  login: () => null,
  logout: () => {},
});

const STORAGE_KEY = '@slms_session';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load persisted session on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as User;
          setSession(saved);
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  function login(email: string, password: string): User | null {
    const account = DUMMY_ACCOUNTS[email.toLowerCase()];
    if (!account || account.password !== password) return null;
    setSession(account.user);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account.user));
    return account.user;
  }

  function logout() {
    setSession(null);
    AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ session, loaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
