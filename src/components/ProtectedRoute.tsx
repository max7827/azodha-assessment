import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks"
import type { JSX } from "react";
import { ROUTES } from "../utils/AppRoutes";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
}