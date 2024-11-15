import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';

export default function AddNewExpense() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch categories from API when component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categories');
                const data = await response.json();
                setCategories(data); // Setting categories data with correct field names
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newExpense = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: Number(newExpense.amount),
                    description: newExpense.description,
                    date: newExpense.date,
                    category_id: Number(selectedCategory),
                    user_id: Number(newExpense.user_id),
                })
            });

            if (response.ok) {
                console.log('New expense added successfully!');
                handleClose();
            } else {
                console.error('Failed to add new expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new expense:', error);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Expense
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the following details to add a new expense.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category_id"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        margin="dense"
                        id="user_id"
                        name="user_id"
                        label="User ID"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
