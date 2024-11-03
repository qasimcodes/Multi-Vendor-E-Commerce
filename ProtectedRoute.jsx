import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from '../context/auth';
import axios from 'axios';
import Loader from './../layouts/Loader';
import { useNavigate } from "react-router-dom";
import P404 from "../screens/P404";

function ProtectedRoute() {
  /* context */
  const [auth, setAuth] = useAuth();
  
  /* states */
  const [loading, setLoading] = useState(true); 
  const [ok, setOk] = useState(false);

  const navigate = useNavigate();

  /* make back-end request useEffect */
  useEffect(() => {
    if (auth?.token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-logged-user", {
        headers: {
          Authorization: auth?.token
        }
      });
      setOk(true);
      setLoading(false); 
    } catch (err) {
      setOk(false);
      setLoading(false); 
    }
  };

  if (loading) {
    return <Loader />; 
  }
   // If not loading, check auth status
  return ok ? <Outlet /> : <P404 />;
}

export default ProtectedRoute;
