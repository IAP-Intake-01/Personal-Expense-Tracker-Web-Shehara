import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import AppBar from '../../Components/AppBar/AppBar';
import Sidebar from '../../Components/SideBar/SideBar';
import Home from './Home';
import AddExpense from '../Expenses/NewExpense';
import MonthlySummary from '../Reports/MonthlySummary';
import YearlySummary from '../Reports/YearlySummary';

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Home />;
      case 'addExpense':
        return <AddExpense />;
      case 'monthlySummary':
        return <MonthlySummary />;
      case 'yearlySummary':
        return <YearlySummary />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* AppBar positioned at the top */}
      <AppBar />
      
      {/* Main layout with Sidebar and Content */}
      <Grid container style={{ height: 'calc(100vh - 64px)' }}> {/* Adjust height to be below AppBar */}
        {/* Sidebar on the left */}
        <Grid item xs={3} md={2}>
          <Sidebar onTabChange={(tab) => setActiveTab(tab)} />
        </Grid>

        {/* Content area on the right */}
        <Grid item xs={9} md={10} style={{ padding: '20px', overflowY: 'auto' }}>
          {renderContent()}
        </Grid>
      </Grid>
    </>
  );
}


// import * as React from 'react';
// import { extendTheme, styled } from '@mui/material/styles';
// import { CircularProgress, Typography, Grid } from '@mui/material';
// import AppBar from '../../Components/AppBar/AppBar';
// import Sidebar from '../../Components/SideBar/SideBar';
// import Home from './Home';
// import AddExpense from '../Expenses/NewExpense';
// // import MonthlySummary from '../Reports/MonthlySummary';
// // import YearlySummary from '../Reports/YearlySummary';

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: 'class',
//   breakpoints: {
//     values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
//   },
// });

// export default function DashboardLayoutBasic(props) {
//   const { window } = props;
//   const [activeTab, setActiveTab] = React.useState('dashboard');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Home />;
//       case 'addExpense':
//         return <AddExpense />;
//       case 'monthlySummary':
//         return <MonthlySummary />;
//       case 'yearlySummary':
//         return <YearlySummary />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* AppBar positioned at the top */}
//       <AppBar />
      
//       {/* Main layout with Sidebar and Content */}
//       <Grid container style={{ height: 'calc(100vh - 64px)' }}> {/* Adjust height to be below AppBar */}
//         {/* Sidebar on the left */}
//         <Grid item xs={3} md={2}>
//           <Sidebar onTabChange={(tab) => setActiveTab(tab)} />
//         </Grid>

//         {/* Content area on the right */}
//         <Grid item xs={9} md={10} style={{ padding: '20px', overflowY: 'auto' }}>
//           {renderContent()}
//         </Grid>
//       </Grid>
//     </>
//   );
// }
