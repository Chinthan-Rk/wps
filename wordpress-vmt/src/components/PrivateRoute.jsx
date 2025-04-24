import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
