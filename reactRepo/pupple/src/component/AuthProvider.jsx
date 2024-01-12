import { useState } from "react";




const AuthProvider = ({children}) => {
    const initializeUser = () => {
        const loginMemberVo = JSON.parse(sessionStorage.getItem("user"));
        return loginMemberVo || null;
    }
    const [user, setUser] = useState(initializeUser);

  // 로그인 시 세션 스토리지에 사용자 정보 저장
  const login = (userInfo) => {
    sessionStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  // 로그아웃 시 세션 스토리지에서 사용자 정보 제거
  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthProvider.Provider value={{ user, login, logout }}>
      {children}
    </AuthProvider.Provider>
  );
};
