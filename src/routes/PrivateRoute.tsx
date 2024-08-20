import { Navigate, Outlet } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useContext } from "react";
import Navbar from "../components/navbar";
import { Box } from "@mui/material";

const RotaPrivada = () => {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    authenticated ? (
      <>
        <Navbar />
        <Box sx={{ padding: 4, marginTop: '64px' }} component="main">
          <Outlet />
        </Box>
      </>
    ) : (
      <Navigate to="/" />
    )
  );
}

export default RotaPrivada;
