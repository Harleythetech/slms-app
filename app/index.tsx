import { Redirect } from 'expo-router';
import { useAuth } from '@/components/context/AuthContext';

export default function Index() {
  const { session, loaded } = useAuth();

  // Wait for AsyncStorage to load before deciding
  if (!loaded) return null;

  if (!session) return <Redirect href="/auth/login" />;

  return <Redirect href={session.homePath as any} />;
}
