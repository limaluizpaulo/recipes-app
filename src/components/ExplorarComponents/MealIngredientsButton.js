import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MealIngredientsButton() {
  const history = useHistory();

  const handleExploreByMealIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  return (
    <Card
      data-testid="explore-by-ingredient"
      onClick={ handleExploreByMealIngredients }
    >
      <Card.Title>Por Ingredientes</Card.Title>
    </Card>
  );
}
