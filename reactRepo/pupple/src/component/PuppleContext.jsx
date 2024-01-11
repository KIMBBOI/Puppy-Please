import { createContext } from "react";
import MemberLogin from "./member/MemberLogin";


console.log("context : " + MemberLogin.loginMemverVo);
const loginMemberContext = createContext(null);

export default loginMemberContext;



