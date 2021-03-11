export const fetchSearchMealIngredient = async (inputSearch) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchSearchMealName = async (inputSearch) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchSearchMealLetter = async (inputSearch) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch[0]}`;
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchSearchDrinkIngredient = async (inputSearch) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};
export const fetchSearchDrinkName = async (inputSearch) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};
export const fetchSearchDrinkLetter = async (inputSearch) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch[0]}`;
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

export const fetchMealSurprise = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchDrinkSurprise = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

export const fetchMealsIngredients = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchDrinksIngredients = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await fetch(endpoint).then((response) => response.json());
  return drinks;
};

export const fetchExploreByArea = async (area) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};
export const fetchAreas = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};

export const fetchMeals = async () => {
  const endpoint = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await fetch(endpoint).then((response) => response.json());
  return meals;
};
