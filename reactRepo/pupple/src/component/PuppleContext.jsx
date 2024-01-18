import { createContext, useContext, useState } from "react";

const puppleContext = createContext();
const adminContext = createContext();

export const AuthProvider = ({ children }) => {
  const initializeUser = () => {
    const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));
    return loginMemberVo || null;
  };
  const initializeAdmin = () => {
    const loginAdminVo = JSON.parse(sessionStorage.getItem("loginAdminVo"));
    return loginAdminVo || null;
  };

  const [user, setUser] = useState(initializeUser);
  const [admin, setAdmin] = useState(initializeAdmin);

  const login = (userInfo) => {
    sessionStorage.setItem("loginMemberVo", JSON.stringify(userInfo));
    setUser(userInfo);
  };
  const loginAdmin = (adminInfo) => {
    sessionStorage.setItem("loginAdminVo", JSON.stringify(adminInfo));
    setAdmin(adminInfo);
  };

  const logout = () => {
    sessionStorage.removeItem("loginMemberVo");
    setUser(null);
  };
  const logoutAdmin = () => {
    sessionStorage.removeItem("loginAdminVo");
    setAdmin(null);
  };

  return (
    <puppleContext.Provider value={{ user, login, logout }}>
      <adminContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
        {children}
      </adminContext.Provider>
    </puppleContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(puppleContext);
};
export const useAdminAuth = () => {
  return useContext(adminContext);
};
