import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './State/Authentication/Action';
import CustomerRouter from './Routers/CustomerRouter';
import { api } from './components/Config/api'; // Make sure you have your API configured

function App() {
  const dispatch = useDispatch();
  const { jwt, user, isLoading } = useSelector(store => store.auth);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Always call backend to get fresh JWT
        const { data: backendJwt } = await api.get('/jwt');
        if (backendJwt) {
          localStorage.setItem('jwt', backendJwt);
          await dispatch(getUser(backendJwt));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('jwt');
      } finally {
        setIsAppReady(true);
      }
    };
  
    initializeAuth();
  }, [dispatch]);
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRouter />
    </ThemeProvider>
  );
}

export default App;