import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getAllMenuItems, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../State/Menu/Action';

const orders = [1, 1, 1, 1, 1, 1]

const MenuTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { restaurant, menu, auth } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')

    useEffect(() => {
        // dispatch(getMenuItemsByRestaurantId({ jwt,
        //     restaurantId: restaurant.usersRestaurant.id,
        //     vegetarian: true,
        //     seasonal: false,
        //     nonveg: false,
        //     food_category: ''
        //  }))
        dispatch(getAllMenuItems({ restaurantId: restaurant.usersRestaurant.id, jwt }))
    }, [])

    const handleDeleteFood = (foodId) => {
        dispatch(deleteFoodAction({ foodId: foodId, jwt }))
    }

    const handleToggleAvailability = (foodId) => {
        dispatch(updateMenuItemsAvailability({ foodId, jwt }))
            .then(() => {
                // Refresh menu items after update
                dispatch(getAllMenuItems({
                    restaurantId: restaurant.usersRestaurant.id, 
                    jwt
                }));
            });
    };

    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader title={'Menu'}
                        sx={{ pt: 2, alignItems: 'center' }}
                        action={
                            <IconButton onClick={() => navigate('/admin/restaurant/add-menu')} aria-label='settings'>
                                <CreateIcon />
                            </IconButton>
                        }
                    >
                    </CardHeader>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Image</TableCell>
                                    <TableCell align="right">Title</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    {/* <TableCell align="right">Availability</TableCell> */}
                                    <TableCell align="right">Delete</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menu.menuItems?.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="left">
                                            <Avatar src={item.images[0]}></Avatar>
                                        </TableCell>
                                        <TableCell align="right">{item.name}</TableCell>
                                        <TableCell align="right">
                                            {item.ingredients.map((ing) => <Chip label={ing.name} />)}
                                        </TableCell>
                                        <TableCell align="right">₹{item.price}</TableCell>
                                        {/* <TableCell align="right">{item.available?'in_stock':'out_of_stock'}</TableCell> */}
                                        {/* <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color={item.available ? "success" : "error"}
                                                onClick={() => handleToggleAvailability(item.id)}
                                                sx={{
                                                    textTransform: 'none',
                                                    minWidth: 100
                                                }}
                                            >
                                                {item.available ? "In Stock" : "Out of Stock"}
                                            </Button>
                                        </TableCell> */}
                                        <TableCell align="right"><IconButton color='primary'
                                            onClick={() => handleDeleteFood(item.id)}><Delete /></IconButton></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>
        </div>
    )
}

export default MenuTable