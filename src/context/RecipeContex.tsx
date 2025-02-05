import React, { createContext, useReducer, ReactNode } from 'react';

interface RecipeState {
    recipes: any[]; // Replace with a more specific type
}

const initialState: RecipeState = {
    recipes: [],
};

type Action = 
    | { type: 'SET_RECIPES'; payload: any[] };

const recipeReducer = (state: RecipeState, action: Action): RecipeState => {
    switch (action.type) {
        case 'SET_RECIPES':
            return { ...state, recipes: action.payload };
        default:
            return state;
    }
};

export const RecipeContext = createContext<{ state: RecipeState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(recipeReducer, initialState);
    return (
        <RecipeContext value={{ state, dispatch }}>
            {children}
        </RecipeContext>
    );
};
