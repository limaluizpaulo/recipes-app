import React from 'react';
import MealIngredientsButton from
  '../components/ExplorarComponents/MealIngredientsButton';
import MealOriginButton from '../components/ExplorarComponents/MealOriginButton';
import MealSurpriseButton from '../components/ExplorarComponents/MealSurpriseButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas() {
  return (
    <div>
      <Header />
      <MealIngredientsButton />
      <MealOriginButton />
      <MealSurpriseButton />
      <Footer />
    </div>
  );
}
