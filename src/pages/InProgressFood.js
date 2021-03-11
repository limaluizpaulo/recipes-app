import { Button, Form } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';

export default function InProgressFood() {
  const [usedIngr, setUsedIngr] = useState([]);

  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const dois = 2;
  const nove = 9;
  const catorze = 14;
  const vinte = 20;

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substring(nove, catorze);
      const endpoint = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const listIngredients = [];
  const ingredientsList = () => {
    for (let i = 1; i <= vinte; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

  const id = recipe.idMeal;
  const dataProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (dataProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...dataProgress }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, [dataProgress]);

  const handleCheckbox = ({ target }) => {
    const { name, checked } = target;
    const keys = dataProgress.meals;
    if (checked) {
      if (!usedIngr) {
        setUsedIngr([name]);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...dataProgress,
          meals: {
            ...keys,
            [id]: [name],
          },
        }));
      } else {
        setUsedIngr([...usedIngr, name]);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...dataProgress,
          meals: {
            ...keys,
            [id]: [...usedIngr, name],
          },
        }));
      }
    } else {
      setUsedIngr(usedIngr.filter((item) => item !== name));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...dataProgress,
        meals: {
          ...keys,
          [id]: usedIngr.filter((item) => item !== name),
        },
      }));
    }
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(dois, '0');
    const month = (date.getMonth() + 1).toString().padStart(dois, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFinishRecipeBtn = () => {
    const dataDone = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes', JSON.stringify(dataDone && [...dataDone, {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: getDate(),
      tags: recipe.strTags.split(','),
    }]));
    history.push('/receitas-feitas');
  };

  const isDisabled = () => {
    if (usedIngr && usedIngr.length === listIngredients.length) return false;
    return true;
  };

  return (
    <div className="details-content">
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
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
      <div className="progress-ingredients">
        { ingredientsList() }

        <ul className="progress-ingr-list">
          {listIngredients.map((ingredient, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-step` }
            >
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label={ ingredient }
                name={ ingredient }
                onChange={ handleCheckbox }
              />
            </li>
          ))}
        </ul>
      </div>

      <h3>Instruções</h3>
      <span
        data-testid="instructions"
        className="details-instructions"
      >
        {recipe.strInstructions}
      </span>

      <Button
        variant="success"
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        onClick={ handleFinishRecipeBtn }
        disabled={ isDisabled() }
        block
      >
        Finalizar Receita
      </Button>

    </div>
  );
}
