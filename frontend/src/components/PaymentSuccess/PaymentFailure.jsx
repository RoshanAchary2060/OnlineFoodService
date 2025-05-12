import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen px-5'>
      <div className='flex flex-col items-center justify-center h-[90vh]'>
        <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
          <HighlightOffIcon sx={{ fontSize: '5rem', color: red[500] }} />
          <h1 className='py-5 text-2xl font-semibold text-red-600'>Payment Failed</h1>
          <p className='py-3 text-center text-gray-400'>Oops! Something went wrong with your transaction.</p>
          <p className='py-2 text-center text-gray-200 text-lg'>Please try again or contact support.</p>
          <Button
            onClick={() => navigate('/')}
            variant='contained'
            color='error'
            sx={{ margin: '1rem 0rem' }}
          >
            Go To Home
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailure;
