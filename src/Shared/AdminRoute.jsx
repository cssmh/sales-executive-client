import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SmallLoader from "../Components/SmallLoader";

const AdminRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const admin = user?.email === import.meta.env.VITE_admin;
  if (loading) return <SmallLoader size={85} />;
  if (admin) return children;
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
