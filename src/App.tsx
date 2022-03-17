import { useAuthState } from 'shared/hooks';
import AuthProvider from 'shared/providers/auth';

function App() {
  const state = useAuthState();
  return (
    <div>
      {state.user ? JSON.stringify(state.user, null, 4) : 'not logged in'}
    </div>
  );
}

export default function Wrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
