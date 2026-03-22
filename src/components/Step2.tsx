import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { saveSongs } from "../redux/slices/onboardingSlice";

const validationSchema = Yup.object().shape({
  songs: Yup.array()
    .of(
      Yup.string()
        .required("Song name is required")
        .min(2, "Song name must be at least 2 characters")
    )
    .min(1, "At least one song is required")
    .required("At least one song is required"),
});

export default function Step2({
  next,
  back,
}: {
  next: () => void;
  back: () => void;
}) {
  const dispatch = useAppDispatch();
  const songs = useAppSelector((s) => s.onboarding.songs);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { songs: songs.length ? songs : [""] },
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveSongs(values.songs));
      next();
    },
  });
  // return <div className="bg-red-500 text-white">fdfdf</div>
  return (
    <FormikProvider value={formik}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-1/2 min-w-[320px] max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
          >
            <h2 className="text-center text-2xl font-semibold mb-2">
              Favorite Songs List
            </h2>
            <FieldArray
              name="songs"
              render={(helpers) => (
                <>
                  {formik.values.songs.map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <TextField
                        name={`songs.${i}`}
                        value={formik.values.songs[i]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        placeholder="Enter song name"
                        error={formik.touched.songs && Boolean(formik.errors.songs && Array.isArray(formik.errors.songs) && formik.errors.songs[i])}
                        helperText={formik.touched.songs && Array.isArray(formik.errors.songs) && formik.errors.songs[i]}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => helpers.remove(i)}
                        className="px-4"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => helpers.push("")}
                    className="w-full"
                  >
                    Add Song
                  </Button>
                </>
              )}
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
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}