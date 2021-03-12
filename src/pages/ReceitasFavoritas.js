import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShareButton from "../components/DetailsComponents/ShareButton";
import FavButton from "../components/DetailsComponents/FavButton";
import "../styles/Fav.css";

function ReceitasFavoritas() {
  const [data, setData] = useState([]);

  const getData = () => {
    const response = JSON.parse(localStorage.getItem("favoriteRecipes"));
    if (response) {
      setData(response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const removeItem = id => {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
    const response = favoriteRecipes.filter(value => value.id !== id);
    setData(response);
    localStorage.setItem("favoriteRecipes", JSON.stringify(response));
  };

  const filterDrink = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
    const response = favoriteRecipes.filter(value => value.type === "bebida");
    console.log(favoriteRecipes[0]);
    setData(response);
  };

  const filterFood = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
    const response = favoriteRecipes.filter(value => value.type === "comida");
    console.log(favoriteRecipes[0]);
    setData(response);
  };

  return (
    <div className="main-container">
      <Header />
      <div className="categories-btns">
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={getData}
          variant="outline-dark"
          size="sm"
        >
          All
        </Button>

        <Button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={filterFood}
          variant="outline-dark"
          size="sm"
        >
          Meals
        </Button>

        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={filterDrink}
          variant="outline-dark"
          size="sm"
        >
          Cocktails
        </Button>
      </div>

      <CardDeck>
        {data.map((value, index) => (
          <div className="cards-container" key={value.id}>
            <Card>
              <Link to={`/${value.type}s/${value.id}`}>
                <Card.Img
                  variant="top"
                  src={value.image}
                  data-testid={`${index}-horizontal-image`}
                  alt="Receita Favorita"
                />
              </Link>

              <Card.Body id="fav-card-body">
                <Card.Text data-testid={`${index}-horizontal-name`}>
                  {value.name}
                </Card.Text>
                <Card.Text data-testid={`${index}-horizontal-top-text`}>
                  {value.type === "comida"
                    ? `${value.area} - ${value.category}`
                    : value.alcoholicOrNot}
                </Card.Text>
                <div id="fav-share-btns">
                  <ShareButton />
                  <FavButton />
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardDeck>
    </div>
  );
}

export default ReceitasFavoritas;
