import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkSurpriseButton from '../components/ExplorarComponents/DrinkSurpriseButton';
import DrinkIngredientsButton
  from '../components/ExplorarComponents/DrinkIngredientsButton';
import '../styles/Explorar.css';

function ExplorarBebidas() {
  return (
    <div className="explorar-container">
      <Header />
      <div className="explorar-group-btn">
        <DrinkIngredientsButton />
        <DrinkSurpriseButton />
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
