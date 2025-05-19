import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = useSelector((state) => state.auth.token);
    
   console.log("Token en el PrivateRoute: ", token);
   
    const location = useLocation();

  // 1) Si no hay token y no estás ya en la ruta de login → ve a /login
    if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
    }

  // 2) Si hay token y estás en /login → ve a /home
    if (token && location.pathname === "/login") {
    return <Navigate to="/home" replace />;
    }

  // 3) En cualquier otro caso (tienes token y no es /login,
  //    o no tienes token pero sí estás ya en /login)
  //    deja pasar a los children
    return children;
}

