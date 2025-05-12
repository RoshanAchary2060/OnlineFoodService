import { Grid } from '@mui/material'
import React from 'react'
import OrderTable from '../Orders/OrderTable'
import MenuTable from '../Menu/MenuTable'

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <MenuTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard