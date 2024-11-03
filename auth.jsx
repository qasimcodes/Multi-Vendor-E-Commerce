import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import apis from "../apis/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  /* get the user details from localStorage using useEffect */
  useEffect(() => {
    const userFromLS = localStorage.getItem("auth");
    if (userFromLS) {
      setAuth(JSON.parse(userFromLS));
    }
  }, []);

  /* Configuration of Axios */
  axios.defaults.baseURL = apis[1];
  axios.defaults.headers.common["Authorization"] = auth.token;
  axios.defaults.headers.common["refresh_token"] = auth.refreshToken;

  // Axios interceptor to catch expired token error
  // axios.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response && error.response.data && error.response.data.message === "jwt expired") {
  //       setError("Your session has expired. Please log in again.");
  //       // window.location.href = "/login";
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return <AuthContext.Provider value={[auth, setAuth]}>
    {children}
    </AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
