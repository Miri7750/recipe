import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Recipe } from '../types/recipeType';
//import { Recipe } from "../types/recipeType";
const url = 'http://localhost:3000/api/recipes'
// Define an async thunk for fetching recipes from the server
export const fetchRecipes = createAsyncThunk<Recipe[], void>(
    'recipes/fetchRecipes',
    async (_, thunkAPI: { rejectWithValue: (arg0: string) => any; }) => {
        try {
            const response = await axios.get( url); // Replace with your API endpoint
            return response.data; // Assuming the server returns an array of recipes
        } catch (error: any) {
            // Handle known errors
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    if (error.response.status === 401) {
                        return thunkAPI.rejectWithValue('Unauthorized access - please log in.');
                    }
                    return thunkAPI.rejectWithValue(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    return thunkAPI.rejectWithValue('No response received from server.');
                }
            }
            return thunkAPI.rejectWithValue('An unexpected error occurred.');
        }
    }
);
// export const createRecipe = createAsyncThunk<Recipe, Recipe>(
//     'recipes/createRecipe',
//     async (newRecipe, thunkAPI) => {
//         try {
//             const response = await axios.post( url, newRecipe);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue('Error creating recipe');
//         }
//     }
// );

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            const response = await axios.post(url, 
            {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions
            },{
                headers: {
                    "user-id": "" + recipe.authorId
                }
            }
            )
            return response.data.recipe
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

// Create the slice
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as Recipe[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Use the error message from the rejected action
            })
           
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.recipes.push(action.payload);
            });
    

    },
});

// Export the actions and reducer
export default recipesSlice.reducer;
