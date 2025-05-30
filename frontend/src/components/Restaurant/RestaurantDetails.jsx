import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
import MenuCard from './MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';

// const categories = [

//   "pizza", "biryani", 'burger', 'chicken', 'rice'
// ]
const foodTypes = [
  {
    label: 'All', value: 'all'
  },
  {
    label: 'Vegetarian only', value: 'vegetarian'
  },
  {
    label: 'Non-Vegetarian', value: 'non_vegetarian'
  },
  {
    label: 'Seasonal', value: 'seasonal'
  },
]

const RestaurantDetails = () => {
  const { auth, restaurant, menu } = useSelector(store => store);
  const [foodType, setFoodType] = useState('all');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = auth.jwt || localStorage.getItem("jwtoriginal");
  const [ selectedCategory, setSelectedCategory ] = useState(null);

  const { id, city } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value, e.target.name);
  }

  
  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value);
    console.log(e.target.value, e.target.name, value);
  }

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  }, []);



  useEffect(() => {
  dispatch(getMenuItemsByRestaurantId({
    jwt, 
    restaurantId: id,
    vegetarian: foodType === 'vegetarian', 
    nonveg: foodType === 'non_vegetarian', 
    seasonal: foodType === 'seasonal',
    food_category: selectedCategory || undefined // This is the key change
  }));
}, [selectedCategory, foodType, id, jwt, dispatch]);

  return (
    <div className='px-5 lg:px-20'>
      <section>
        <h1 className=' text-xl text-gray-500 text-center py-2 mt-10' >Restaurant Details</h1>

        <div>
          <Grid container spacing={2}>
            {restaurant.restaurant?.images?.map((imgUrl, index) => (
              <Grid item xs={12} key={index}>
                <img
                  className='w-full h-[40vh] object-contain'
                  src={imgUrl}
                  alt={`restaurant-${index}`}
                />

              </Grid>
            ))}
          </Grid>
        </div>


        <div className='pt-3 pb-5 '>
          <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
          <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'>
              <LocationOnIcon />
              <span>
                {restaurant.restaurant?.address.streetAddress}, {restaurant.restaurant?.address.city}, {restaurant.restaurant?.address.country}
              </span></p>
            <p className='text-gray-500 flex items-center gap-3'>
              <CalendarTodayIcon />
              <span>
                {restaurant.restaurant?.openingHours}
              </span></p>
          </div>

        </div>
      </section>
      <Divider />
      <section className='pt-[2rem] lg:flex relative'>
        <div className='space-y-10 lg:w-[20%] filter '>
          <div className='box space-y-5 lg:sticky top-28 '>
            <div>
              <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>
                Food Type
              </Typography>
              <FormControl className='py-10 space-y-5 ' component={'fieldset'}>
                <RadioGroup onChange={handleFilter}
                 name='food_type'
                  value={foodType}
                >
                  {
                    foodTypes.map((item) => <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label} />)
                  }
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>
                Food Category
              </Typography>
              <FormControl className='py-10 space-y-5 ' component={'fieldset'}>
                <RadioGroup onChange={handleFilterCategory} 
                name='food_category' 
                value={selectedCategory}
                >
                  {
                    restaurant.categories.map((item) =>
                      <FormControlLabel
                        key={item}
                        value={item.name}
                        control={<Radio />}
                        label={item.name} />)
                  }
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='space-y-5 lg:w-[80%] lg:pl-10' >
          {
            menu.menuItems.map((item) =>
              <MenuCard item={item} />
            )
          }
        </div>
      </section>
    </div>
  )
}

export default RestaurantDetails