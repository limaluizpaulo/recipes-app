import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchComponents/SearchBar';
import SearchIconButton from './SearchComponents/SearchIconButton';

function Header() {
  const {
    setTitle,
    title,
    searching,
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleProfile = () => {
    history.push('/perfil');
  };

  const { pathname } = history.location;

  useEffect(() => {
    switch (pathname) {
    case '/':
      return setTitle('Login');
    case '/comidas':
      return setTitle('Meals');
    case '/bebidas':
      return setTitle('Cocktails');
    case '/explorar':
      return setTitle('Explore');
    case '/explorar/comidas':
      return setTitle('Explore Meals');
    case '/explorar/bebidas':
      return setTitle('Explore Cocktails');
    case '/explorar/comidas/ingredientes':
      return setTitle('Explore Ingredients');
    case '/explorar/bebidas/ingredientes':
      return setTitle('Explore Ingredients');
    case '/explorar/comidas/area':
      return setTitle('Explore Area');
    case '/perfil':
      return setTitle('Profile');
    case '/receitas-feitas':
      return setTitle('Done Recipes');
    case '/receitas-favoritas':
      return setTitle('Favorite Recipes');
    default:
      return setTitle('');
    }
  }, [pathname, setTitle]);

  if (title === 'Meals'
    || title === 'Cocktails'
    || title === 'Explore Area') {
    return (
      <div className="header-container">
        <header>
          <div
            role="button"
            tabIndex={ 0 }
            onKeyPress={ () => {} }
            onClick={ handleProfile }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-icon"
              className="svg-icon"
            />
          </div>
          <h3 data-testid="page-title">{ title }</h3>
          <SearchIconButton />
        </header>
        { searching && <SearchBar /> }
      </div>
    );
  }

  return (
    <header>
      <div
        role="button"
        tabIndex={ 0 }
        onKeyPress={ () => {} }
        onClick={ handleProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
          className="svg-icon"
        />
      </div>
      <h3 data-testid="page-title">{ title }</h3>
    </header>
  );
}

export default Header;
