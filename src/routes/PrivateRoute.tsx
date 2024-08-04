import { Navigate, Outlet } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useContext } from "react";

const RotaPrivada = () => {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
    return (
      authenticated ? <Outlet /> : <Navigate to="/" />
    )
}

export default RotaPrivada;
