import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './State/Authentication/Action';
import CustomerRouter from './Routers/CustomerRouter';
import { findCart } from './State/Cart/Action';
import { api } from './components/Config/api'; // Make sure you have your API configured
import { getAllRestaurantsAction, getRestaurantByUserId, getUserFavoritesAction } from './State/Restaurant/Action';
import Routers from './Routers/Routers';
import { getUsersOrders } from './State/Order/Action';

function App() {
  const dispatch = useDispatch();
  const { auth}= useSelector(store => store);
  const { user, isLoading } = useSelector(store => store.auth);
  const [isAppReady, setIsAppReady] = useState(false);

  const jwt =  auth.jwt || localStorage.getItem('jwtoriginal');
  useEffect(() => {
    const fetchRestaurants = async () => {
            try {
                
                console.log('jwt in home ', jwt);
                  // dispatch(getUserFavoritesAction(jwt))
                  dispatch(getUser(jwt));
                  dispatch(getAllRestaurantsAction(jwt));

                  dispatch(findCart(jwt))
                
            } catch (err) {
                console.error("JWT fetch failed", err);
            }
    };
    fetchRestaurants();
    dispatch(getUsersOrders(jwt));
}, [jwt]);

useEffect(()=> {
  // dispatch(getUserFavoritesAction(jwt))
  dispatch(getRestaurantByUserId(auth.jwt || jwt));
},[])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;