import { Button } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';

export default function Explorar() {
  const history = useHistory();

  const handleExploreFoods = () => {
    history.push('/explorar/comidas');
  };

  const handleExploreDrinks = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div className="explorar-container">
      <Header />
      <div className="explorar-group-btn">
        <Button
          data-testid="explore-food"
          onClick={ handleExploreFoods }
          type="button"
          variant="outline-dark"
          size="lg"
        >
          Explore Meals
        </Button>

        <Button
          data-testid="explore-drinks"
          onClick={ handleExploreDrinks }
          type="button"
          variant="outline-dark"
          size="lg"
        >
          Explore Cocktails
        </Button>
      </div>  
      <Footer />
    </div>
  );
}
