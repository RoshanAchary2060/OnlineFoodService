import { Chip, IconButton } from '@mui/material'
import React, { useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findCart, removeCartItem, updateCartItem } from '../../State/Cart/Action';

const CartItem = ({ item }) => {
    const { auth, cart } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    const jwt = auth.jwt || localStorage.getItem('jwtoriginal')

    const handleUpdateCartItem = async (value) => {
        if (value == -1 && item.quantity === 1) {
            handleRemoveCartItem();
        } else {
            const updatedItem = { cartItemId: item.id, quantity: item.quantity + value };
            dispatch(updateCartItem({ data: updatedItem, jwt }));
            setReload(!reload);  // Trigger re-render by toggling reload state
        }
    };

    const handleRemoveCartItem = async () => {
    try {
        await dispatch(removeCartItem({ cartItemId: item.id, jwt }));
        // Wait for the removal to complete before refreshing cart
        await dispatch(findCart(jwt));
    } catch (error) {
        console.error("Error removing item:", error);
    }
};

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src={item.food.images[0]} />
                </div>
                <div className='fiex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {item.quantity}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>₹{item.totalPrice}</p>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {item.ingredients.map((ingredient) => <Chip label={ingredient} />)}
            </div>
        </div>
    );
};
export default CartItem