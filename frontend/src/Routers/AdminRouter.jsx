import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../admincomponent/createrestaurantform/CreateRestaurantForm'
import Admin from '../admincomponent/Admin/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByUserId } from '../State/Restaurant/Action'

const AdminRouter = () => {
    const { restaurant, auth } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRestaurantByUserId(auth.jwt || jwt));
    },[])

    return (
        <div>
            <Routes>
                <Route path='/*' element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} />
            </Routes>
        </div>
    )
}

export default AdminRouter