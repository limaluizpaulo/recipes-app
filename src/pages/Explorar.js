import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar() {
  const history = useHistory();

  const handleExploreFoods = () => {
    history.push('/explorar/comidas');
  };

  const handleExploreDrinks = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div>
      <Header />

      <Card
        data-testid="explore-food"
        onClick={ handleExploreFoods }
      >

        <Card.Title>Explorar Comidas</Card.Title>
      </Card>

      <Card
        data-testid="explore-drinks"
        onClick={ handleExploreDrinks }
      >
        <Card.Title>Explorar Bebidas</Card.Title>
      </Card>

      <Footer />
    </div>
  );
}
