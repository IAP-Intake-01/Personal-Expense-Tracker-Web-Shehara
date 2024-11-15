import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import EntryTable from '../Expenses/AddExpenses';
import NewExpenseForm from '../Expenses/AddNewExpense'; // Renamed to clarify the component

// Define a custom theme for your layout (if needed)
const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);
    return router;
}

export default function NewExpense(props) { // Renamed the parent component for clarity
    // React.useEffect(() => {
    //     // Logic for any setup on component mount
    // }, []);

    return (
        <Grid container spacing={2}>
            {/* Form for adding new expenses */}
            <Grid item xs={12}>
                <NewExpenseForm /> {/* Component for new expense form */}
            </Grid>

            {/* Table for displaying entries */}
            <Grid item xs={12} sm={12} md={12}>
                <EntryTable /> {/* Component for expense entries table */}
            </Grid>
        </Grid>
    );
}
