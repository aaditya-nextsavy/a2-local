import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken); 
    }
    setTimeout(() => {
        
        setLoading(false);
    }, 500);
  }, []);

  const login = (newToken) => {
    Cookies.set('token', newToken, { expires: 1 / 720 }); // Set the token to expire in 5 minutes
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
