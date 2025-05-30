import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import IngredientCategoryForm from './IngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngdientCategory } from '../../State/Ingredients/Action';

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

const IngredientsCategoryTable = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { auth, restaurant, ingredients } = useSelector(store => store);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')

    useEffect(() => {
        dispatch(getIngdientCategory({ id: restaurant.usersRestaurant.id, jwt}));
    }, [])

    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader title={'Ingredients Category'}
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


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingredients.category?.map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="left">{item.id}</TableCell>
                                        <TableCell align="left">{item.name}</TableCell>

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
                        <IngredientCategoryForm />

                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default IngredientsCategoryTable