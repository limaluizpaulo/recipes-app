import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import RecipesContext from '../../context/RecipesContext';
import SearchExecButton from './SearchExecButton';
import SearchResult from './SearchResult';

function SearchBar() {
  const {
    setOptionSearch,
    setInputSearch,
  } = useContext(RecipesContext);

  return (
    <div>
      <Form className="search-bar-form">
        <Form.Group controlId="inputSearch">
          <Form.Control
            type="text"
            data-testid="search-input"
            placeholder="Buscar Receita"
            name="search"
            onChange={ (e) => setInputSearch(e.target.value) }
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <div key="inline-radio" className="mb-3">
            <Form.Check
              inline
              name="radio"
              label="Ingrediente"
              data-testid="ingredient-search-radio"
              type="radio"
              id="inline-radio-ingrediente"
              value="ingredient"
              onChange={ (e) => setOptionSearch(e.target.value) }
            />
            <Form.Check
              inline
              name="radio"
              label="Nome"
              data-testid="name-search-radio"
              type="radio"
              id="inline-radio-nome"
              value="name"
              onChange={ (e) => setOptionSearch(e.target.value) }
            />
            <Form.Check
              inline
              name="radio"
              label="Primeira letra"
              data-testid="first-letter-search-radio"
              type="radio"
              id="inline-radio-primeira-letra"
              value="letter"
              onChange={ (e) => setOptionSearch(e.target.value) }
            />
          </div>
        </Form.Group>
        <SearchExecButton />
      </Form>
      <SearchResult />
    </div>
  );
}

export default SearchBar;
