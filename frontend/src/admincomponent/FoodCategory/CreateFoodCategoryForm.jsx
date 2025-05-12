import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Restaurant/Action';

const CreateFoodCategoryForm = () => {

    const { restaurant, auth } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ categoryName: '', restaurantId: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
           name: formData.categoryName.trim(),
            // restaurantId: formData.restaurantId
            restaurantId: restaurant.usersRestaurant.id
        }
        dispatch(createCategoryAction({ reqData: data, jwt: jwt}))
        console.log(data);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <TextField fullWidth id='categoryName'
                        name='categoryName'
                        label="Category Name"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.categoryName}>

                    </TextField>
                    <Button variant='contained' type='submit' >
                        Create Category
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateFoodCategoryForm