import React, { useEffect } from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../../State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { LocalHospitalTwoTone } from '@mui/icons-material';

const Home = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector(store => store);
    // const { jwt } = useSelector(store => store.auth);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurantsAction(jwt));
        }
    }, [jwt, dispatch]);
    
    
    
    return (
        <div className='pb-10'>
            <section className='banner z-50 relative flex flex-col justify-center items-center'>
                <div className="w-[50vw] -10 text-center">
                    {/* <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>BiteRush</p> */}
                    <p className='z-10 text-blue-700 text-3xl lg:text-6xl'>Your Favorite Meals, Just a Click Away...</p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadeout'></div>
            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousel />
            </section>

            <section className='px-5 lg:px-20 pt-10'>
             <h1 className='text-2xl font-semibold text-gray-400 pb-8'>Order From Our Handpicked Favorites</h1>
                <div className='flex flex-wrap items-center justify-around gap'>
                    {
                        restaurant?.restaurants?.map((item) => (
                            <RestaurantCard key={item.id} item={item} />
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;
