import React, { useContext, useEffect, useState } from 'react';

import { Card, Carousel } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';
import StartButton from '../components/DetailsComponents/StartButton';

export default function FoodDetails() {
  const [recomendations, setRecomendations] = useState([]);

  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const path = history.location.pathname;
  const listIngredients = [];

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substr(path.length - cinco, path.length);
      const endpoint = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const getRecomendations = async () => {
    const endpoint = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    const sixCards = drinks.slice(zero, seis);
    setRecomendations(sixCards);
  };

  const ingredientsList = () => {
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  useEffect(() => {
    const dataFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!dataFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const dataDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!dataDone) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="details-content">

      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={ recipe.strMealThumb }
      />

      <div className="details-header-content">
        <div className="details-title">
          <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
        </div>
        <div className="fav-share-btns">
          <ShareButton />
          <FavButton />
        </div>
      </div>

      <h3>Ingredientes</h3>
      <div className="details-ingredients">
        { ingredientsList() }
        <ul>
          {listIngredients.map((ingredients, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-name-and-measure` }
            >
              {ingredients}
            </li>))}
        </ul>
      </div>

      <h3>Instruções</h3>
      <span
        data-testid="instructions"
        className="details-instructions"
      >
        {recipe.strInstructions}
      </span>

      <h3>Video</h3>
      <iframe
        data-testid="video"
        className="width360"
        title="video"
        src={ recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <h3>Recomendadas</h3>

      <Carousel>
        {recomendations.map((item, key) => (
          <Carousel.Item key={ key }>
            <Link to={ `/comidas/${item.idDrink}` }>
              <Card className="carousel-card">
                <Card.Img
                  variant="top"
                  data-testid={ `${key}-recomendation-card` }
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <Card.Body>
                  <Card.Text>
                    {item.strAlcoholic}
                  </Card.Text>
                  <Card.Title data-testid={ `${key}-recomendation-title` }>
                    {item.strDrink}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

      <StartButton />

    </div>
  );
}
