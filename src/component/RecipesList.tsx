// // // import React from 'react';
// // // import { Recipe } from '../types/recipeType';

// // // type RecipeListProps = {
// // //     recipes: Recipe[];
// // // };

// // // const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
// // //     return (
// // //         <div>
// // //             <h2>רשימת המתכונים</h2>
// // //             <ul>
// // //                 {recipes.map(recipe => (
// // //                     <li key={recipe.id}>
// // //                         <h3>{recipe.title}</h3>
// // //                         <p>{recipe.description}</p>
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //         </div>
// // //     );
// // // };

// // // export default RecipeList;

// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { fetchRecipes } from '../store/recipesSlice';
// // import { StoreType, RecipeDispatch } from '../store/store';
// // import { Recipe } from '../types/recipeType';
// // import { Box, Card, List, ListItem, ListItemText, Typography } from '@mui/material';
// // import { Link } from 'react-router';

// // const RecipeList: React.FC = () => {
// //     const { recipes, loading, error } = useSelector((store: StoreType) => store.recipes);
// //     const dispatch = useDispatch<RecipeDispatch>();

// //     useEffect(() => {
// //         dispatch(fetchRecipes());
// //     }, [dispatch]);
// //     const linkStyle:React.CSSProperties = {
// //         display: 'inline-block',
// //         padding: '10px 20px',
// //         backgroundColor: 'transparent',
// //         color: 'black',
// //         textAlign: 'center',
// //         textDecoration: 'none',
// //         borderRadius: '5px',
// //         border: 'none',
// //         cursor: 'pointer',
// //         transition: 'background-color 0.3s',
// //         maxWidth: '100%'
// //     }
// //     function handleRecipeClick(recipe: Recipe) {
// //         throw new Error('Function not implemented.');
// //     }

// //     return (
// //         <Box display="flex">
// //         <Box flex={1} p={2}>
// //             <List>
// //                 {recipes.map(recipe => (
// //                     <ListItem button key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
// //                         <ListItemText primary={recipe.title} />
// //                     </ListItem>
// //                 ))}
// //             </List>
// //         </Box>
// //         <Box flex={1} p={2}>
// //             {selectedRecipe ? (
// //                 <Box>
// //                     <h2>{selectedRecipe.title}</h2>
// //                     <p>{selectedRecipe.details}</p>
// //                 </Box>
// //             ) : (
// //                 <p>Select a recipe to see the details</p>
// //             )}
// //         </Box>
// //     </Box>
// // <div>
// //     <h2>רשימת המתכונים</h2>
// //     {loading && <p>טוען מתכונים...</p>}
// //     {error && <p>שגיאה: {error}</p>}
// //     <ul>
// //         {recipes.map(recipe => (
// //             <Link to={`${recipe.id}`} style={linkStyle} key={recipe.id}>{recipe.title}</Link>
// //             // <Card >
// //             //      <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
// //             //      <Typography variant="body1" >{recipe.description}</Typography>
// //             // </Card>
// //         ))}
// //     </ul>
// // </div>
// //     );

// // };
// // export default RecipeList;
// // src/components/RecipesList.tsx

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { StoreType } from '../store/store';
// import { Box, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { fetchRecipes } from '../store/recipesSlice';


// const RecipesList: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { recipes, loading, error } = useSelector((store: StoreType) => store.recipes);

//     useEffect(() => {
//         dispatch(fetchRecipes());
//     }, [dispatch]);

//     const handleRecipeClick = (id: number) => {
//         navigate(`/recipes/${id}`); // ניווט לדף המתכון
//     };

//     if (loading) return <CircularProgress />;
//     if (error) return <Typography variant="h6" color="error">{error}</Typography>;

//     return (
//         <Box display="flex">
//             <Box flex={1} p={2}>
//                 <List>
//                     {recipes.map(recipe => (
//                         <ListItem key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
//                             <ListItemText primary={recipe.title} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Box>
//             <Box flex={1} p={2}>
//                 <Typography variant="h6">בחר מתכון כדי לראות את הפרטים</Typography>
//             </Box>
//         </Box>
//     );
// };

// export default RecipesList;
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeDispatch, StoreType } from '../store/store';
import { Box, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { fetchRecipes } from '../store/recipesSlice';
import { Recipe } from '../types/recipeType'; // ודא שהייבוא נכון
import { IsLogin } from '../App';
import AddRecipe from './AddRecipe';

const RecipesList: React.FC = () => {
    const dispatch = useDispatch<RecipeDispatch>(); // הסר את ה-<> כאן
    const { recipes, loading, error } = useSelector<StoreType, { recipes: Recipe[], loading: boolean, error: string | null }>((store) => store.recipes); // הגדרת סוגים
 const isLogin=useContext(IsLogin)
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <Box display="flex"> 
         <Box flex={1} p={2}>
                <Typography variant="h6">בחר מתכון כדי לראות את הפרטים</Typography>
            </Box>
            {isLogin && <AddRecipe />}
            <Box flex={1} p={2}>
                <List>
                    {recipes.length === 0 ? (
                        <Typography>No recipes available</Typography>
                    ) : (
                        recipes.map((recipe: Recipe) => ( // הגדרת סוג עבור recipe
                            <ListItem key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItemText primary={recipe.title} />
                                </Link>
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
          <Outlet/>
        </Box>
    );
};

export default RecipesList;
