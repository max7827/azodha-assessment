import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Onboarding from "./pages/onboarding/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./utils/AppRoutes";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.ONBOARDING}
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.HOME} element={ <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}