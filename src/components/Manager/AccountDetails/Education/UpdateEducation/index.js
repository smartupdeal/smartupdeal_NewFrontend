import { Formik } from "formik";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EducationForm from "../../../../forms/education";
import { EducationSchema } from "../../../../../helpers/schemas";
export default function UpdateEducation({
  education,
  active,
  close,
  updateUserEducation,
}) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>Update</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            program: education?.program,
            institution: education?.institution,
            passingYear: education?.passingYear,
          }}
          validationSchema={EducationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const castedvalues = EducationSchema.cast(values);
            updateUserEducation({ ...castedvalues, _id: education?._id });
            close();
          }}
        >
          {({ values, submitCount }) => (
            <EducationForm values={values} submitCount={submitCount} />
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button form="education" type="submit">
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
