import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setStep } from "../../redux/slices/onboardingSlice";
import Step1 from "../../components/Step1";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Success from "../../components/Success";

export default function Onboarding() {
  const step = useAppSelector((s) => s.onboarding.step);
  const dispatch = useAppDispatch();

  const next = () => dispatch(setStep(step + 1));
  const back = () => dispatch(setStep(step - 1));

  switch (step) {
    case 1:
      return <Step1 next={next} />;
    case 2:
      return <Step2 next={next} back={back} />;
    case 3:
      return <Step3 next={next} back={back} />;
    case 4:
    case 5:
      return <Success next={next} back={back} />;
    default:
      return null;
  }
}