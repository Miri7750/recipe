// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import * as yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import { Button, TextField } from '@mui/material';

// // const schema = yup.object().shape({
// //     title: yup.string().required('Title is required'),
// //     instructions: yup.string().required('Instructions are required'),
// // });

// // const AddRecipeForm: React.FC<{ onAddRecipe: (data: any) => void }> = ({ onAddRecipe }) => {
// //     const { register, handleSubmit, formState: { errors } } = useForm({
// //         resolver: yupResolver(schema),
// //     });

// //     const onSubmit = (data: any) => {
// //         onAddRecipe(data);
// //     };

// //     return (
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //             <TextField {...register('title')} label="Recipe Title" error={!!errors.title} helperText={errors.title?.message} />
// //             <TextField {...register('instructions')} label="Instructions" error={!!errors.instructions} helperText={errors.instructions?.message} />
// //             <Button type="submit">Add Recipe</Button>
// //         </form>
// //     );
// // };

// // export default AddRecipeForm;


// import { Box, Button, Modal, TextField, Typography } from "@mui/material";
// import { useContext, useState } from "react";
// //import { RecipeType } from "../types/recipeType";
// import { array, object, string } from "yup";
// import { useDispatch } from 'react-redux';
// import { addRecipe } from "../store/recipesSlice";
// import IngredientsInput from "./IngredientsInput";
// import { CurrentUser } from "./Header";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { RecipeDispatch } from "../store/store";
// import { Recipe } from "../types/recipeType";

// const AddNewRecipe = () => {
//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     const dispatch = useDispatch<RecipeDispatch>();
//     const user = useContext(CurrentUser);

//     const schema = object().shape({
//         title: string().required("Title is a required field").min(5),
//         description: string().required("Description is a required field").min(10).max(50),
//         ingredients:array().required(),
//         instructions: string().required("Instructions is a required field").max(50)
//     });

//     const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Recipe>({
//         resolver: yupResolver(schema)
//     });

//     const handleIngredientsChange = (newIngredients: string[]) => {
//         setValue("ingredients", newIngredients);
//     };

//     const onSubmit: SubmitHandler<RecipeType> = (recipe) => {
//         console.log(recipe);
        
//         setValue("authorId", Number(user.user.id))
//         dispatch(addRecipe(recipe));
//         handleClose();
//         reset();
//     };

//     const [open, setOpen] = useState(false);
//     const handleOpen = () => { setOpen(true); }
//     const handleClose = () => setOpen(false);

//     return (
//         <div>
//             <Button onClick={handleOpen} color="inherit">Add Recipe</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description">
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Enter a new recipe
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div>
//                                 <TextField 
//                                     id="title" 
//                                     label="Title" 
//                                     variant="standard" 
//                                     {...register("title")} 
//                                     error={!!errors.title} 
//                                     helperText={errors.title?.message} 
//                                 />
//                             </div>
//                             <div>
//                                 <TextField 
//                                     id="description" 
//                                     label="Description" 
//                                     variant="standard" 
//                                     {...register("description")} 
//                                     error={!!errors.description} 
//                                     helperText={errors.description?.message} 
//                                 />
//                             </div>
//                             <IngredientsInput onIngredientsChange={handleIngredientsChange} />
//                             <div>
//                                 <TextField 
//                                     id="instructions" 
//                                     label="Instructions" 
//                                     variant="standard" 
//                                     {...register("instructions")} 
//                                     error={!!errors.instructions} 
//                                     helperText={errors.instructions?.message} 
//                                 />
//                             </div>
//                             <div><Button type='submit'>Add</Button></div>
//                         </form>
//                     </Typography>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default AddNewRecipe;

import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, array } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { RecipeDispatch } from "../store/store";
import { addRecipe  } from "../store/recipesSlice";
import { Recipe } from "../types/recipeType";
import { useContext, useState } from "react";
import IngredientInput from './IngredientInput.tsx'; 
import { User } from "../App";
import { style } from "../types/styleModle";


const AddRecipe = () => {
    const user = useContext(User);
    const dispatch = useDispatch<RecipeDispatch>();
    
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false); }
    const handleOpen = () => { setOpen(true); }

    const schema = object().shape({
        title: string().required("Title is a required field").min(5),
        description: string().required("Description is a required field").min(10).max(50),
        ingredients:array().required(),
        instructions: string().required("Instructions is a required field").max(50)
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Recipe>({
        resolver: yupResolver(schema)
    });

    // // const schema = object<Recipe>().shape({
    // //     title: string().required("Title is required").min(3, "Title must be at least 3 characters"),
    // //     description: string().required("Description is required").min(5, "Description must be at least 5 characters"),
    // //     ingredients: array().of(string().required("Ingredient is required")),
    // //     instructions: string().required("Instructions are required").min(5, "Instructions must be at least 5 characters"),
    // // });
    //   const schema = object<Recipe>().shape({
    //     title: string().required("Title is required").min(3, "Title must be at least 3 characters"),
    //     description: string().required("Description is required").min(5, "Description must be at least 5 characters"),
    //     ingredients: array()
    //         .of(string().required("Ingredient is required"))
    //         .min(1, "At least one ingredient is required")
    //         .test('first-item-length', 'The first ingredient must be at least 5 characters', 
    //             function (ingredients) {
    //                 return ingredients && ingredients[0] && ingredients[0].length >= 5 ? true : this.createError({ message: 'The first ingredient must be at least 5 characters' });
    //             }),
    //     instructions: string().required("Instructions are required").min(5, "Instructions must be at least 5 characters"),
    // });
    
    

    // const { register, handleSubmit, setValue, formState: { errors } } = useForm<Recipe>({
    //     resolver: yupResolver(schema)
    // });

    const onSubmit: SubmitHandler<Recipe> = (recipe) => {
        setValue("authorId",Number(user.user.id))

        dispatch(addRecipe(recipe));
        handleClose();
    };

    const handleIngredientsChange = (newIngredients: string[]) => {
        setValue("ingredients", newIngredients);
    };

    return (
        <>
            <Button onClick={handleOpen} color='inherit'>Add Recipe</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter details of recipe
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("title")}
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            {...register("description")}
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <IngredientInput onIngredientsChange={handleIngredientsChange} />
                        {errors.ingredients && <Typography color="error">{errors.ingredients.message}</Typography>}
                        <TextField
                            {...register("instructions")}
                            label="Instructions"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.instructions}
                            helperText={errors.instructions?.message}
                        />
                        <div><Button type="submit">Add</Button></div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default AddRecipe;