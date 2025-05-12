// import { Card, Chip, IconButton } from '@mui/material'
// import React from 'react'
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useNavigate } from 'react-router-dom';
// import { addToFavorite } from '../../State/Authentication/Action';
// import { useDispatch, useSelector } from 'react-redux';
// import { isPresentInFavorites } from '../Config/logic';
// 

// const RestaurantCard = ({ item, favorites, source }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { auth } = useSelector(store => store);
//     const jwt = auth.jwt || localStorage.getItem("jwtoriginal");
//     const effectiveFavorites = favorites || auth.favorites;

//     const handleAddToFavorite = (e, item) => {
//         e.preventDefault(); // Prevent event bubbling
//         e.stopPropagation();
//         console.log('inside handleaddtofav');
//         dispatch(addToFavorite(item.id, jwt));
//           if (source === "favorites") {
//         dispatch(getUserFavoritesAction(jwt));
//       }
//     };



//     const handleNavigateToRestaurant = () => {
//         if (item.open) {
//             navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
//         }
//     }

//     return (
//         <Card className='w-[18rem]'>
//             <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
//                 <img className='w-full h-[10rem] rounded-t-md object-cover'
//                     src={item?.images[0]}
//                     alt={item.name}
//                 />
//                 <Chip size='small'
//                     className='absolute top-2 left-2'
//                     color={item.open ? "success" : "error"}
//                     label={item.open ? "open" : "closed"}
//                 />
//             </div>
//             <div className='p-4 textPart lg:flex w-full justify-between'>
//                 <div className='space-y-1'>
//                     <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.name}</p>
//                     <p className='text-gray-500 text-sm'>
//                         {item.description}
//                     </p>
//                 </div>
//                 {/* <IconButton onClick={(e)=>handleAddToFavorite(e, item)}>
//                     {isPresentInFavorites(auth.favorites, item) ? 
//                         <FavoriteIcon color="error"/> : 
//                         <FavoriteBorderIcon/>}
//                 </IconButton> */}

//                 {/* <IconButton onClick={(e) => handleAddToFavorite(e, item)}>
//                     {from === "favorites" ? (
//                         <FavoriteIcon color="error" />
//                     ) : isPresentInFavorites(auth.favorites, item) ? (
//                         <FavoriteIcon color="error" />
//                     ) : (
//                         <FavoriteBorderIcon />
//                     )}
//                 </IconButton> */}

//                 <IconButton onClick={(e) => handleAddToFavorite(e, item)}>
//                     {isPresentInFavorites(effectiveFavorites, item) ? (
//                         <FavoriteIcon color="error" />
//                     ) : (
//                         <FavoriteBorderIcon />
//                     )}
//                 </IconButton>


//             </div>
//         </Card>
//     );
// };

// export default RestaurantCard;



