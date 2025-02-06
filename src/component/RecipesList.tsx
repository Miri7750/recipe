
import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeDispatch, StoreType } from '../store/store';
import { Box, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { fetchRecipes } from '../store/recipesSlice';
import { Recipe } from '../types/recipeType'; 

const RecipesList: React.FC = () => {
    const dispatch = useDispatch<RecipeDispatch>(); 
    const { recipes, loading, error } = useSelector<StoreType, { recipes: Recipe[], loading: boolean, error: string | null }>((store) => store.recipes);
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
            <Box flex={1} p={2}>
                <List>
                    {recipes.length === 0 ? (
                        <Typography>No recipes available</Typography>
                    ) : (
                        recipes.map((recipe: Recipe) => ( 
                            <ListItem key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItemText primary={recipe.title} />
                                </Link>
                            </ListItem>
                        ))
                    )}
                </List>
            {/* {isLogin&&<AddRecipe />} */}
            </Box>
            
          <Outlet/>
        </Box>
    );
};

export default RecipesList;
