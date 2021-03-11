import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchAreas } from '../services/api';

export default function ComidasLocal() {
  const [areas, setAreas] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [ready, setReady] = useState(false);

  const {
    isFetching,
    setIsFetching,
  } = useContext(RecipesContext);

  const zero = 0;
  const doze = 12;

  // Recebendo as áreas

  useEffect(() => {
    const getAreas = async () => {
      const receivedAreas = await fetchAreas();
      const all = 'All';
      const allAreas = [...receivedAreas, { strArea: all }];
      setAreas(allAreas);
    };
    getAreas();
  }, []);

  // Recebendo os cards gerais

  useEffect(() => {
    const getCards = async () => {
      const endpoint = ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await fetch(endpoint).then((response) => response.json());
      const twelveCards = meals.slice(zero, doze);
      setCards(twelveCards);
    };
    getCards();
    setIsFetching(false);
  }, [setIsFetching]);

  console.log(areas);
  console.log(cards);
  console.log(isFetching);
  console.log(filteredCards);

  // Filtrando os cards pela área escolhida

  const handleSelect = async ({ target }) => {
    const all = 'All';
    if (target.value === all) {
      setFilteredCards(cards);
    } else {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      const twelveCards = meals.slice(zero, doze);
      setFilteredCards(twelveCards);
      setReady(true);
    }
  };

  if (isFetching) return <h5>Carregando...</h5>;
  if (!ready) {
    return (
      <div>
        <Header />
        <select
          data-testid="explore-by-area-dropdown"
          id="origem"
          onChange={ (e) => handleSelect(e) }
        >
          { areas.map((area, index) => (
            <option
              key={ index }
              value={ area.strArea }
              data-testid={ `${area.strArea}-option` }
              eventKey={ area.strArea }
            >
              { area.strArea }
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <Link key={ card.id } to={ `/comidas/${card.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ card.strMealThumb }
                alt="Thumb Comida"
              />
              <h1 data-testid={ `${index}-card-name` }>{card.strMeal}</h1>
            </div>
          </Link>))}

        <Footer />
      </div>
    );
  }

  if (ready) {
    return (
      <div>
        <Header />
        <select
          data-testid="explore-by-area-dropdown"
          id="origem"
          onChange={ (e) => handleSelect(e) }
        >
          { areas.map((local, index) => (
            <option
              key={ index }
              value={ local.strArea }
              data-testid={ `${local.strArea}-option` }
              eventKey={ local.strArea }
            >
              { local.strArea }
            </option>
          ))}
        </select>
        {filteredCards.map((newCard, index) => (
          <Link key={ newCard.id } to={ `/comidas/${newCard.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ newCard.strMealThumb }
                alt="Thumb Comida"
              />
              <h1 data-testid={ `${index}-card-name` }>{newCard.strMeal}</h1>
            </div>
          </Link>)) }
        <Footer />
      </div>
    );
  }
}
