import * as Yup from "yup";

export const EducationSchema = Yup.object({
  program: Yup.string()
    .trim()
    .max(15, "Course must be 15 characters or less")
    .required("Course is required"),
  institution: Yup.string()
    .trim()
    .max(20, "College / University be 20 characters or less")
    .required("College / University is required"),
  passingYear: Yup.string().trim().required("Passing Year is required"),
});

export const ExperienceSchema = Yup.object({
  organization: Yup.string()
    .max(15, "Organization must be 15 characters or less")
    .required("Organization is required"),
  designation: Yup.string()
    .max(20, "Designation be 20 characters or less")
    .required("Designation is required"),
  fromDate: Yup.date().required("From date is required"),
  toDate: Yup.date().nullable().default(undefined)
  .transform((curr, orig) => orig === '' ? null : curr),
  isCurrent: Yup.boolean().optional(),
});
