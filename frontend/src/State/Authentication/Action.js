import axios from "axios";
import { api, API_URL } from "../../components/Config/api";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

export const registerUser = (reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData);
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt);
            
        }
        if(data.role==='ROLE_RESTAURANT_OWNER'){
            reqData.navigate('/admin/restaurant')
        } else {
            reqData.navigate('/');
        }
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt});
        console.log('register success', data);

    } catch(error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error", error);
    }
}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await api.post(`${API_URL}/auth/signin`, reqData.userData);
      
      if (data?.jwt) {
        localStorage.setItem('jwt', data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        await dispatch(getUser(data.jwt)); // Wait for user profile to load
      }
  
      // Navigation after successful login and profile load
      if (data.role === 'ROLE_RESTAURANT_OWNER') {
        reqData.navigate('/admin/restaurant');
      } else {
        reqData.navigate('/');
      }
      
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };
  
  export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    localStorage.setItem("jwt", jwt);
    try {
      const { data } = await api.get(`/users/profile`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt');
        dispatch({ type: LOGOUT });
      }
      dispatch({ type: GET_USER_FAILURE, payload: error });
    }
  };

export const addToFavorite = ({jwt, restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
      const { data: backendJwt } = await api.get('/jwt');
        console.log("add to favorite ", backendJwt,",", restaurantId);
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorite`,{},{
            headers:{
                Authorization:`Bearer ${backendJwt}`
            }
        });
        dispatch({type:ADD_TO_FAVORITE_SUCCESS, payload:data});
        console.log('added to favorite', data);
    } catch(error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error", error);
    }
}

// export const logout = ()=>async(dispatch)=>{
//     try {
//         localStorage.clear();
//         dispatch({type:LOGOUT});
//         console.log('logout success');
//     } catch(error) {

//         console.log("error", error);
//     }
// }



export const logout = () => async (dispatch) => {
  try {
    // First call backend DELETE /jwt
    await api.delete('/jwt');
    
    // Clear local storage
    localStorage.clear();
    
    // Dispatch logout action
    dispatch({ type: LOGOUT });

    console.log('Logout successful: JWT deleted from backend and localStorage cleared');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
