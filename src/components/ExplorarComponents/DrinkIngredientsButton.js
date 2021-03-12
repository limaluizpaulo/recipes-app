import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function DrinkIngredientsButton() {
  const history = useHistory();

  const handleExploreDrinksByIngredients = () => {
    history.push('/explorar/bebidas/ingredientes');
  };

  return (
    <Button
      data-testid="explore-by-ingredient"
      onClick={ handleExploreDrinksByIngredients }
      type="button"
      variant="outline-dark"
      size="lg"
    >
      By Ingredients
    </Button>
  );
}
