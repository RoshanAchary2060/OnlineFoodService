import axios from "axios";
import { api, API_URL } from "../../components/Config/api";
import { 
  ADD_TO_FAVORITE_FAILURE, 
  ADD_TO_FAVORITE_REQUEST, 
  ADD_TO_FAVORITE_SUCCESS, 
  GET_USER_FAILURE, 
  GET_USER_REQUEST, 
  GET_USER_SUCCESS, 
  LOGIN_FAILURE, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGOUT, 
  REGISTER_FAILURE, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS 
} from "./ActionType";
import { getAllRestaurantsAction, getUserFavoritesAction } from "../Restaurant/Action";
import { isPresentInFavorites } from "../../components/Config/logic";
import { CLEAR_RESTAURANT } from "../Restaurant/ActionType";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) {
      localStorage.setItem('jwtoriginal', data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
      
      if (data.role === 'ROLE_RESTAURANT_OWNER') {
        reqData.navigate('/admin/restaurant');
      } else {
        reqData.navigate('/');
      }
    }
    console.log('register success', data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};


export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post(`${API_URL}/auth/signin`, reqData.userData);
    const jwt = data.jwt;
    localStorage.setItem('jwtoriginal', jwt);
    console.log('jwt after logging in ', jwt);
    if (data.jwt) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
      await dispatch(getUser(jwt));
      await dispatch(getAllRestaurantsAction(jwt));

      if (data.role === 'ROLE_RESTAURANT_OWNER') {
        reqData.navigate('/admin/restaurant');
      } else {
        reqData.navigate('/');
      }
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  console.log('get user jwt ', jwt);
  dispatch({ type: GET_USER_REQUEST });
  
  if (!jwt) {
    dispatch({ type: GET_USER_FAILURE, payload: 'No JWT found' });
    return;
  }
  try {
    const { data } = await api.get(`/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log('user fetched ', data);

  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt');
      dispatch({ type: LOGOUT });
    }
    dispatch({ type: GET_USER_FAILURE, payload: error });
  }
};

export const addToFavorite = (id, jwt) => async (dispatch) => {
  console.log('inside addtofav call api');
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  
  if (!jwt) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: 'No JWT found' });
    return;
  }

  try {
    const { data } = await api.put(
      `/api/restaurants/${id}/add-favorite`, 
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    dispatch(getUser()); // Refresh user data
    // dispatch(getUserFavoritesAction(data.jwt));
    console.log('added to favorite', data);
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_RESTAURANT });
    navigate('/');
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};