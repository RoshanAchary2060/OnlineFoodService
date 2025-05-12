import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../State/Ingredients/Action';
import CreateIngredientForm from './CreateIngredientForm';

const orders = [1, 1, 1, 1, 1, 1]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const IngredientsTable = () => {


    const { auth, restaurant, ingredients } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant.id }));
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id, jwt }))

        const updatedIngredients = ingredients.ingredients.map(item =>
            item.id === id ? { ...item, inStock: !item.inStock } : item
        );

        dispatch({
            type: 'UPDATE_INGREDIENTS_LOCALLY',
            payload: updatedIngredients
        });
    }

    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader title={'Ingredients'}
                        sx={{ pt: 2, alignItems: 'center' }}
                        action={
                            <IconButton onClick={handleOpen} aria-label='settings'>
                                <CreateIcon />
                            </IconButton>

                        }
                    >
                    </CardHeader>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Availability</TableCell>



                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingredients.ingredients?.map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{item.id}</TableCell>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{item.category.name}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => handleUpdateStock(item.id)}>
                                                {item.inStock ? 'in stock' : 'out of stock'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}>
                        <CreateIngredientForm />

                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default IngredientsTable
