import {
    API_URL, api
} from '../../components/Config/api';
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_CATEGORY_SUCCESS, UPDATE_STOCK } from './ActionType';

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                }
            );
            dispatch({
                type: GET_INGREDIENTS
                , payload: response.data
            })
        } catch (error) {

        }
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(
                `/api/admin/restaurants`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                }
            );
            dispatch({
                type: CREATE_INGREDIENT_SUCCESS,
                payload: response.data
            })
        } catch (error) { }
    }
}
export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(
                `/api/admin/ingredients/category`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                }
            );
            dispatch({
                type: CREATE_INGREDIENT_CATEGORY_SUCCESS
                , payload: response.data
            })
        } catch (error) {

        }
    }
}

export const getIngdientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                }
            );
            dispatch({
                type: GET_INGREDIENTS_CATEGORY_SUCCESS
                , payload: response.data
            })
        } catch (error) {

        }
    }
}
export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const { data } = await api.put(
                `/api/admin/ingredients/${id}/stock`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },

                }
            );
            dispatch({
                type: UPDATE_STOCK
                , payload: response.data
            })
        } catch (error) {

        }
    }
}