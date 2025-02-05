// import React from 'react';
// import { Recipe } from '../types/recipeType';

// type RecipeListProps = {
//     recipes: Recipe[];
// };

// const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
//     return (
//         <div>
//             <h2>רשימת המתכונים</h2>
//             <ul>
//                 {recipes.map(recipe => (
//                     <li key={recipe.id}>
//                         <h3>{recipe.title}</h3>
//                         <p>{recipe.description}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default RecipeList;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/recipesSlice'; // ודא שהייבוא נכון
import { StoreType, RecipeDispatch } from '../store/store'; // ודא שהייבוא נכון
import { Recipe } from '../types/recipeType';

const RecipeList: React.FC = () => {
    const { recipes, loading, error } = useSelector((store: StoreType) => store.recipes);
    const dispatch = useDispatch<RecipeDispatch>();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    // return (
    //     <div>
    //         <h2>רשימת המתכונים</h2>
    //         <ul>
    //             {recipesList.map(recipe => (
    //                 <li key={recipe.id}>
    //                     <h3>{recipe.title}</h3>
    //                     <p>{recipe.description}</p>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
    return (
        <div>
            <h2>רשימת המתכונים</h2>
            {loading && <p>טוען מתכונים...</p>}
            {error && <p>שגיאה: {error}</p>}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default RecipeList;
