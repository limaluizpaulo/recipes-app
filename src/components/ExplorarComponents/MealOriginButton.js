import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MealOriginButton() {
  const history = useHistory();
  const handleExploreByArea = () => {
    history.push('/explorar/comidas/area');
  };

  return (
    <Card
      data-testid="explore-by-area"
      onClick={ handleExploreByArea }
    >
      <Card.Title>Por Local de Origem</Card.Title>
    </Card>
  );
}
