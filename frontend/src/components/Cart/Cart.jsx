import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard';
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { findCart } from '../../State/Cart/Action';
import  { createOrder, getUsersOrders } from '../../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import { DiscFullSharp } from '@mui/icons-material';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};
const initialValues = {
    streetAddress: '',
    state: '',
    postalCode: '',
    city: ''
};
const validationSchema = Yup.object().shape(
    {
        streetAddress: Yup.string().required("Street address is required!"),
        state: Yup.string().required("State is required!"),
        postalCode: Yup.number().required("PostalCode is required!"),
        city: Yup.string().required("City is required!"),

    }
)
const items = [1, 1, 1, 1];

const Cart = () => {
    const navigate = useNavigate();
    const { cart, auth } = useSelector(store => store);
//     const { cart, auth } = useSelector(store => ({
//   cart: store.cart,
//   auth: store.auth
// }));
    const cartItems = useSelector((state) => state.cart.cartItems);
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')
    const createOrderUsingSelectedAddress = () => {

    }
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(findCart(jwt));
    },[])

    const handleOpenAddressModal = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = async (values) => {
        console.log("order formValue", values);
        const data = {
            jwt:auth.jwt || localStorage.getItem('jwtoriginal'),
            order: {
                // restaurantId: cart.cartItems[0].food?.restaurantid,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state:values.state,
                    postalCode: values.postalCode,
                    country: "Nepal"
                }
            }
        }
        dispatch(createOrder(data));
        dispatch(getUsersOrders(jwt));
        dispatch(findCart(jwt));
        // <Payment total={cart.cart.total + cartItems.length * 2} />
const totalAmount = cart.cart.total + cartItems.length * 2;

    // ✅ Navigate to payment page and pass amount
    navigate('/payment', { state: { totalAmount } });

        // navigate('/my-profile/orders');
    }
    // console.log("Cart Redux State:", cart);

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>

                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>₹{cart?.cart?.total}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Fee</p>
                                <p>₹{Number.parseInt(cartItems?.length)}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>GST and Restaurant Charges</p>
                                <p>₹{cartItems?.length}</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400' >
                            <p>Total Pay</p>
                            <p>₹{cart.cart.total + cartItems.length * 2}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>
                            {cart.cart.total === 0 ? 'Add item in cart to place for delivery' : 'Choose Delivery Address'}
                            {/* Choose Delivery Address */}
                            </h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {/* {[1, 1, 1, 1].map((item) =>
                                <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)} */}

                            <Card className='flex gap-5 w-64 p-5'>
                                <AddLocationIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>


                                    <Button disabled={cart.cart.total === 0} variant='outlined' fullWidth onClick={handleOpenAddressModal}>Add</Button>

                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name='streetAddress'
                                        label='Street Address'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name='state'
                                        label='State'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name='city'
                                        label='City'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                        name='postalCode'
                                        label='Postal Code'
                                        fullWidth
                                        variant='outlined'
                                    // error={!ErrorMessage('streetAddress')}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' fullWidth type="submit" color='primary'>
                                        Deliver Here</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}


// const Cart = () => {
//     const dispatch = useDispatch();
//     const { cart } = useSelector(store => store);
//     const [reload, setReload] = useState(false);  // New state to trigger reload

//     const { jwt } = useSelector(store => store.auth);
//     const handleOpenAddressModal = () => setOpen(true);
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);

//     const handleClose = () => setOpen(false);
//     const handleSubmit = (values) => {
//         console.log("formValue", values);

//     }

//     useEffect(() => {
//         if (jwt) {
//             dispatch(findCart(jwt));  // Refetch the cart whenever the `reload` state changes
//         }
//     }, [reload, dispatch, jwt]);  // Add `reload` as a dependency to trigger refetch

//     return (
//         <>
//             <main className='lg:flex justify-between'>
//                 <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
//                     {cart.cart?.item.map((item) => (
//                         <CartItem key={item.id} item={item} />
//                     ))}
//                 </section>
//                 {/* Your other sections */}
//             </main>
//             <Modal open={open}
//                 onClose={handleClose}
//                 aria-labelledby='modal-modal-title'
//                 aria-describedby='modal-modal-description'
//             >
//                 <Box sx={style}>
//                     <Formik initialValues={initialValues}
//                         onSubmit={handleSubmit}
//                         validationSchema={validationSchema}
//                     >
//                         <Form>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <Field as={TextField}
//                                         name='streetAddress'
//                                         label='Street Address'
//                                         fullWidth
//                                         variant='outlined'
//                                     // error={!ErrorMessage('streetAddress')}
//                                     helperText={
//                                         <ErrorMessage>
//                                             {(msg)=><span className='text-red-600'>{msg}</span>}
//                                         </ErrorMessage>
//                                     }
//                                     ></Field>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Field as={TextField}
//                                         name='state'
//                                         label='State'
//                                         fullWidth
//                                         variant='outlined'
//                                     // error={!ErrorMessage('streetAddress')}
//                                     // helperText={
//                                         // <ErrorMessage>
//                                         //     {(msg)=><span className='text-red-600'>{msg}</span>}
//                                         // </ErrorMessage>
//                                     // }
//                                     ></Field>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Field as={TextField}
//                                         name='city'
//                                         label='City'
//                                         fullWidth
//                                         variant='outlined'
//                                     // error={!ErrorMessage('streetAddress')}
//                                     // helperText={
//                                     //     <ErrorMessage>
//                                     //         {(msg)=><span className='text-red-600'>{msg}</span>}
//                                     //     </ErrorMessage>
//                                     // }
//                                     ></Field>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Field as={TextField}
//                                         name='pincode'
//                                         label='Pin Code'
//                                         fullWidth
//                                         variant='outlined'
//                                     // error={!ErrorMessage('streetAddress')}
//                                     // helperText={
//                                     //     <ErrorMessage>
//                                     //         {(msg)=><span className='text-red-600'>{msg}</span>}
//                                     //     </ErrorMessage>
//                                     // }
//                                     ></Field>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Button variant='contained' fullWidth type="submit" color='primary'>
//                                         Deliver Here</Button>
//                                 </Grid>
//                             </Grid>
//                         </Form>
//                     </Formik>
//                 </Box>
//             </Modal>
//         </>
//     );
// };

export default Cart