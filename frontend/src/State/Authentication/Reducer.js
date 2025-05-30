// import { isPresentInFavorites } from "../../components/Config/logic"
// import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

// const initialState = {
//     user: null,
//     isLoading: true, // Changed to true initially
//     error: null,
//     jwt: localStorage.getItem("jwt") || null, // Initialize from localStorage
//     favorites: [],
//     success: null
// }

// export const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case REGISTER_REQUEST:
//         case LOGIN_REQUEST:
//         case GET_USER_REQUEST:
//         case ADD_TO_FAVORITE_REQUEST:
//             return { ...state, isLoading: true, error: null, success: null }

//         case REGISTER_SUCCESS:
//         case LOGIN_SUCCESS:
//             return { 
//                 ...state, 
//                 isLoading: false, 
//                 jwt: action.payload,
//                 error: null 
//             }

//         case GET_USER_SUCCESS:
//             return {
//                 ...state, 
//                 isLoading: false, 
//                 user: action.payload,
//                 favorites: action.payload.favorites,
//                 error: null
//             }

//         case ADD_TO_FAVORITE_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: null,
//                 favorites: isPresentInFavorites(state.favorites, action.payload)
//                 ? state.favorites.filter((item) => item.id !== action.payload.id)
//                 : [action.payload, ...state.favorites],
//             }    ;

//         case LOGOUT:
//             return { ...initialState, isLoading: false, jwt: null, user:null };

//         case REGISTER_FAILURE:
//         case LOGIN_FAILURE:
//         case GET_USER_FAILURE:
//         case ADD_TO_FAVORITE_FAILURE:
//             return { 
//                 ...state, 
//                 isLoading: false, 
//                 error: action.payload, 
//                 success: null 
//             }

//         default:
//             return state;
//     };
// }










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
  import { isPresentInFavorites } from "../../components/Config/logic";
  
  const loadInitialState = () => ({
    user: null,
    isLoading: false,
    error: null,
    jwt: localStorage.getItem("jwtoriginal") || null,
    favorites: [],
    success: null
  });
  
  export const authReducer = (state = loadInitialState(), action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case GET_USER_REQUEST:
      case ADD_TO_FAVORITE_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          isLoading: false, 
          jwt: action.payload,
          error: null 
        };
  
      case GET_USER_SUCCESS:
        return {
          ...state, 
          isLoading: false, 
          user: action.payload,
          favorites: action.payload.favorites || [],
          error: null
        };
  
      case ADD_TO_FAVORITE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          favorites: isPresentInFavorites(state.favorites, action.payload)
            ? state.favorites.filter((item) => item.id !== action.payload.id)
            : [action.payload, ...state.favorites],
        };
  
      case LOGOUT:
        return { 
          ...loadInitialState(),
          user: null,
    isLoading: false,
    error: null,
    jwt: localStorage.getItem("jwtoriginal") || null,
    favorites: [],
    success: null
        };
  
      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
      case GET_USER_FAILURE:
      case ADD_TO_FAVORITE_FAILURE:
        return { 
          ...state, 
          isLoading: false, 
          error: action.payload 
        };
  
      default:
        return state;
    }
  };