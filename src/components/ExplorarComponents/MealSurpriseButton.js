import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchMealSurprise } from '../../services/api';

export default function MealSurpriseButton() {
  const {
    setCards,
    cards,
    clickMealSurprise,
    setClickMealSurprise,
    setIsFetching,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    const getMealSurprise = async () => {
      setCards(await fetchMealSurprise());
    };
    getMealSurprise();
    setIsFetching(false);
  }, [clickMealSurprise, setCards]);

  const handleExploreSurprise = () => {
    setCards([]);
    setClickMealSurprise(clickMealSurprise + 1);
    history.push(`/comidas/${cards[0].idMeal}`);
  };

  return (
    <Button
      data-testid="explore-surprise"
      onClick={ handleExploreSurprise }
      type="button"
      variant="outline-dark"
      size="lg"
    >
      Surprise me!
    </Button>
  );
}
