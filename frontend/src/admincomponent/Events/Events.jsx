import { FormatOverline } from '@mui/icons-material';
import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: dayjs(), // start with a valid dayjs object
  endsAt: dayjs()
}

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);
  

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date }); // store as dayjs object
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit ", formValues);
    setFormValues(initialValues);
  }



  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>Create New Event</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name='image'
                    label='Image URL'
                    variant='outlined'
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='location'
                    label='Location'
                    variant='outlined'
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='name'
                    label="Event Name"
                    variant='outlined'
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='Start Date and Time'
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, 'startedAt')
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className='w-full'
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='End Date and Time'
                      value={formValues.endsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, 'endsAt')
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className='w-full'
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Events