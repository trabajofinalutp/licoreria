export interface User {
    token: string;
    role: string;
  }
  
  let user: User | null = null;
  
  export const setUser = (newUser: User | null) => {
    user = newUser;
  };
  
  export const getUser = () => user;