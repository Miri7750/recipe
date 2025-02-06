
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, array } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { RecipeDispatch } from "../store/store";
import { addRecipe } from "../store/recipesSlice";
import { Recipe } from "../types/recipeType";
import { useContext, useState } from "react";
import IngredientInput from './IngredientInput';
import { style } from "../types/styleModle";
import { UsrReducer } from "./Header";

const AddRecipe = () => {
    const user = useContext(UsrReducer);
    const dispatch = useDispatch<RecipeDispatch>();
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false); }
    const handleOpen = () => { setOpen(true); }

    const schema = object<Recipe>().shape({
        title: string().required("Title is required").min(3, "Title must be at least 3 characters"),
        description: string().required("Description is required").min(5, "Description must be at least 5 characters"),
        ingredients: array()
            .of(string().required("Ingredient is required"))
            .min(1, "At least one ingredient is required"),
        instructions: string().required("Instructions are required").min(5, "Instructions must be at least 5 characters"),
    });

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Recipe>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Recipe> = (recipe) => {
        setValue("authorId", Number(user.user.id));
        dispatch(addRecipe(recipe));
        reset();
        handleClose();
    };

    const handleIngredientsChange = (newIngredients: string[]) => {
        setValue("ingredients", newIngredients);
    };

    return (<>
        <Button onClick={handleOpen} color='inherit' style={{
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
            WebkitBoxFlex: 0.5,
            WebkitFlexGrow: 0.5,
            msFlexPositive: 0.5,
            flexGrow: 0.5,
        }}>Add Recipe</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
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
                        helperText={errors.title?.message} />
                    <TextField
                        {...register("description")}
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message} />
                    <IngredientInput onIngredientsChange={handleIngredientsChange} />
                    {errors.ingredients && <Typography color="error">{errors.ingredients.message}</Typography>}
                    <TextField
                        {...register("instructions")}
                        label="Instructions"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.instructions}
                        helperText={errors.instructions?.message} />
                    <div><Button type="submit">Add</Button></div>
                </form>
            </Box>
        </Modal>
    </>)};

export default AddRecipe;
