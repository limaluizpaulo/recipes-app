import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import RecipesContext from '../../context/RecipesContext';
import SearchExecButton from './SearchExecButton';
import SearchResult from './SearchResult';
import '../../styles/Search.css';

function SearchBar() {
  const {
    setOptionSearch,
    setInputSearch,
  } = useContext(RecipesContext);

  return (
    <div className="searchbar-container">
      <Form>
        <Form.Group controlId="inputSearch">
          <Form.Control
            type="text"
            data-testid="search-input"
            placeholder="Search Recipe"
            name="search"
            onChange={ (e) => setInputSearch(e.target.value) }
            size="sm"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <div key="inline-radio" className="mb-3">
            <Form.Check
              inline
              name="radio"
              label="Ingredient"
              data-testid="ingredient-search-radio"
              type="radio"
              id="inline-radio-ingrediente"
              value="ingredient"
              onChange={ (e) => setOptionSearch(e.target.value) }
            />
            <Form.Check
              inline
              name="radio"
              label="Name"
              data-testid="name-search-radio"
              type="radio"
              id="inline-radio-nome"
              value="name"
              onChange={ (e) => setOptionSearch(e.target.value) }
            />
            <Form.Check
              inline
              name="radio"
              label="First Letter"
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
