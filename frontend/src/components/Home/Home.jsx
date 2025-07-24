import React, { useEffect } from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction, getUserFavoritesAction } from '../../State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { findCart } from '../../State/Cart/Action';
import { getAllMenu } from '../../State/Menu/Action';
import MenuCard from '../Restaurant/MenuCard';
import AllMenuCard from '../Restaurant/AllMenuCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurant, auth, menu } = useSelector(store => store);
  const jwt = auth.jwt || localStorage.getItem('jwtoriginal');

  useEffect(() => {
    if (jwt) {
      dispatch(getAllMenu(jwt));
      dispatch(getAllRestaurantsAction(jwt));
      dispatch(findCart(jwt));
      dispatch(getUserFavoritesAction(jwt))
      dispatch(getUserFavoritesAction(jwt))

    }
  }, [jwt, dispatch]);

  return (
    <div className='pb-10'>
      <section className='banner z-50 relative flex flex-col justify-center items-center'>
        <div className="w-[50vw] -10 text-center">
          <p className='z-10 text-blue-700 text-3xl lg:text-6xl'>
            Your Favorite Meals, Just a Click Away...
          </p>
        </div>
        <div className='cover absolute top-0 left-0 right-0'></div>
        <div className='fadeout'></div>
      </section>
      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-center text-2xl font-semibold text-gray-400 py-3 pb-10'>Customer Favorites</p>
        <MultiItemCarousel />
      </section>

      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals Available Today</p>
        {/* <div className='space-y-5 lg:w-[80%] lg:pl-10' >
          {
            menu.allMenu.map((item) =>
              <MenuCard item={item} />
            )
          }
        </div> */}

        {
          jwt && auth.user?.role === "ROLE_CUSTOMER" ? (
            <div className='space-y-5 lg:w-[80%] lg:pl-10'>
              {
                menu.allMenu.map((item) =>
                  <AllMenuCard all={true} key={item.id} item={item} />
                )
              }
            </div>
          ) : (
            <p className="text-center text-gray-500">Please log in to view menu items.</p>
          )
        }

        {/* <MultiItemCarousel /> */}
      </section>

      <section className='px-5 lg:px-20 pt-10'>
        <h1 className='text-2xl font-semibold text-gray-400 pb-8'>
          Order From Our Handpicked Favorite Restaurants
        </h1>

        {/* {
          jwt ? (
            <div className='flex flex-wrap items-center justify-around gap'>
              {
                restaurant?.restaurants?.map((item) => {
                  const isFavorite = restaurant?.favorites?.some(fav => fav.id === item.id);
                  return <RestaurantCard key={item.id} item={item} isFavorite={isFavorite} />;
                })
              }
            </div>
          ) : (
            <p className="text-center text-gray-500">Please log in to view restaurants.</p>
          )
        } */}

        {
          jwt && auth.user?.role === "ROLE_CUSTOMER" ? (
            <div className='flex flex-wrap items-center justify-around gap'>
              {
                restaurant?.restaurants?.map((item) => {
                  const isFavorite = restaurant?.favorites?.some(fav => fav.id === item.id);
                  return (
                    <RestaurantCard
                      key={item.id}
                      item={item}
                      isFavorite={isFavorite}
                      onRemove={() => {
                        // This will refresh favorites when an item is removed
                        dispatch(getUserFavoritesAction(jwt));
                      }}
                    />
                  );
                })
              }
            </div>
          ) : (
            <p className="text-center text-gray-500">Please log in to view restaurants.</p>
          )
        }


      </section>
    </div>
  );
};

export default Home;
