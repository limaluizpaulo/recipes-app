import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipesContext from "../context/RecipesContext";
import { fetchDrinksIngredients } from "../services/api";

export default function BebibasIngrediente() {
  const [ingrCards, setIngrCards] = useState([]);

  const { isFetching, setIsFetching, setFilteredIngrCards } = useContext(
    RecipesContext
  );

  const history = useHistory();

  const zero = 0;
  const doze = 12;

  // Recebendo os cards de ingredientes

  const getDrinksIngredients = useCallback(async () => {
    const allCards = await fetchDrinksIngredients();
    const twelveCards = allCards.slice(zero, doze);
    setIngrCards(twelveCards);
    setIsFetching(false);
  }, [setIsFetching]);

  useEffect(() => {
    getDrinksIngredients();
  }, [getDrinksIngredients]);

  // Setando os cards com o ingrediente selecionado no estado global

  const handleClick = async ({ target }) => {
    console.log(target.alt);
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${target.alt}`;
    const { drinks } = await fetch(endpoint).then(response => response.json());
    const twelveFilteredCards = drinks.slice(zero, doze);
    setFilteredIngrCards(twelveFilteredCards);
  };

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div className="explorar-container">
      <Header />
      <CardDeck>
        {ingrCards.map((drink, index) => (
          <div className="cards-container" key={index}>
            <Link to="/bebidas">
              <Card
                role="button"
                key={index}
                tabIndex={0}
                onKeyPress={() => {}}
                data-testid={`${index}-ingredient-card`}
                onClick={e => handleClick(e)}
              >
                <Card.Img
                  variant="top"
                  data-testid={`${index}-card-img`}
                  src={`https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}.png`}
                  alt={drink.strIngredient1}
                />
                <Card.Body>
                  <Card.Text data-testid={`${index}-card-name`}>
                    {drink.strIngredient1}
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
