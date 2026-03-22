import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { VALID_USERNAME, VALID_PASSWORD } from "../utils/Constants";
import { ROUTES } from "../utils/AppRoutes";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const step = useAppSelector((s) => s.onboarding.step);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      if (
        values.username === VALID_USERNAME &&
        values.password === VALID_PASSWORD
      ) {
        dispatch(login());
        if(step==5){

          navigate(ROUTES.HOME);
        }else{

          navigate(ROUTES.ONBOARDING);
        }
      } else {
        alert("Invalid credentials");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Container className="flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-xl w-full md:w-1/2 shadow-lg p-6 flex flex-col gap-4"
        >
          <h2 className="text-center text-2xl font-semibold">Login</h2>
          <TextField
            name="username"
            label="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <Button type="submit" variant="contained" className="w-full py-2">
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}