import { createContext, useContext, useState } from "react";

const puppleContext = createContext();

export const AuthProvider = ({children}) => {
    const initializeUser = () => {
        const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));
        return loginMemberVo || null;
    };

    const [user, setUser] = useState(initializeUser);

    const login = (userInfo) => {
        sessionStorage.setItem("loginMemberVo", JSON.stringify(userInfo));
        setUser(userInfo);
    };

    const logout = () => {
        sessionStorage.removeItem("loginMemberVo");
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
