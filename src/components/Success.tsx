import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../utils/AppRoutes";
import { useAppSelector } from "../redux/hooks";

export default function Success({next,back}:{next:()=>void, back:()=>void}) {
  const navigate = useNavigate();
    const step = useAppSelector((s) => s.onboarding.step);



  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-1/2 min-w-[320px] max-w-lg">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 items-center text-center">
          <h2 className="text-3xl font-semibold text-green-600">
           Onboarding Completed
          </h2>
          <p className="text-gray-600">
            Thank you for completing the onboarding process!
          </p>
        
        
            <div className="flex gap-3 mt-4">
              <Button
                variant="outlined"
                onClick={back}
                className="flex-1"
              >
                Back
              </Button>
               <Button
            variant="contained"
            onClick={() =>{
              if(step!==5){
                next();
              }
             navigate(ROUTES.HOME)
            }}
            className="w-full py-2"
          >
            Go Home Now
          </Button>

            </div>
        </div>
      </div>
    </div>
  );
}