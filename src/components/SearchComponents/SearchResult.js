import React, { useContext } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import RecipesContext from "../../context/RecipesContext";
import "../../styles/Search.css";

function SearchResult() {
  const { isFetching, searchCards } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;

  // ParaComidas:

  if (path === "/comidas") {
    if (!isFetching && searchCards.length === 1) {
      return <Redirect to={`/comidas/${searchCards[0].idMeal}`} />;
    }
    return (
      <CardDeck>
        {!isFetching &&
          searchCards.map((meal, index) => (
            <div className="cards-container" key={meal.idMeal}>
              <Link to={`/comidas/${meal.idMeal}`}>
                <Card data-testid={`${index}-recipe-card`}>
                  <Card.Img
                    variant="top"
                    src={`${meal.strMealThumb}`}
                    data-testid={`${index}-card-img`}
                  />
                  <Card.Body>
                    <Card.Text data-testid={`${index}-card-name`}>
                      {`${meal.strMeal}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
      </CardDeck>
    );
  }

  // Para Bebidas:

  if (path === "/bebidas") {
    if (!isFetching && searchCards.length === 1) {
      return <Redirect to={`/bebidas/${searchCards[0].idDrink}`} />;
    }
    return (
      <CardDeck>
        {!isFetching &&
          searchCards.map((drink, index) => (
            <div className="cards-container" key={drink.idDrink}>
              <Link to={`/comidas/${drink.idDrink}`}>
                <Card data-testid={`${index}-recipe-card`}>
                  <Card.Img
                    variant="top"
                    src={`${drink.strDrinkThumb}`}
                    data-testid={`${index}-card-img`}
                  />
                  <Card.Body>
                    <Card.Text data-testid={`${index}-card-name`}>
                      {`${drink.strDrink}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
      </CardDeck>
    );
  }
}

export default SearchResult;
