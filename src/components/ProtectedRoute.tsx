import { Navigate } from 'react-router-dom';
import { getUser } from '../types/Usuario';
import { useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = getUser();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if trying to access usuarios page and user is not admin
  if (location.pathname === '/usuarios' && user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;