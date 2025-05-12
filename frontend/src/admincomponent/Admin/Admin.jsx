import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard';
import Orders from '../Orders/Orders';
import Menu from '../Menu/Menu';
import FoodCategory from '../FoodCategory/FoodCategory';
import Ingredients from '../Ingredients/Ingredients';
import Events from '../Events/Events';
import RestaurantDetails from '../Details/RestaurantDetails';
import CreateMenuForm from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantByUserId, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { getUsersOrders } from '../../State/Order/Action';
import { fetchRestaurantsOrder } from '../../State/RestaurantOrder/Action';

const Admin = () => {
  const { restaurant, auth } = useSelector(store => store);
  const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
  const dispatch = useDispatch();

  const handleClose = () => {

  }
  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      jwt, restaurantId: restaurant.usersRestaurant?.id
    }))
    dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant?.id }));
    dispatch(getRestaurantByUserId(jwt))
    dispatch(getRestaurantById({jwt , restaurantId: restaurant.usersRestaurant?.id}))

  }, [])

  return (
    <div>
      <div className='lg:flex  justify-between'>
        <div className=''>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div
          className='lg:w-[80%]'
        >
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            {/* <Route path='/event' element={<Events />} /> */}
            <Route path='/details' element={<RestaurantDetails />} />
            <Route path='/add-menu' element={<CreateMenuForm />} />


          </Routes>

        </div>
      </div>
    </div>
  )
}

export default Admin