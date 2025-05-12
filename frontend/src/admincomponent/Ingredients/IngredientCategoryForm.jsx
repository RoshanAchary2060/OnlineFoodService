import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../State/Ingredients/Action';

const IngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const { restaurant, auth } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
    const [formData, setFormData] = useState(
        {
            name: '',
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name: formData.name, restaurantId: restaurant.usersRestaurant.id }
        console.log(formData);
        dispatch(createIngredientCategory({ data, jwt }))
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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Ingredient Category</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        name='name'
                        id='name'
                        label="Category Name"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}>

                    </TextField>
                    <Button variant='contained' type='submit' >
                        Create Category
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default IngredientCategoryForm