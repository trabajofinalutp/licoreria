export interface User {
  token: string;
  role: string;
  email: string;
}

// Store user in both memory and sessionStorage
export const setUser = (newUser: User | null) => {
  if (newUser) {
    sessionStorage.setItem('userData', JSON.stringify(newUser));
  } else {
    sessionStorage.removeItem('userData');
  }
};

// Get user from sessionStorage
export const getUser = (): User | null => {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

// Clear user data on logout
export const clearUser = () => {
  sessionStorage.removeItem('userData');
  sessionStorage.removeItem('token');
};
