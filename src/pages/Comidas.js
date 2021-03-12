import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchResult from '../components/SearchComponents/SearchResult';
import RecipesContext from '../context/RecipesContext';
import '../styles/Main.css';

export default function Comidas() {
  const [categories, setCategories] = useState([]);

  const {
    filteredIngrCards,
    cards,
    setCards,
    searchCards,
  } = useContext(RecipesContext);

  const getCards = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const arr = [...data.meals];
    const initialIndex = 0;
    const finalIndex = 12;
    const splicedCards = arr.splice(initialIndex, finalIndex);
    setCards(splicedCards);
  };

  const getCategories = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const arr = [...data.meals];
    const initialIndex = 0;
    const finalIndex = 5;
    const arrSpliced = arr.splice(initialIndex, finalIndex);
    setCategories(arrSpliced);
  }, [setCategories]);

  const filterByCategory = async ({ target }) => {
    if (target.id === 'unclicked') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const data = await response.json();
      const arr = [...data.meals];
      const initialIndex = 0;
      const finalIndex = 12;
      const filteredCards = arr.splice(initialIndex, finalIndex);
      setCards(filteredCards);
      target.id = 'clicked';
    } else {
      getCards();
      target.id = 'unclicked';
    }
  };

  useEffect(() => {
    getCategories();
    getCards();
  }, []);

  const zero = 0;
  if (searchCards > zero) {
    return (
      <div>
        <Header />
        <SearchResult />
        <Footer />
      </div>
    );
  }

  if (filteredIngrCards.length > zero) {
    return (
      <div className="main-container">
        <Header />
        <CardDeck>
          {filteredIngrCards.map((meal, index) => (
            <div className="cards-container" key={ index }>
              <Link
                to={ `/comidas/${meal.idMeal}` }
              >
                <Card
                  data-testid={ `${index}-recipe-card` }
                >
                  <Card.Img
                    variant="top"
                    src={ meal.strMealThumb }
                    data-testid={ `${index}-card-img` }
                  />
                  <Card.Body>
                    <Card.Text
                      data-testid={ `${index}-card-name` }
                    >
                      { meal.strMeal }
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

  return (
    <div className="main-container">
      <Header />
      <div className="categories-btns">
        <Button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getCards() }
          variant="outline-dark"
          size="sm"
        >
          All
        </Button>
        {categories.map(({ strCategory: category }) => (
          <Button
            type="button"
            key={ category }
            id="unclicked"
            data-testid={ `${category}-category-filter` }
            value={ category }
            onClick={ (event) => filterByCategory(event) }
            variant="outline-dark"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <CardDeck>
        {cards.map((card, index) => (
          <div className="cards-container" key={ index }>
            <Link
              to={ `/comidas/${card.idMeal}` }
            >
              <Card
                data-testid={ `${index}-recipe-card` }
              >
                <Card.Img
                  variant="top"
                  src={ card.strMealThumb }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Text
                    data-testid={ `${index}-card-name` }
                  >
                    { card.strMeal }
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
