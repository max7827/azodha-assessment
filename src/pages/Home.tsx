import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { resetOnboarding } from "../redux/slices/onboardingSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTES } from "../utils/AppRoutes";

export default function Home() {
  const profile = useAppSelector((s) => s.onboarding.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // dispatch(resetOnboarding());
    navigate(ROUTES.LOGIN);
  };

  const resetOnboardingData = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto ">
        
        <div className="bg-white min-h-screen rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center text-center">
        <h1 className="text-5xl font-bold text-center text-red-300 mb-8">
          This is the Homepage
        </h1>
          {profile.image && (
            <img
              src={profile.image}
              alt="Profile"
              title={profile.imageName}
              className="w-48 h-48 rounded-full object-contain border-4 border-blue-200 mb-4"
            />
          )}
          <h2 className="text-4xl font-bold text-blue-600">
            Welcome <span className="text-green-600">{profile.name} !</span> 
          </h2>
          <p className="text-lg text-gray-600">
            You are successfully onboarded!
          </p>
          <p className="text-sm text-gray-500">
            Your profile and preferences have been saved.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              className=" py-2 mt-4 flex"
            >
            Logout
          </Button>
            <Button
              variant="contained"
              color="info"
              onClick={resetOnboardingData}
              className=" py-2 mt-4"
            >
            Reset Data
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}