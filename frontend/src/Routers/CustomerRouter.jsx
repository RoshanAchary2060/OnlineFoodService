import React from 'react'
import { Navbar } from '../components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Profile from '../components/Profile/Profile';
import Home from '../components/Home/Home';
import RestaurantDetails from '../components/Restaurant/RestaurantDetails';
import Auth from '../components/Auth/Auth';
import PaymentSuccess from '../components/PaymentSuccess/PaymentSuccess';
import Payment from '../components/PaymentSuccess/Payment';
import PaymentFailure from '../components/PaymentSuccess/PaymentFailure';

const CustomerRouter = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />    
            <Route path='/account/:register' element={<Home />} />  
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} /> 
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-profile/*' element={<Profile />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/payment/success' element={<PaymentSuccess />} />
            <Route path='/payment/failure' element={<PaymentFailure />} />
        </Routes>
        <Auth />
    </div>
  )
}

export default CustomerRouter