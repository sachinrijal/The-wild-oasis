import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1 ) load the authenticated user

  const { isPending, isAuthenticated } = useUser();

  // 3) if not authenticated redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [isAuthenticated, isPending, navigate],
  );

  // 2) show spinner while loading

  if (isPending) return <Spinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
