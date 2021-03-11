import React, { useContext } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function SearchResult() {
  const {
    isFetching,
    searchCards,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;

  // ParaComidas:

  if (path === '/comidas') {
    if (!isFetching && searchCards.length === 1) {
      return <Redirect to={ `/comidas/${searchCards[0].idMeal}` } />;
    }
    return (
      <div className="card-columns">
        <CardDeck>
          {!isFetching && searchCards.map((meal, index) => (
            <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
              <Card
                style={ { width: '18rem' } }
                data-testid={ `${index}-recipe-card` }
              >
                <Card.Img
                  variant="top"
                  src={ `${meal.strMealThumb}` }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { `${meal.strMeal}` }
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </CardDeck>
      </div>
    );
  }

  // Para Bebidas:

  if (path === '/bebidas') {
    if (!isFetching && searchCards.length === 1) {
      return <Redirect to={ `/bebidas/${searchCards[0].idDrink}` } />;
    }
    return (
      <div className="card-columns">
        <CardDeck>
          {!isFetching && searchCards.map((drink, index) => (
            <Link key={ drink.idDrink } to={ `/comidas/${drink.idDrink}` }>
              <Card
                style={ { width: '18rem' } }
                data-testid={ `${index}-recipe-card` }
              >
                <Card.Img
                  variant="top"
                  src={ `${drink.strDrinkThumb}` }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { `${drink.strDrink}` }
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </CardDeck>
      </div>
    );
  }
}

export default SearchResult;
