import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img
            className='h-16 w-16'
            src='https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?rs=1&pid=ImgDetMain' />
        </div>
        <div>
            <p>Pizza</p>
            <p>$399</p>
        </div>
        <div>
            <Button className='cursor-not-allowed'>completed</Button>
        </div>
    </Card>
  )
}

export default OrderCard