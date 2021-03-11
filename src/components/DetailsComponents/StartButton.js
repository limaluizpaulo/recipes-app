import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RecipesContext from '../../context/RecipesContext';

function StartButton() {
  const [showBtn, setShowBtn] = useState(true);
  const [btnText, setBtnText] = useState('Iniciar Receita');
  const [id, setId] = useState('');
  const [redirect, setRedirect] = useState('');

  const {
    recipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    if (path.includes('comidas')) {
      setId(recipe.idMeal);
      setRedirect(`/comidas/${recipe.idMeal}/in-progress`);
    } else {
      setId(recipe.idDrink);
      setRedirect(`/bebidas/${recipe.idDrink}/in-progress`);
    }
  }, [path, recipe.idDrink, recipe.idMeal]);

  const handleStartRecipeClick = () => {
    history.push(redirect);
  };

  useEffect(() => {
    const dataProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (dataProgress) {
      const dataIds = path.includes('comidas') ? Object.keys(dataProgress.meals)
        : Object.keys(dataProgress.cocktails);
      const isInProgress = dataIds.some((item) => item === id);
      return isInProgress ? setBtnText('Continuar Receita')
        : setBtnText('Iniciar Receita');
    }
  }, [id, path]);

  useEffect(() => {
    const dataDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = dataDone && dataDone.some((item) => item.id === id);
    return isDone ? setShowBtn(false) : setShowBtn(true);
  }, [id]);

  return (
    <Button
      variant="success"
      data-testid="start-recipe-btn"
      className={ showBtn ? 'start-recipe-btn-visible' : 'start-recipe-btn-hidden' }
      onClick={ handleStartRecipeClick }
      block
    >
      { btnText }
    </Button>
  );
}

export default StartButton;
