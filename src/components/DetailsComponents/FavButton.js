import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavButton() {
  const [id, setId] = useState('');
  const {
    favorite,
    setFavorite,
    recipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (path.includes('comidas')) {
      setId(recipe.idMeal);
    } else {
      setId(recipe.idDrink);
    }
  }, [path, recipe.idDrink, recipe.idMeal]);

  useEffect(() => {
    const isFavorite = data && data.some((item) => item.id === id);
    return isFavorite ? setFavorite(true) : setFavorite(false);
  }, [data, id, setFavorite]);

  const handleFavBtn = () => {
    setFavorite(false);
    const newData = data.filter((item) => id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  const handleNotFavBtn = () => {
    setFavorite(true);
    if (path.includes('/comidas')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(data && [...data, {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(data && [...data, {
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }]));
    }
  };

  return (
    <div
      role="button"
      tabIndex={ 0 }
      onKeyPress={ () => {} }
      onClick={ favorite ? handleFavBtn : handleNotFavBtn }
    >
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorited Icon"
        data-testid="favorite-btn"
      />
    </div>
  );
}

export default FavButton;
