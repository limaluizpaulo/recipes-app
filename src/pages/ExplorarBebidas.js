import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkSurpriseButton from '../components/ExplorarComponents/DrinkSurpriseButton';
import DrinkIngredientsButton
  from '../components/ExplorarComponents/DrinkIngredientsButton';

function ExplorarBebidas() {
  return (
    <div>
      <Header />
      <DrinkIngredientsButton />
      <DrinkSurpriseButton />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
