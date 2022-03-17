import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'shared/providers/auth';
import Pages from 'pages';
import Header from 'components/Header';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Pages />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
