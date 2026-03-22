import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
import { TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { saveProfile } from "../redux/slices/onboardingSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  age: Yup.number()
    .required("Age is required")
    .typeError("Age must be a number")
    .min(18, "Age must be at least 18")
    .max(120, "Age must not exceed 120"),
 image: Yup.string()
    .required("Profile image is required")
    .test(
      "fileFormat",
      "Unsupported file format. Only JPEG, JPG, PNG allowed.",
      (value) => {
        if (!value) return false; 
        const matches = value.match(/^data:image\/(jpeg|jpg|png);base64,/i);
        return !!matches; 
      }
    ).test(
    "fileSize",
    "Image size must be less than 1MB",
    (value) => {
      if (!value) return false;

      const base64String = value.split(",")[1];

      const sizeInBytes = (base64String.length * 3) / 4;

      return sizeInBytes <= 1024 * 1024;
    }
  ),
});

export default function Step1({ next }: { next: () => void }) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.onboarding.profile);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      age: profile?.age || "",
      image: profile?.image || "",
      imageName: profile?.imageName|| "", 
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveProfile(values));
      next();
    },
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("imageName", file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        formik.setFieldValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormikProvider value={formik}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-1/2 min-w-[320px] max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
          >
            <h2 className="text-center text-2xl font-semibold mb-2">
              Personal Profile
            </h2>

            <TextField
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
            <TextField
              name="age"
              label="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

           
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

           
            <div className="flex flex-col gap-1">
              <Button
                variant="outlined"
                onClick={handleButtonClick}
                className="w-full"
              >
                {formik.values.imageName || "Choose Profile Image"}
              </Button>
              {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
              )}
            </div>

            <Button type="submit" variant="contained" className="w-full py-2">
              Next
            </Button>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}