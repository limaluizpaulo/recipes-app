import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchMealSurprise } from '../../services/api';

export default function MealSurpriseButton() {
  const {
    setCards,
    cards,
    clickMealSurprise,
    setClickMealSurprise,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    const getMealSurprise = async () => {
      setCards(await fetchMealSurprise());
    };
    getMealSurprise();
  }, [clickMealSurprise, setCards]);

  const handleExploreSurprise = () => {
    setCards([]);
    setClickMealSurprise(clickMealSurprise + 1);
    console.log(cards);
    history.push(`/comidas/${cards[0].idMeal}`);
  };

  return (
    <Card
      data-testid="explore-surprise"
      onClick={ handleExploreSurprise }
    >
      <Card.Title>Me Surpreenda!</Card.Title>
    </Card>
  );
}
