// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import { Button, Card, CardDeck } from 'react-bootstrap';
// import ShareButton from '../components/DetailsComponents/ShareButton';
// import FavButton from '../components/DetailsComponents/FavButton';
// import { Link } from 'react-router-dom';

// function ReceitasFeitas(props) {
//   const [data, setData] = useState([]);
//   const [shared, setShared] = useState(false);
//   const { history } = props;

//   const getData = () => {
//     const response = JSON.parse(localStorage.getItem('doneRecipes'));
//     if (response) {
//       setData(response);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const filterDrink = () => {
//     const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
//     const response = doneRecipes.filter((value) => value.type === 'bebida');
//     console.log(doneRecipes[0]);
//     setData(response);
//   };

//   const filterFood = () => {
//     const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
//     const response = doneRecipes.filter((value) => value.type === 'comida');
//     console.log(doneRecipes[0]);
//     setData(response);
//   };

//   return (
//     <div className="main-container">
//       <Header />
//       <div className="categories-btns">
//         <Button
//           type="button"
//           data-testid="filter-by-all-btn"
//           onClick={getData}
//           variant="outline-dark"
//           size="sm"
//         >
//           All
//         </Button>

//         <Button
//           type="button"
//           data-testid="filter-by-food-btn"
//           onClick={filterFood}
//           variant="outline-dark"
//           size="sm"
//         >
//           Meals
//         </Button>

//         <Button
//           type="button"
//           data-testid="filter-by-drink-btn"
//           onClick={filterDrink}
//           variant="outline-dark"
//           size="sm"
//         >
//           Cocktails
//         </Button>
//       </div>

//       <CardDeck>
//         {data.map((value, index) => (
//           <div className="cards-container" key={value.id}>
//             <Card>
//               <Link to={`/${value.type}s/${value.id}`}>
//                 <Card.Img
//                   variant="top"
//                   src={value.image}
//                   data-testid={`${index}-horizontal-image`}
//                   alt="Receita Feita"
//                 />
//               </Link>

//               <Card.Body id="fav-card-body">
//                 <Card.Text data-testid={`${index}-horizontal-name`}>
//                   {value.name}
//                 </Card.Text>
//                 <Card.Text data-testid={`${index}-horizontal-top-text`}>
//                   {value.type === "comida"
//                     ? `${value.area} - ${value.category}`
//                     : value.alcoholicOrNot}
//                 </Card.Text>
//                 <div id="fav-share-btns">
//                   <ShareButton />
//                   <FavButton />
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </CardDeck>
//     </div>
//   );
// }

// export default ReceitasFeitas;
