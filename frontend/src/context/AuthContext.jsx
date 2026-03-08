import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for the hackathon
  useEffect(() => {
    const savedUser = localStorage.getItem('saferoute_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:9080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      
      const user = await response.json();
      setUser(user);
      localStorage.setItem('saferoute_user', JSON.stringify(user));
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await fetch('http://localhost:9080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const user = await response.json();
      setUser(user);
      localStorage.setItem('saferoute_user', JSON.stringify(user));
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('saferoute_user');
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
