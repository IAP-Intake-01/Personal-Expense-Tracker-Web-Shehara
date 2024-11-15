import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TextField, MenuItem, Select, FormControl, InputLabel, Button
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const columns = [
    { width: 150, label: 'Date', dataKey: 'date' },
    { width: 150, label: 'Category', dataKey: 'category' },
    { width: 250, label: 'Description', dataKey: 'description' },
    { width: 100, label: 'Amount', dataKey: 'amount', numeric: true },
    { width: 150, label: 'Actions', dataKey: 'actions', numeric: false },
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function EntryTable() {
    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState({});
    const [categoryFilter, setCategoryFilter] = useState('');
    const [editRowId, setEditRowId] = useState(null);
    const [tempRowData, setTempRowData] = useState({});
    const userId = '2'; // your user ID

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const [entriesResponse, categoriesResponse] = await Promise.all([
                    axios.get(`http://localhost:3000/api/entries/${userId}`),
                    axios.get(`http://localhost:3000/api/categories`)
                ]);

                setRows(entriesResponse.data);
                const categoryMap = {};
                categoriesResponse.data.forEach(category => {
                    categoryMap[category.category_id] = category.category_name;
                });
                setCategories(categoryMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEntries();
    }, [userId]);

    const handleEdit = (id) => {
        setEditRowId(id);
        const rowToEdit = rows.find(row => row.id === id);
        setTempRowData({ ...rowToEdit });
    };

    const handleDelete = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleSave = (id) => {
        setRows(rows.map(row => (row.id === id ? tempRowData : row)));
        setEditRowId(null);
    };

    const handleCancel = () => {
        setEditRowId(null);
        setTempRowData({});
    };

    const handleInputChange = (e, field) => {
        setTempRowData({
            ...tempRowData,
            [field]: e.target.value
        });
    };

    const handleFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    function rowContent(index, row) {
        const isEditing = row.id === editRowId;

        return (
            <>
                {columns.map((column) => (
                    column.dataKey !== 'actions' ? (
                        <TableCell
                            key={column.dataKey}
                            align={column.numeric ? 'right' : 'left'}
                        >
                            {isEditing ? (
                                <TextField
                                    value={tempRowData[column.dataKey] || ''}
                                    onChange={(e) => handleInputChange(e, column.dataKey)}
                                />
                            ) : (
                                column.dataKey === 'date' ? 
                                    formatDate(row[column.dataKey]) :
                                column.dataKey === 'category' ?
                                    categories[row.category_id] || 'N/A' :
                                    row[column.dataKey] || 'N/A'
                            )}
                        </TableCell>
                    ) : (
                        <TableCell key="actions" align="center">
                            {isEditing ? (
                                <>
                                    <IconButton aria-label="save" color="primary" onClick={() => handleSave(row.id)}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton aria-label="cancel" color="secondary" onClick={handleCancel}>
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </TableCell>
                    )
                ))}
            </>
        );
    }

    const filteredRows = categoryFilter ? rows.filter(row => row.category_id === parseInt(categoryFilter)) : rows;

    return (
        <div className="table-container">
            <h2 style={{ textAlign: 'center', flex: 1 }}>Entries</h2>

            <FormControl fullWidth margin="normal">
                <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                <Select
                    labelId="category-filter-label"
                    value={categoryFilter}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {Object.entries(categories).map(([id, name]) => (
                        <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={filteredRows}
                    components={{
                        Scroller: React.forwardRef((props, ref) => (
                            <TableContainer component={Paper} {...props} ref={ref} />
                        )),
                        Table: (props) => (
                            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
                        ),
                        TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
                        TableRow,
                        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
                    }}
                    fixedHeaderContent={() => (
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.dataKey}
                                    align={column.numeric ? 'right' : 'left'}
                                    style={{ width: column.width }}
                                    sx={{ backgroundColor: 'background.paper' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    );
}
