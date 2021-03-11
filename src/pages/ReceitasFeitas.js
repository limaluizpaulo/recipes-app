import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFavoritas(props) {
  const [data, setData] = useState([]);
  const [shared, setShared] = useState(false);
  const { history } = props;

  const getData = () => {
    const response = JSON.parse(localStorage.getItem('doneRecipes'));
    if (response) {
      setData(response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const copyLink = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShared(true);
  };

  const filterDrink = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const response = doneRecipes.filter((value) => value.type === 'bebida');
    console.log(doneRecipes[0]);
    setData(response);
  };

  const filterFood = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const response = doneRecipes.filter((value) => value.type === 'comida');
    console.log(doneRecipes[0]);
    setData(response);
  };

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn" onClick={ getData }>
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn" onClick={ filterFood }>
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ filterDrink }>
        Drink
      </button>
      {data.map((value, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => history.push(`/${value.type}s/${value.id}`) }
          >
            <img
              style={ { width: '100%' } }
              src={ value.image }
              data-testid={ `${index}-horizontal-image` }
              alt="Receita Favorita"
            />
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {value.type === 'comida'
              ? `${value.area} - ${value.category}` : value.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{value.doneDate}</p>
          {value.tags.map((tag, key) => (
            <p
              key={ key }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>))}
          <button
            type="button"
            onClick={ () => history.push(`/${value.type}s/${value.id}`) }
          >
            <h1
              data-testid={ `${index}-horizontal-name` }

            >
              {value.name}
            </h1>
          </button>
          {shared ? 'Link copiado!' : ''}
          <button
            type="button"
            onClick={ () => copyLink(value.type, value.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Icon share"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

ReceitasFavoritas.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default ReceitasFavoritas;
