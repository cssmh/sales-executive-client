import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SmallLoader from "../Components/SmallLoader";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute -top-7 inset-0 flex items-center justify-center">
          <SmallLoader />
        </div>
      </div>
    );
  if (user) return children;

  return <Navigate to="/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
