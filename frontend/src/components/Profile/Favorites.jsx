// import React, { useEffect } from 'react'
// import RestaurantCard from '../Restaurant/RestaurantCard'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllRestaurantsAction, getUserFavoritesAction } from '../../State/Restaurant/Action';
// const Favorites = () => {
//   const dispatch = useDispatch();
//   const { restaurant, auth } = useSelector(store => store);
//   const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
//   useEffect(() => {
//     if (jwt) {
//       dispatch(getAllRestaurantsAction(jwt));

//       dispatch(getUserFavoritesAction(jwt));
//     }
//   }, [jwt, dispatch]);
//   console.log('favorites ', auth.favorites);
//   return (
//     <div>
//       <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
//       <div className='flex flex-wrap gap-3 justify-center'>
//         {/* {restaurant?.favorites?.map((item) => <RestaurantCard from="favorites" item={item} />)}
//          */}

//          {restaurant?.favorites?.map((item) => (
//   <RestaurantCard item={item} favorites={auth.favorites} source="favorites" />
// ))}
//       </div>
//     </div>
//   )
// }

// export default Favorites



import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction, getUserFavoritesAction } from '../../State/Restaurant/Action';

const Favorites = () => {
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector(store => store);
  const jwt = auth.jwt || localStorage.getItem('jwtoriginal');

  // Add loading state for better UX
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (jwt) {
      setLoading(true);
      Promise.all([
        dispatch(getUserFavoritesAction(jwt)),

        // dispatch(getAllRestaurantsAction(jwt)),
      ]).finally(() => setLoading(false));
    }
  }, [jwt, dispatch]);

  // Filter favorites directly from the Redux store
  // const currentFavorites = restaurant.restaurants?.filter(rest => 
  //   auth.favorites?.some(fav => fav.id === rest.id)
  // );

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      {loading ? (
        <div className="text-center">Loading favorites...</div>
      ) : (
        <div className='flex flex-wrap gap-3 justify-center'>
          {restaurant?.favorites?.map((item) => (
            <RestaurantCard
              key={item.id}
              item={item}
              favorites={auth.favorites}
              source="favorites"
              isFavorite={true}
              onRemove={() => {
                dispatch(getUserFavoritesAction(jwt));
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites;