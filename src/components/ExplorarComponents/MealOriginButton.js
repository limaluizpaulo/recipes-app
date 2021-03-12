import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MealOriginButton() {
  const history = useHistory();
  const handleExploreByArea = () => {
    history.push('/explorar/comidas/area');
  };

  return (
    <Button
      data-testid="explore-by-area"
      onClick={ handleExploreByArea }
      type="button"
      variant="outline-dark"
      size="lg"
    >
      By Area
    </Button>
  );
}
