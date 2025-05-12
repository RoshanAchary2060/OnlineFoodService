import { darkScrollbar } from '@mui/material';
import { api } from '../../components/Config/api';
import {
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE
} from './ActionType';
import { DialerSipSharp } from '@mui/icons-material';


import { CLEAR_RESTAURANT } from './ActionType';

export const clearRestaurantData = () => {
  return {
    type: CLEAR_RESTAURANT
  };
};

export const getUserFavoritesAction = (jwt) => async (dispatch) => {
    console.log('inside getuserfavoritesaction')
  try {
    const res = await fetch("http://localhost:5000/users/favorites", {
      headers: {
        Authorization: jwt,
      },
    });
    const data = await res.json();
    dispatch({ type: "GET_USER_FAVORITES_SUCCESS", payload: data });
    console.log('favorites data ', data);
  } catch (error) {
    console.log("Favorites fetch error", error);
    dispatch({ type: "GET_USER_FAVORITES_FAIL" });
  }
};

export const getAllRestaurantsAction = (jwt) => {
    console.log('jwt inside getallrestaurants ', jwt);
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants/all", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
            console.log("all restaurant ", data);

        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        }
    }
}


export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
            console.log("get restaurant by user id", data);
        } catch (error) {
            console.log("error ", error);
        }
    }
}

export const createRestaurant = (reqData) => {
    console.log("create restaurant token---", reqData.token);
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`api/admin/restaurants/create`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
            console.log("restaurant created ", data);
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const res = await api.put(
                `api/admin/restaurants/${restaurantId}`,
                restaurantData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
            console.log("restaurant updated ", res.data);
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const res = await api.delete(
                `api/admin/restaurants/${restaurantId}`,
                restaurantData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
            console.log("restaurant deleted ", restaurantId);
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const updateRestaurantStatus = ({ restaurantId, status, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const res = await api.put(
                `api/admin/restaurants/${restaurantId}/status`,
                status,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
        }
    }
}

export const createEventAction = ({ data, jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const res = await api.post(
                `api/admin/events/restaurants/${restaurantId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
        }
    }
}

export const getAllEvents = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const res = await api.get(
                `api/events`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
        }
    }
}

export const deleteEventAction = ({ eventId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            const res = await api.delete(
                `api/admin/events/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
        }
    }
}

export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
        try {
            const res = await api.get(
                `api/admin/events/restaurants/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
        }
    }
}

export const createCategoryAction = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const res = await api.post(
                `api/admin/category/create`,
                reqData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error ", error);
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
        }
    }
}
export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
    console.log("getRestaurantcategory called");

    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
        try {
            const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get restaurants category ", res.data);
            dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });

        } catch (error) {
            dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
        }
    };
};