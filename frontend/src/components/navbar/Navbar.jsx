import { Avatar, Badge, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findCart } from '../../State/Cart/Action';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

export const Navbar = () => {
    const dispatch = useDispatch();
    const { auth, cart } = useSelector(store => store);
    const navigate = useNavigate();
    const jwt = auth.jwt || localStorage.getItem('jwtoriginal');

    useEffect(() => {
        if (jwt && auth.user?.role === "ROLE_CUSTOMER") {
            dispatch(findCart(jwt));
        }
    }, [jwt, auth.user?.role, dispatch]);

    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else {
            navigate("/admin/restaurant");
        }
    };

    return (
        <div className='px-5 z-50 sticky top-0 py-[0.8rem] bg-[#e01e63] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
                    <HomeIcon
                        sx={{
                            fontSize: 48,
                            color: 'inherit',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.2s ease-in-out'
                            }
                        }}
                    />&nbsp;
                    <span>BiteRush</span>
                </li>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <IconButton onClick={() => window.open('https://www.linkedin.com/in/roshan-acharya-254809286', '_blank')}>
                    <InfoIcon sx={{ fontSize: '2.5rem' }} />
                </IconButton>
                <div>
                    {auth.user ? (
                        <Avatar
                            onClick={handleAvatarClick}
                            sx={{ bgcolor: 'white', color: pink.A400 }}
                        >
                            {auth.user?.fullName[0]?.toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>
                    )}
                </div>
                <div>{(jwt && auth.user?.role === "ROLE_CUSTOMER")  ? <IconButton onClick={() => navigate("/cart")}>
                    <Badge color='info' badgeContent={cart.cartItems?.length || 0}>
                        <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                </IconButton> : <IconButton disabled onClick={() => navigate("/cart")}>
                    <Badge color='info' badgeContent={cart.cartItems?.length || 0}>
                        <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                </IconButton>}
                </div>
            </div>
        </div>
    );
};
