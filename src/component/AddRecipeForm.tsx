import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    instructions: yup.string().required('Instructions are required'),
});

const AddRecipeForm: React.FC<{ onAddRecipe: (data: any) => void }> = ({ onAddRecipe }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        onAddRecipe(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register('title')} label="Recipe Title" error={!!errors.title} helperText={errors.title?.message} />
            <TextField {...register('instructions')} label="Instructions" error={!!errors.instructions} helperText={errors.instructions?.message} />
            <Button type="submit">Add Recipe</Button>
        </form>
    );
};

export default AddRecipeForm;
