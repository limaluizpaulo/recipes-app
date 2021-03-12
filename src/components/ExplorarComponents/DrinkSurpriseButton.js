import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
