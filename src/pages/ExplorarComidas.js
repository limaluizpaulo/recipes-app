import React from 'react';
import MealIngredientsButton from
  '../components/ExplorarComponents/MealIngredientsButton';
import MealOriginButton from '../components/ExplorarComponents/MealOriginButton';
import MealSurpriseButton from '../components/ExplorarComponents/MealSurpriseButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';

export default function ExplorarComidas() {
  return (
    <div className="explorar-container">
      <Header />
      <div className="explorar-group-btn">
        <MealIngredientsButton />
        <MealOriginButton />
        <MealSurpriseButton />
      </div>
      <Footer />
    </div>
  );
}
