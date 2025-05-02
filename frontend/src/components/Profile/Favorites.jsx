import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
const Favorites = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);
  const { jwt } = useSelector(store => store.auth);    
  useEffect(() => {
          if (jwt) {
              dispatch(getAllRestaurantsAction(jwt));
          }
      }, [jwt, dispatch]);
  const {auth} = useSelector(store=>store);
  console.log('favorites ', auth.favorites);
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      <div className='flex flex-wrap gap-3 justify-center'>
        {restaurant?.restaurants?.map((item)=><RestaurantCard item={item} />)}
      </div>
    </div>
  )
}

export default Favorites