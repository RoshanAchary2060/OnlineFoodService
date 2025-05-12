import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action';

const menu = [
    {title:"Orders", icon:<ShoppingBagIcon />},
    {title:"Favorites", icon:<FavoriteIcon />},
    // {title:"Address", icon:<HomeIcon />},
    // {title:"Payment", icon:<AccountBalanceWalletIcon />},
    // {title:"Notification", icon:<NotificationsActiveIcon />},
    // {title:"Events", icon: <EventIcon /> },
    {title:"Logout", icon: <LogoutIcon />}
]
const ProfileNavigation = ({open, handleClose}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate=(item)=>{
        if(item.title==="Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
        
    }
    const isSmallScreen = useMediaQuery('(max-width-1080px')

  return (
    <div>
        <Drawer onClose={handleClose} 
        variant={isSmallScreen?'temporary':'permanent'}
        //  open={open} 
         anchor='left' 
         open={isSmallScreen ? open: true}
         sx={{ zIndex: -1 }}
         >
            <div className='w-[40vw] lg:w-[20vw] h-[100vh]
             flex flex-col justify-center text-xl gap-8 pt-16'>
                {menu.map((item, i)=><>
                    <div onClick={()=>handleNavigate(item)}  className='px-5 flex items-center space-x-5 cursor-pointer'>
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {i !== menu.length-1 && <Divider />}
                </>)}
            </div>
        </Drawer>
    </div>
  )
}

export default ProfileNavigation