import { Card, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { addToFavorite } from '../../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import { isPresentInFavorites } from '../Config/logic';
import { getAllRestaurantsAction, getUserFavoritesAction } from '../../State/Restaurant/Action';

// const RestaurantCard = ({ item, favorites, source, onRemove }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { auth } = useSelector(store => store);
//     const jwt = auth.jwt || localStorage.getItem("jwtoriginal");
//     const effectiveFavorites = favorites || auth.favorites;

//     const handleAddToFavorite = async (e, item) => {
//         e.preventDefault();
//         e.stopPropagation();

//         try {
//             await dispatch(addToFavorite(item.id, jwt));

//             // If in favorites page and item was favorited (now being removed)
//             if (source === "favorites" && isPresentInFavorites(effectiveFavorites, item)) {
//                 if (onRemove) onRemove(); // Trigger parent update
//             } else {
//                 // For other pages, just refresh favorites
//                 // dispatch(getUserFavoritesAction(jwt));
//             }
//         } catch (error) {
//             console.error("Failed to update favorites:", error);
//         }
//     };

//     const handleNavigateToRestaurant = () => {
//         if (item.open) {
//             navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
//         }
//     }

//     return (
//         <Card onClick={handleNavigateToRestaurant} className='w-[18rem]'>
//             <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
//                 <img className='w-full h-[10rem] rounded-t-md object-cover'
//                     src={item?.images[0]}
//                     alt={item.name}
//                 />
//                 <Chip size='small'
//                     className='absolute top-2 left-2'
//                     color={item.open ? "success" : "error"}
//                     label={item.open ? "open" : "closed"}
//                 />
//             </div>
//             <div className='p-4 textPart lg:flex w-full justify-between'>
//                 <div className='space-y-1'>
//                     <p  className='font-semibold text-lg cursor-pointer'>{item.name}</p>
//                     <p className='text-gray-500 text-sm'>
//                         {item.description}
//                     </p>
//                 </div>
//                 <IconButton onClick={(e) => handleAddToFavorite(e, item)}>
//                     {isPresentInFavorites(effectiveFavorites, item) ? (
//                         <FavoriteIcon color="error" />
//                     ) : (
//                         <FavoriteBorderIcon />
//                     )}
//                 </IconButton>
//             </div>
//         </Card>
//     );
// };

// export default RestaurantCard;


// const RestaurantCard = ({ item, favorites, isFavorite, source, onRemove, isFavPage = false }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { auth, restaurant } = useSelector(store => store);
//     const jwt = auth.jwt || localStorage.getItem("jwtoriginal");
//     const effectiveFavorites = favorites || auth.favorites;
//     useEffect(()=> {
//         dispatch(getUserFavoritesAction(jwt));
//         dispatch(getAllRestaurantsAction(jwt));
//     },[])
//     const handleAddToFavorite = async (e, item) => {
//         e.preventDefault();
//         e.stopPropagation();

//         try {
//             await dispatch(addToFavorite(item.id, jwt));
//             if (source === "favorites" || isFavPage) {
//                 if (onRemove) onRemove(); // Trigger UI update from parent
//             }
//         } catch (error) {
//             console.error("Failed to update favorites:", error);
//         }
//     };

//     const handleNavigateToRestaurant = () => {
//         if (item.open) {
//             navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
//         }
//     }

//     return (
//         <Card onClick={handleNavigateToRestaurant} className='w-[18rem]'>
//             <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
//                 <img className='w-full h-[10rem] rounded-t-md object-cover'
//                     src={item?.images[0]}
//                     alt={item.name}
//                 />
//                 <Chip size='small'
//                     className='absolute top-2 left-2'
//                     color={item.open ? "success" : "error"}
//                     label={item.open ? "open" : "closed"}
//                 />
//             </div>
//             <div className='p-4 textPart lg:flex w-full justify-between'>
//                 <div className='space-y-1'>
//                     <p className='font-semibold text-lg cursor-pointer'>{item.name}</p>
//                     <p className='text-gray-500 text-sm'>{item.description}</p>
//                 </div>
//                 <IconButton onClick={(e) => handleAddToFavorite(e, item)}>
//                     {isFavPage || isPresentInFavorites(effectiveFavorites, item) ? (
//                         <FavoriteIcon color="error" />
//                     ) : (
//                         <FavoriteBorderIcon />
//                     )}
//                 </IconButton>
//             </div>
//         </Card>
//     );
// };
//  export default RestaurantCard;

const RestaurantCard = ({ item, isFavorite, onRemove }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem("jwtoriginal");

    const handleAddToFavorite = async (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await dispatch(addToFavorite(item.id, jwt));
            if (onRemove) onRemove(); // This will trigger a refresh in parent
        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    };

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }

    return (
        <Card onClick={handleNavigateToRestaurant} className='w-[18rem]'>
            <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
                <img className='w-full h-[10rem] rounded-t-md object-cover'
                    src={item?.images[0]}
                    alt={item.name}
                />
                <Chip size='small'
                    className='absolute top-2 left-2'
                    color={item.open ? "success" : "error"}
                    label={item.open ? "open" : "closed"}
                />
            </div>
            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className='font-semibold text-lg cursor-pointer'>{item.name}</p>
                    <p className='text-gray-500 text-sm'>{item.description}</p>
                </div>
                <IconButton onClick={(e) => handleAddToFavorite(e, item)}>
                    {isFavorite ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </div>
        </Card>
    );
};

export default RestaurantCard