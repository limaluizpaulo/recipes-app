import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchDrinkSurprise } from '../../services/api';

export default function DrinkSurpriseButton() {
  const {
    setCards,
    cards,
    clickDrinkSurprise,
    setClickDrinkSurprise,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    const getDrinkSurprise = async () => {
      setCards(await fetchDrinkSurprise());
    };
    getDrinkSurprise();
  }, [clickDrinkSurprise, setCards]);

  const handleExploreSurprise = () => {
    setCards([]);
    setClickDrinkSurprise(clickDrinkSurprise + 1);
    console.log(cards);
    history.push(`/bebidas/${cards[0].idDrink}`);
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
