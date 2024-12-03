
import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InsightsIcon from '@mui/icons-material/Insights';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import PieChart from '../../Components/Pie Charts/PieChart';  // Import PieChart component
import YearChart from '../../Components/BarChart/BarChart';
import EntryTable from '../Expenses/AddExpenses';
import { CircularProgress, Typography } from '@mui/material';
import NewExpense from '../Expenses/AddNewExpense';
import AppBar from '../../Components/AppBar/AppBar';
import Sidebar from '../../Components/SideBar/SideBar'
import './Home.css'

const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'expenses', title: 'Expenses', icon: <AttachMoneyIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Analytics' },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <InsightsIcon />,
        children: [
            { segment: 'expense-breakdown', title: 'Expense Breakdown', icon: <ReceiptIcon /> },
            { segment: 'monthly-summary', title: 'Monthly Summary', icon: <AccountBalanceWalletIcon /> },
        ],
    },
];

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

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function Home(props) {
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;

    // Example state for loading indicators
    const [isLoadingPie, setIsLoadingPie] = React.useState(true);
    const [isLoadingYear, setIsLoadingYear] = React.useState(true);

    // Simulate loading (You can replace this with actual API fetch logic)
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoadingPie(false);
        }, 2000); // Simulate 2s loading time
        setTimeout(() => {
            setIsLoadingYear(false);
        }, 2500); // Simulate 2.5s loading time
    }, []);

    const renderContent = (activeTab) => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                        <p>Welcome to your financial dashboard!</p>
                    </div>
                );
            case 'addExpense':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
                        <p>Add your new expenses here.</p>
                    </div>
                );
            case 'monthlySummary':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>
                        <p>View your monthly expense summary.</p>
                    </div>
                );
            case 'yearlySummary':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Yearly Summary</h2>
                        <p>View your yearly expense summary.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='full'>
            <NewExpense />
            <div className='main'>

                <div className='piechart'>
                    {isLoadingPie ? (
                        <Skeleton height={300} />
                    ) : (
                        <PieChart />
                    )}
                </div>
                <div style={{ width:'650px' }} className='barChart'>
                    {isLoadingYear ? (
                        <Skeleton height={300} />
                    ) : (
                        <YearChart />
                    )}
                </div>

            </div>
        </div>
    );
}
