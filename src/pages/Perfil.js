import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Perfil.css';

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
    <div className="perfil-container">
      <Header />
      <div className="perfil-content">
        <h3 data-testid="profile-email">{ emailStorage }</h3>
        <div className="perfil-group-btn">
          <Button
            type="button"
            data-testid="profile-done-btn"
            variant="outline-dark"
            onClick={ handleDone }
            size="lg"
          >
            Done Recipes
          </Button>

          <Button
            type="button"
            data-testid="profile-favorite-btn"
            variant="outline-dark"
            onClick={ handleFav }
            size="lg"
          >
            Favorite Recipes
          </Button>

          <Button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleExit }
            variant="outline-dark"
            size="lg"
          >
            Logout
          </Button>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Perfil;
