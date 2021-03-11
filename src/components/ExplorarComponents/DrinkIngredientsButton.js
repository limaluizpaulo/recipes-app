import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function DrinkIngredientsButton() {
  const history = useHistory();

  const handleExploreDrinksByIngredients = () => {
    history.push('/explorar/bebidas/ingredientes');
  };

  return (
    <Card
      data-testid="explore-by-ingredient"
      onClick={ handleExploreDrinksByIngredients }
    >
      <Card.Title>Por Ingredientes</Card.Title>
    </Card>
  );
}
