import { Avatar, Badge, IconButton } from '@mui/material'
import React, { Component } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import zIndex from '@mui/material/styles/zIndex';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const auth = useSelector(store => store.auth);
    const jwt = useSelector(store => store.auth.jwt);
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const handleAvatarClick=()=>{
        if(auth.user.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        } else {
            navigate("/admin/restaurant")
        }
    }
    return (
        <div className='px-5 z-50 sticky top-0 py-[0.8rem] bg-[#e01e63] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
                    BiteRush
                </li>

            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <div className="">
                    <IconButton >
                        <SearchIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user ? <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: pink.A400 }}>
                        {auth.user?.fullName[0].toUpperCase()}</Avatar> :
                        <IconButton onClick={() =>
                            navigate("/account/login")
                        }>
                            <Person />
                        </IconButton>}
                </div>
                <div>
                    <IconButton>
                        <Badge color='info' badgeContent={3}>
                            <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />

                        </Badge>
                    </IconButton>
                </div>

            </div>
        </div>
    )
}
