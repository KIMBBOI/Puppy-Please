import { createContext, useContext, useState } from "react";

const puppleContext = createContext();

export const AuthProvider = ({children}) => {
    const initializeUser = () => {
        const user = JSON.parse(sessionStorage.getItem("loginMemberVo"));
        return user || null;
    };

    const [user, setUser] = useState(initializeUser);

    const login = (userInfo) => {
        sessionStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);

    };

    return (
        <puppleContext.Provider value={{user, login, logout}}>
            {children}
        </puppleContext.Provider>

    );
};

export const useAuth = () => {
    return useContext(puppleContext);
};
