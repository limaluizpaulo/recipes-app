import React, { useContext, useEffect, useState } from "react";

import { Card, Carousel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import RecipesContext from "../context/RecipesContext";
import ShareButton from "../components/DetailsComponents/ShareButton";
import FavButton from "../components/DetailsComponents/FavButton";
import StartButton from "../components/DetailsComponents/StartButton";
import "../styles/Detalhes.css";

export default function FoodDetails() {
  const [recomendations, setRecomendations] = useState([]);

  const { recipe, setRecipe } = useContext(RecipesContext);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const path = history.location.pathname;
  const listIngredients = [];

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substr(path.length - cinco, path.length);
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then(response => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const getRecomendations = async () => {
    const endpoint =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    const { drinks } = await fetch(endpoint).then(response => response.json());
    const sixCards = drinks.slice(zero, seis);
    setRecomendations(sixCards);
  };

  const ingredientsList = () => {
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (
        recipe[`strIngredient${i}`] !== null &&
        recipe[`strIngredient${i}`] !== ""
      ) {
        listIngredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return true;
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  useEffect(() => {
    const dataFav = JSON.parse(localStorage.getItem("favoriteRecipes"));
    if (!dataFav) {
      localStorage.setItem("favoriteRecipes", JSON.stringify([]));
    }

    const dataDone = JSON.parse(localStorage.getItem("doneRecipes"));
    if (!dataDone) {
      localStorage.setItem("doneRecipes", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="detalhes-container">
      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={recipe.strMealThumb}
      />
      <header>
        <div className="detalhes-titles">
          <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
        </div>
        <div className="fav-share-btns">
          <ShareButton />
          <FavButton />
        </div>
      </header>

      <section>
        <h4>Ingredients</h4>
        {ingredientsList()}
        <ul>
          {listIngredients.map((ingredients, key) => (
            <li key={key} data-testid={`${key}-ingredient-name-and-measure`}>
              {ingredients}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Instructions</h4>
        <span data-testid="instructions">
          {recipe.strInstructions}
        </span>
      </section>

      <section>
        <h4>Video</h4>
        <iframe
          data-testid="video"
          className="width360"
          title="video"
          src={
            recipe.strYoutube && recipe.strYoutube.replace("watch?v=", "embed/")
          }
          frameBorder="0"
          allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>

      <section>
        <h4>Recomended</h4>
        <Carousel>
          {recomendations.map((item, key) => (
            <Carousel.Item key={key}>
              <Link to={`/comidas/${item.idDrink}`}>
                  <img
                    className="d-block w-100"
                    data-testid={`${key}-recomendation-card`}
                    src={item.strDrinkThumb}
                    alt={item.strDrink}
                  />
                  <Carousel.Caption>
                    <h5>{item.strAlcoholic}</h5>
                    <h5 data-testid={`${key}-recomendation-title`}>
                      {item.strDrink}
                    </h5>
                  </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <StartButton />
    </div>
  );
}
