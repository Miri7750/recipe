import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Recipe } from '../types/recipeType';
const url = 'http://localhost:3000/api/recipes'
export const fetchRecipes = createAsyncThunk<Recipe[], void>(
    'recipes/fetchRecipes',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get( url); 
            return response.data; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        return thunkAPI.rejectWithValue('Unauthorized access - please log in.');
                    }
                    return thunkAPI.rejectWithValue(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    return thunkAPI.rejectWithValue('No response received from server.');
                }
            }
            return thunkAPI.rejectWithValue('An unexpected error occurred.');
        }
    }
);

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
                state.error = action.payload as string; 
            })
           
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.recipes = [...state.recipes, {...action.payload}]
            });
    

    },
});

export default recipesSlice.reducer;
