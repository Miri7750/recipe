import React, { useState } from 'react';
import { Recipe, emptyRecipe } from '../types/recipeType';

type RecipeFormProps = {
    onAddRecipe: (newRecipe: Recipe) => void;
};

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
    const [recipe, setRecipe] = useState<Recipe>(emptyRecipe);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddRecipe(recipe);
        setRecipe(emptyRecipe); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>הוסף מתכון חדש</h2>
            <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                placeholder="כותרת"
                required
            />
            <textarea
                name="description"
                value={recipe.description}
                onChange={handleChange}
                placeholder="תיאור"
                required
            />
            <textarea
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                placeholder="הוראות"
                required
            />
            <button type="submit">הוסף מתכון</button>
        </form>
    );
};

export default RecipeForm;
