import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, getAllMenuItems, getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../State/Ingredients/Action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  restaurantId: '',
  vegetarian: true,
  nonVeg: false,
  seasonal: false,
  ingredientsIds: [],
  images: []
}

const CreateMenuForm = () => {
  const { auth, restaurant, ingredients } = useSelector(store => store);
  const navigate = useNavigate();
  const jwt = auth.jwt || localStorage.getItem('jwtoriginal');
  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {
      const payload = {
        ...values,
        restaurantId: restaurant.usersRestaurant.id,
        ingredientsIds: values.ingredientsIds
      }
      dispatch(createMenuItem({ menu: payload, jwt }))
      dispatch(getAllMenuItems({restaurantId: restaurant.usersRestaurant.id, jwt}))
      navigate('/admin/restaurant/menu');
      console.log('data ', values);
    }
  });

  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file)
    formik.setFieldValue('images', [...formik.values.images, image])
    setUploadImage(false);
  }

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant.id }))
  }, []);

  const [uploadImage, setUploadImage] = useState(false);

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  }

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Menu Item
        </h1>
        <form onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <Grid container spacing={2}>
            <Grid item xs={12} className='flex flex-wrap gap-5'>
              <input type="file"
                accept='image/*'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleImageChange} />
              <label htmlFor='fileInput' className='relative'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-white' ></AddPhotoAlternateIcon>
                </span>
                {
                  uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0
                w-24 h-24 flex justify-center items-center'>
                    <CircularProgress></CircularProgress>
                  </div>
                }
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) =>
                  <div className='relative'>
                    <img className='w-24 h-24 object-cover'
                      key={index} src={image} />
                    <IconButton size='small' sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      outline: 'none'
                    }} onClick={() => handleRemoveImage(index)}>
                      <CloseIcon sx={{ fontSize: '1rem' }}>
                      </CloseIcon>
                    </IconButton>
                  </div>)}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id='name'
                name='name'
                label="Name"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.name}>

              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id='description'
                name='description'
                label="Description"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.description}>

              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField fullWidth id='price'
                name='price'
                label="Price"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.price}>

              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="categoryId"
                  value={formik.values.categoryId}
                  label="Category"
                  onChange={formik.handleChange}
                  name='categoryId'
                >
                  {restaurant.categories.map((item) =>
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} >
              {/* <FormControl fullWidth >
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name='ingredientsIds'
                  value={formik.values.ingredientsIds}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                >
                  {ingredients.ingredients.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name='ingredientsIds'
                  value={formik.values.ingredientsIds}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => {
                        const ingredient = ingredients.ingredients.find(i => i.id === id);
                        return (
                          <Chip key={id} label={ingredient?.name || id} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {ingredients.ingredients.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Grid>


            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="vegetarian"
                  value={formik.values.vegetarian}
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                  name='vegetarian'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="seasonal"
                  value={formik.values.seasonal}
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  name='seasonal'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>







          </Grid>
          <Button className='' variant='contained' color='primary'
            type='submit'>
            Create Menu Item
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateMenuForm