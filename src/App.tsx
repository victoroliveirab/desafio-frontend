import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from 'shared/providers/auth';
import Pages from 'pages';
import Header from 'components/Header';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AuthProvider>
        <Header />
        <Pages />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
