import React, { useContext, useEffect, useState } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FavButton from '../components/DetailsComponents/FavButton';
import ShareButton from '../components/DetailsComponents/ShareButton';
import StartButton from '../components/DetailsComponents/StartButton';

export default function DrinkDetails() {
  const [recomendations, setRecomendations] = useState([]);
  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const quinze = 15;
  const path = history.location.pathname;
  const listIngredients = [];

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.length === quinze ? path.substr(path.length - seis, path.length)
        : path.substr(path.length - cinco, path.length);
      const endpoint = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipe(drinks[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const getRecomendations = async () => {
    const endpoint = ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await fetch(endpoint).then((response) => response.json());
    const sixCards = meals.slice(zero, seis);
    setRecomendations(sixCards);
  };

  const ingredientsList = () => {
    for (let i = 1; i <= quinze; i += 1) {
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
        src={ recipe.strDrinkThumb }
      />

      <div className="details-header-content">
        <div className="details-title">
          <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
          <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
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

      <span
        data-testid="instructions"
        className="details-instructions"
      >
        {recipe.strInstructions}
      </span>

      <h3>Recomendadas</h3>

      <Carousel>

        {recomendations.map((item, key) => (
          <Carousel.Item key={ key }>
            <Link to={ `/bebidas/${item.idMeal}` }>
              <Card className="carousel-card">
                <Card.Img
                  variant="top"
                  data-testid={ `${key}-recomendation-card` }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <Card.Body>
                  <Card.Text>
                    {item.strCategory}
                  </Card.Text>
                  <Card.Title data-testid={ `${key}-recomendation-title` }>
                    {item.strMeal}
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
