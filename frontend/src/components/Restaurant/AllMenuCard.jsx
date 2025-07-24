import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../State/Cart/Action';
import { categorizeIngredients } from '../util/categorizeingredients';

const AllMenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(store => store.cart);

  const isAlreadyInCart = cartItems.some(cartItem => cartItem.food?.id === item.id);

  const handleCheckBoxChange = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ingredientName));
    } else {
      setSelectedIngredients(prev => [...prev, ingredientName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem('jwtoriginal'),
      cartItem: {
        restaurantId: item.restaurantId, // ✅ Safe for "all menu" case
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("Added to cart:", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
      >
        <div className='lg:flex items-center justify-between w-full'>
          <div className='lg:flex items-center lg:gap-5'>
            <img
              className='w-[7rem] h-[7rem] object-cover'
              src={item.images[0]}
              alt={item.name}
            />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p>₹{item.price}</p>
              <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {Object.entries(categorizeIngredients(item.ingredients)).map(([category, ingredients]) => (
              <div key={category}>
                <p className='font-semibold'>{category}</p>
                <FormGroup>
                  {ingredients.map(ingredient => (
                    <FormControlLabel
                      key={ingredient.name}
                      control={
                        <Checkbox
                          onChange={() => handleCheckBoxChange(ingredient.name)}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>

          <div className='pt-5'>
            {isAlreadyInCart ? (
              <Button variant='outlined' onClick={() => navigate('/cart')}>
                Go to Cart
              </Button>
            ) : (
              <Button variant='contained' type='submit'>
                Add to Cart
              </Button>
            )}
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default AllMenuCard;
