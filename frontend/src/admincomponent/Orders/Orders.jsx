import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder } from '../../State/RestaurantOrder/Action';

const orderStatus = [
  {
    label: 'Pending', value: 'PENDING'
  },
  {
    label: 'Completed', value: 'COMPLETED'
  },
  {
    label: 'All', value: 'ALL'
  }
]

const Orders = () => {

  const { restaurant, auth } = useSelector(store=> store);
  const dispatch = useDispatch();

  const jwt = auth?.jwt || localStorage.getItem('jwtoriginal');

  const [filterValue, setFilterValue] = useState();
  const handleFilter = (e, value) => {
    setFilterValue(value);
  }
  useEffect(()=> {
    dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant?.usersRestaurant.id }))
  },[])
  return (
    <div className='px-2'>
      {/* <Card className='p-5' >
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>
          Order Status
        </Typography>
        <FormControl >
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue || 'all'}>
            {
              orderStatus.map((item) => <FormControlLabel key={item.label} value={item.value}
                control={<Radio />}
            label={item.label} 
            sx={{color:'gray'}}/>)
            }
          </RadioGroup>
        </FormControl>
      </Card> */}
      <OrderTable />
    </div>
  )
}

export default Orders