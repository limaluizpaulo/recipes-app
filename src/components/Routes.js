import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import Explorar from '../pages/Explorar';
import InProgressFood from '../pages/InProgressFood';
import InProgressDrink from '../pages/InProgressDrink';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import ComidasIngrediente from '../pages/ComidasIngrediente';
import BebidasIngrediente from '../pages/BebidasIngrediente';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarComidas from '../pages/ExplorarComidas';
import ComidasLocal from '../pages/ComidasLocal';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import Perfil from '../pages/Perfil';
import NotFound from '../pages/BebidasLocalNotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas/:id/in-progress" component={ InProgressFood } />
      <Route exact path="/bebidas/:id/in-progress" component={ InProgressDrink } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ComidasIngrediente }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ BebidasIngrediente }
      />
      <Route exact path="/explorar/comidas/area" component={ ComidasLocal } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/explorar/bebidas/area" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
