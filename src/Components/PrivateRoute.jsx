import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('user_jwt');
  
  if (!token) {
    return <Navigate to="/login" replace />;  // Redirect to login if no token is found
  }

  return element;  // Render the protected component if authenticated
};

export default PrivateRoute;
