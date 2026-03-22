import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { savePayment } from "../redux/slices/onboardingSlice";

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expiry: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3-4 digits"),
});

export default function Step3({
  next,
  back,
}: {
  next: () => void;
  back: () => void;
}) {
  const dispatch = useAppDispatch();
  const payment = useAppSelector((s) => s.onboarding.payment);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: payment || { cardNumber: "", expiry: "", cvv: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(savePayment(values));
      next();
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-1/2 min-w-[320px] max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
          >
            <h2 className="text-center text-2xl font-semibold mb-2">
              Payment Information
            </h2>
            <TextField
              name="cardNumber"
              label="Card Number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              placeholder="1234 5678 9012 3456"
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <TextField
              name="expiry"
              label="Expiry"
              value={formik.values.expiry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              placeholder="MM/YY"
              error={formik.touched.expiry && Boolean(formik.errors.expiry)}
              helperText={formik.touched.expiry && formik.errors.expiry}
            />
            <TextField
              name="cvv"
              label="CVV"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              placeholder="123"
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outlined"
                onClick={back}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="flex-1 py-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}