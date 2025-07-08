import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
