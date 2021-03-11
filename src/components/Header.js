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
      return setTitle('Comidas');
    case '/bebidas':
      return setTitle('Bebidas');
    case '/explorar':
      return setTitle('Explorar');
    case '/explorar/comidas':
      return setTitle('Explorar Comidas');
    case '/explorar/bebidas':
      return setTitle('Explorar Bebidas');
    case '/explorar/comidas/ingredientes':
      return setTitle('Explorar Ingredientes');
    case '/explorar/bebidas/ingredientes':
      return setTitle('Explorar Ingredientes');
    case '/explorar/comidas/area':
      return setTitle('Explorar Origem');
    case '/perfil':
      return setTitle('Perfil');
    case '/receitas-feitas':
      return setTitle('Receitas Feitas');
    case '/receitas-favoritas':
      return setTitle('Receitas Favoritas');
    default:
      return setTitle('');
    }
  }, [pathname, setTitle]);

  if (title === 'Comidas'
    || title === 'Bebidas'
    || title === 'Explorar Origem') {
    return (
      <div>
        <header>
          <div
            className="icon"
            role="button"
            tabIndex={ 0 }
            onKeyPress={ () => {} }
            onClick={ handleProfile }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-icon"
            />
          </div>
          <h2 data-testid="page-title">{ title }</h2>
          <SearchIconButton />
        </header>
        { searching && <SearchBar /> }
      </div>
    );
  }

  return (
    <header>
      <div
        className="icon"
        role="button"
        tabIndex={ 0 }
        onKeyPress={ () => {} }
        onClick={ handleProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
        />
      </div>
      <h2 data-testid="page-title">{ title }</h2>
    </header>
  );
}

export default Header;
