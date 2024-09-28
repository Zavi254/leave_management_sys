import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

const ProtectedRoute = ({ element, ...rest }) => {
  const user = useSelector(selectUser);

  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
