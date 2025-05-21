import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1) Creamos un flag que se activa tras X ms
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300); // <--- 300ms de espera
    return () => clearTimeout(t);
  }, []);

  // 2) Mientras no esté “ready”, devolvemos null (no entra en ninguna redirección)
  if (!ready) return null;

  // 3) Al pasar el timeout, entra en tu lógica habitual:
  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  if (token && location.pathname === "/login") {
    return <Navigate to="/home" replace />;
  }
  return children;
}
