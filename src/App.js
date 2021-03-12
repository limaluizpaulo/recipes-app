import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Routes from './components/Routes';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Provider>
          <Routes />
        </Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
