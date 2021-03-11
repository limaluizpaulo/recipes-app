import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './components/Routes';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
