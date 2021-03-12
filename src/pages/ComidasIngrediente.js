import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredients } from '../services/api';

export default function ComidasIngrediente() {
  const [ingrCards, setIngrCards] = useState([]);

  const {
    isFetching,
    setIsFetching,
    setFilteredIngrCards,
  } = useContext(RecipesContext);

  const history = useHistory();

  const zero = 0;
  const doze = 12;

  // Recebendo os cards de ingredientes

  const getMealsIngredients = useCallback(async () => {
    const allCards = await fetchMealsIngredients();
    const twelveCards = allCards.slice(zero, doze);
    setIngrCards(twelveCards);
    setIsFetching(false);
  }, [setIsFetching]);

  useEffect(() => {
    getMealsIngredients();
  }, [getMealsIngredients]);

  // Setando os cards com o ingrediente selecionado no estado global

  const handleClick = async ({ target }) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${target.alt}`;
    const { meals } = await fetch(endpoint).then((response) => response.json());
    const twelveFilteredCards = meals.slice(zero, doze);
    setFilteredIngrCards(twelveFilteredCards);
  };

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div className="explorar-container">
      <Header />
      <CardDeck>
        {ingrCards.map((meal, index) => (
          <div className="cards-container" key={ index }>
            <Link to="/comidas">
              <Card
                role="button"
                tabIndex={ 0 }
                onKeyPress={ () => {} }
                data-testid={ `${index}-ingredient-card` }
                onClick={ (e) => handleClick(e) }
              >
                <Card.Img
                  variant="top"
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png` }
                  alt={ meal.strIngredient }
                />
                <Card.Body>
                  <Card.Text
                    data-testid={ `${index}-card-name` }
                  >
                    { meal.strIngredient }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </CardDeck>
      <Footer />
    </div>
  );
}
