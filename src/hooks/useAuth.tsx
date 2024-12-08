// hooks/useAuth.ts
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const checkAuth = async (request: Promise<any>) => {
    try {
      return await request;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      throw error;
    }
  };

  return { checkAuth };
};