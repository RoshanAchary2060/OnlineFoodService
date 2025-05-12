// // import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// // import React, { useEffect } from 'react'
// // import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/RestaurantOrder/Action';
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';

// // const orderStatus = [
// //     { label: 'Pending', value: 'PENDING' },
// //     { label: 'Completed', value: 'COMPLETED' },
// //     { label: 'Out For Delivery', value: 'OUT_FOR_DELIVERY' },
// //     { label: 'Delivered', value: 'DELIVERED' },

// // ]



// // const OrderTable = () => {
// //     const { restaurant, restaurantsOrder } = useSelector(store => store);


// //     const handleUpdateOrder = (orderId ) => {
// //         dispatch(updateOrderStatus({ orderId, orderStatus, jwt }))
// //         handleClose();
// //     }

// //     const navigate = useNavigate();
// //     const dispatch = useDispatch();
// //     const jwt = localStorage.getItem('jwtoriginal')

// //     useEffect(() => {
// //         dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant.id }))
// //     }, [])

// //     const handleClick = () => {

// //     }

// //     // const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
// //     // const open = Boolean(anchorEl);
// //     // const handleClick = (event) => {
// //     //     setAnchorEl(event.currentTarget);
// //     // };
// //     // const handleClose = () => {
// //     //     setAnchorEl(null);
// //     // };

// //     const handleClose = () => {

// //     }

// //     return (
// //         <div>
// //             <Box>
// //                 <Card className='mt-1'>
// //                     <CardHeader title={'All Orders'}
// //                         sx={{ pt: 2, alignItems: 'center' }}
// //                     >

// //                     </CardHeader>
// //                     <TableContainer component={Paper}>
// //                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
// //                             <TableHead>
// //                                 <TableRow>
// //                                     <TableCell>Id</TableCell>
// //                                     <TableCell align="right">Image</TableCell>
// //                                     <TableCell align="right">Customer</TableCell>
// //                                     <TableCell align="right">Price</TableCell>
// //                                     <TableCell align="right">Name</TableCell>
// //                                     <TableCell align="right">Ingredients</TableCell>
// //                                     <TableCell align="right">Status</TableCell>
// //                                     <TableCell align='right'>Update</TableCell>


// //                                 </TableRow>
// //                             </TableHead>
// //                             <TableBody>
// //                                 {restaurantsOrder.orders?.map((item) => (
// //                                     <TableRow
// //                                         key={item.id}
// //                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// //                                     >
// //                                         <TableCell component="th" scope="row">
// //                                             {item.id}
// //                                         </TableCell>
// //                                         <TableCell align="right">
// //                                             <AvatarGroup>
// //                                                 {item.items?.map((orderItem) =>
// //                                                     <Avatar src={orderItem.food.images[0]} />)}



// //                                             </AvatarGroup>
// //                                         </TableCell>
// //                                         <TableCell align="right">{item.customer?.fullName}</TableCell>
// //                                         <TableCell align="right">{item.totalAmount}</TableCell>
// //                                         <TableCell align="right">
// //                                             {item.items?.map((orderItem) => <p>{orderItem.food?.name}</p>)}
// //                                         </TableCell>
// //                                         <TableCell align="right">
// //                                             {item.items?.map((orderItem) =>
// //                                                 <div>
// //                                                     {orderItem.ingredients.map((ing) =>
// //                                                         <Chip label={ing} />)}
// //                                                 </div>
// //                                             )}
// //                                         </TableCell>
// //                                         <TableCell align="right">{item.orderStatus}</TableCell>
// //                                         <TableCell align='right'>
// //                                             <Button
// //                                                 id="basic-button"
// //                                                 aria-controls={open ? 'basic-menu' : undefined}
// //                                                 aria-haspopup="true"
// //                                                 aria-expanded={open ? 'true' : undefined}
// //                                                 onClick={handleClick}
// //                                             >
// //                                                 Update
// //                                             </Button>
// //                                             <Menu
// //                                                 id="basic-menu"
// //                                                 // anchorEl={anchorEl}
// //                                                 open={open}
// //                                                 onClose={handleClose}
// //                                                 MenuListProps={{
// //                                                     'aria-labelledby': 'basic-button',
// //                                                 }}
// //                                             >
// //                                                 {orderStatus.map((status) =>
// //                                                     <MenuItem onClick={() => handleUpdateOrder(item.id, status.value)}>{status.label}</MenuItem>

// //                                                 )}
// //                                             </Menu>
// //                                         </TableCell>

// //                                     </TableRow>
// //                                 ))}
// //                             </TableBody>
// //                         </Table>
// //                     </TableContainer>
// //                 </Card>
// //             </Box>
// //         </div>
// //     )
// // }

// // export default OrderTable


// import {
//     Avatar,
//     Box,
//     Button,
//     Card,
//     CardHeader,
//     Chip,
//     Menu,
//     MenuItem,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow
// } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/RestaurantOrder/Action'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// const orderStatusOptions = [
//     { label: 'Pending', value: 'PENDING' },
//     { label: 'Completed', value: 'COMPLETED' },
//     { label: 'Out For Delivery', value: 'OUT_FOR_DELIVERY' },
//     { label: 'Delivered', value: 'DELIVERED' },
// ]

// const OrderTable = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const jwt = localStorage.getItem('jwtoriginal')
//     const { restaurant, restaurantsOrder } = useSelector((store) => store)
//     const [anchorEl, setAnchorEl] = useState(null)
//     const [selectedOrderId, setSelectedOrderId] = useState(null)
//     const open = Boolean(anchorEl)

