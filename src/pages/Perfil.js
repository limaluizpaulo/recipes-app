import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const emailStorage = userStorage && userStorage.email;

  const history = useHistory();

  const handleDone = () => {
    history.push('/receitas-feitas');
  };

  const handleFav = () => {
    history.push('/receitas-favoritas');
  };

  const handleExit = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{ emailStorage }</h3>

      <Button
        type="button"
        data-testid="profile-done-btn"
        variant="secondary"
        onClick={ handleDone }
      >
        Receitas Feitas
      </Button>

      <Button
        type="button"
        data-testid="profile-favorite-btn"
        variant="secondary"
        onClick={ handleFav }
      >
        Receitas Favoritas
      </Button>

      <Button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleExit }
        variant="secondary"
      >
        Sair
      </Button>

      <Footer />
    </div>

  );
}

export default Perfil;
