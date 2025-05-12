import React from 'react'
import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { createEventAction } from '../../State/Restaurant/Action'

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = ()=> setOpen(true);
  const handleClose = ()=> setOpen(false);
  const [formValues, setFormValues] = React.useState(initialValues)
  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);
  const handleSubmit = (e) => {
    e.preventDefaultI();
    dispatch(createEventAction({ data: formValues, 
      restaurantId: restaurant.usersRestaurant.id, jwt }))

  }
  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {[1, 1, 1].map((item) => <EventCard />)}
    </div>
  )
}

export default Events