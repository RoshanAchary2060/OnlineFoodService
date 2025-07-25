import { KeyOff } from '@mui/icons-material';
import { api } from '../../components/Config/api';

import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_ALL_MENU_FAILURE,
    GET_ALL_MENU_ITEMS_FAILURE,
    GET_ALL_MENU_ITEMS_REQUEST,
    GET_ALL_MENU_ITEMS_SUCCESS,
    GET_ALL_MENU_REQUEST,
    GET_ALL_MENU_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS
} from './ActionType';

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post("api/admin/food/create", menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })
            console.log('created menu ', data);
        } catch (error) {
            console.log('catch error ', error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

export const getAllMenu = (jwt, sort = "", food = "") => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_MENU_REQUEST });
    try {
      console.log("getAllMenu called with sort:", sort, "food:", food);

      // Build URL with optional query parameters
      let endpoint = `/api/food?`;

      if (sort) {
        endpoint += `sort=${sort}&`;
      }

      if (food) {
        endpoint += `food=${encodeURIComponent(food)}&`;
      }

      // Remove trailing '&' or '?' if any
      endpoint = endpoint.endsWith("&") || endpoint.endsWith("?")
        ? endpoint.slice(0, -1)
        : endpoint;

      const { data } = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: GET_ALL_MENU_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_MENU_FAILURE, payload: error });
    }
  };
};

export const getAllMenuItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_MENU_ITEMS_REQUEST });
        try {
            const { data } = await api.get(
                `/api/food/restaurant/all/${reqData.restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                    },
                }
            );
            dispatch({ type: GET_ALL_MENU_ITEMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_ALL_MENU_ITEMS_FAILURE, payload: error });
        }
    };
};

// export const getMenuItemsByRestaurantId = (reqData) => {
//     console.log('menu ', reqData);
//     return async (dispatch) => {
//         dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
//         try {
//             const { data } = await api.get(
//                 `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=
//                 ${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.food_category}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${reqData.jwt}`,
//                     },
//                 }
//             );
//             console.log('menu item by restaurants ', data);
//             dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
//         } catch (error) {
//             dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
//         }
//     }
// }


export const getMenuItemsByRestaurantId = (reqData) => {
  // Build query parameters dynamically
  const params = new URLSearchParams();
  params.append('vegetarian', reqData.vegetarian);
  params.append('nonveg', reqData.nonveg);
  params.append('seasonal', reqData.seasonal);
  
  // Only add food_category if it exists
  if (reqData.food_category) {
    params.append('food_category', reqData.food_category);
  }

  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(
                `api/food/search?name=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log('data ... ', data);
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

// export const getAllIngredientsOfMenuItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
//         try {
//             const { data } = await api.get(
//                 `api/food/search?name=${keyword}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`,
//                     },
//                 }
//             );
//             console.log('data ... ', data);
//             dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data});
//         } catch(error) {
//             dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload:error});
//         }
//     }
// }


export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(
                `api/admin/food/status/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log('update menu items availability ... ', data);
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error });
        }
    }
}

export const deleteFoodAction = ({ foodId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(
                `/api/admin/food/delete/${foodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log('update menu items availability ... ', data);
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
        } catch (error) {
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

