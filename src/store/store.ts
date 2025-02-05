import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipesSlice";

const store = configureStore({
    reducer: {
        recipes: recipesSlice,
    }
   
});

export type StoreType = ReturnType<typeof store.getState>
export type RecipeDispatch=typeof store.dispatch
export default store