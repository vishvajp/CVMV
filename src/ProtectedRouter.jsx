import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ isAuth, children }) => {
  if (isAuth !== "true") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRouter;
