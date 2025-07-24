import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  region: string;
  district: string;
  location: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo user data
const demoUser: User = {
  id: "1",
  name: "Kwame Mensah",
  email: "kwame.mensah@farmetrics.com",
  phone: "+233 24 123 4567",
  status: "pending",
  region: "Ashanti Region",
  district: "Bekwai District",
  location: "Domeabra",
  role: "Field Officer"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("farmetrics_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - accepts any email/password combo
    if (email && password) {
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem("farmetrics_user", JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    // Demo registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      status: "pending",
      region: userData.region,
      district: userData.district,
      location: userData.location,
      role: "Field Officer"
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("farmetrics_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("farmetrics_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};