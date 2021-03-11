import { Button, Form } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';

export default function InProgressDrink() {
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
  const quinze = 15;
  const vinteSete = 27;

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.length === vinteSete ? path.substring(nove, quinze)
        : path.substring(nove, catorze);
      console.log(id);
      const endpoint = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipe(drinks[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const listIngredients = [];
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
    const dataProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (dataProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...dataProgress }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, []);

  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const handleCheckbox = ({ target }) => {
    const id = recipe.idDrink;
    const keys = data.cocktails;
    const { name, checked } = target;
    if (checked) {
      setUsedIngr([...usedIngr, name]);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...data,
        cocktails: {
          ...keys,
          [id]: [...usedIngr, name],
        },
      }));
    } else {
      setUsedIngr(usedIngr.filter((item) => item !== name));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...data,
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
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
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
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
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
      { ingredientsList() }
      <div className="progress-ingredients">
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
