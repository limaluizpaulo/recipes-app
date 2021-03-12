import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MealIngredientsButton() {
  const history = useHistory();

  const handleExploreByMealIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  return (
    <Button
      data-testid="explore-by-ingredient"
      onClick={ handleExploreByMealIngredients }
      type="button"
      variant="outline-dark"
      size="lg"
    >
      By Ingredients
    </Button>
  );
}