//     useEffect(() => {
//         dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant.id }))
//     }, [dispatch, jwt, restaurant.usersRestaurant.id])

//     const handleClick = (event, orderId) => {
//         setAnchorEl(event.currentTarget)
//         setSelectedOrderId(orderId)
//     }

//     const handleClose = () => {
//         setAnchorEl(null)
//         setSelectedOrderId(null)
//     }
//     const handleUpdateOrder = (orderItemId, newStatus) => {
//         dispatch(
//             updateOrderStatus({
//                 orderId: orderItemId,
//                 orderStatus: newStatus,
//                 restaurantId: restaurant.usersRestaurant.id,
//                 jwt
//             })
//         );
//         dispatch(fetchRestaurantsOrder({jwt, restaurantId: restaurant.usersRestaurant.id}))
//         handleClose();
//     };

//     return (
//         <Box>
//             <Card className='mt-1'>
//                 <CardHeader title={'All Orders'} sx={{ pt: 2, alignItems: 'center' }} />
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Id</TableCell>
//                                 <TableCell align="left">Image</TableCell>
//                                 <TableCell align="left">Customer</TableCell>
//                                 <TableCell align="left">Price</TableCell>
//                                 <TableCell align="left">Name</TableCell>
//                                 <TableCell align="left">Ingredients</TableCell>
//                                 <TableCell align="left">Status</TableCell>
//                                 <TableCell align="left">Update</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {restaurantsOrder.orders?.map((item) => (
//                                 <TableRow key={item.id}>
//                                     <TableCell>{item.id}</TableCell>
//                                     <TableCell align="left">
//                                         <Avatar src={item.food.images[0]} />
//                                     </TableCell>
//                                     <TableCell align="left">{item.customer?.fullName || 'N/A'}</TableCell>
//                                     <TableCell align="left">₹{item.totalPrice + 2}</TableCell>
//                                     <TableCell align="left">{item.food.name}</TableCell>
//                                     <TableCell align="left">
//                                         {item.ingredients.map((ing, i) => (
//                                             <Chip key={i} label={ing} className='mx-1 my-1' />
//                                         ))}
//                                     </TableCell>
//                                     <TableCell align="left">{item.orderStatus}</TableCell>
//                                     <TableCell align="left">
//                                         <Button
//                                             id="basic-button"
//                                             aria-controls={open ? 'basic-menu' : undefined}
//                                             aria-haspopup="true"
//                                             aria-expanded={open ? 'true' : undefined}
//                                             onClick={(e) => handleClick(e, item.id)}
//                                         >
//                                             Update
//                                         </Button>
//                                         <Menu
//                                             id="basic-menu"
//                                             anchorEl={anchorEl}
//                                             open={open && selectedOrderId === item.id}
//                                             onClose={handleClose}
//                                             MenuListProps={{
//                                                 'aria-labelledby': 'basic-button',
//                                             }}
//                                         >
//                                             {orderStatusOptions.map((status) => (
//                                                 <MenuItem
//                                                     key={status.value}
//                                                     onClick={() => handleUpdateOrder(item.id, status.value)}
//                                                 >
//                                                     {status.label}
//                                                 </MenuItem>
//                                             ))}
//                                         </Menu>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Card>
//         </Box>
//     )
// }

// export default OrderTable



import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/RestaurantOrder/Action'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const orderStatusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Out For Delivery', value: 'OUT_FOR_DELIVERY' },
    { label: 'Delivered', value: 'DELIVERED' },
]

const OrderTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwtoriginal')
    const { restaurant, restaurantsOrder } = useSelector((store) => store)
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [updatingOrderId, setUpdatingOrderId] = useState(null)
    const open = Boolean(anchorEl)

    useEffect(() => {
        dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant.id }))
    }, [dispatch, jwt, restaurant.usersRestaurant?.id])

    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget)
        setSelectedOrderId(orderId)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setSelectedOrderId(null)
    }

    const handleUpdateOrder = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId)
        try {
            await dispatch(updateOrderStatus({
                orderId,
                orderStatus: newStatus,
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }))
            
            // Immediately update local state for better UX
            dispatch(fetchRestaurantsOrder({
                jwt,
                restaurantId: restaurant.usersRestaurant.id
            }))
        } catch (error) {
            console.error("Failed to update order status:", error)
        } finally {
            setUpdatingOrderId(null)
            handleClose()
        }
    }

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader title={'All Orders'} sx={{ pt: 2, alignItems: 'center' }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Customer</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Ingredients</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantsOrder.orders?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell align="left">
                                        <Avatar src={item.food?.images?.[0]} />
                                    </TableCell>
                                    <TableCell align="left">{item.customer?.fullName || 'N/A'}</TableCell>
                                    <TableCell align="left">₹{item.totalPrice + 2}</TableCell>
                                    <TableCell align="left">{item.food?.name}</TableCell>
                                    <TableCell align="left">
                                        {item.ingredients?.map((ing, i) => (
                                            <Chip key={i} label={ing} className='mx-1 my-1' />
                                        ))}
                                    </TableCell>
                                    <TableCell align="left">
                                        {updatingOrderId === item.id ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            item.orderStatus
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleClick(e, item.id)}
                                            disabled={updatingOrderId === item.id}
                                        >
                                            {updatingOrderId === item.id ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                'Update'
                                            )}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open && selectedOrderId === item.id}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {orderStatusOptions.map((status) => (
                                                <MenuItem
                                                    key={status.value}
                                                    onClick={() => handleUpdateOrder(item.id, status.value)}
                                                    disabled={updatingOrderId === item.id}
                                                >
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default OrderTable