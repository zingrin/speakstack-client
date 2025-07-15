import { useContext } from "react";
import AuthContext from "../contexts/AuthContexts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
