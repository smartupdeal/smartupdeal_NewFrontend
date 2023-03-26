import { Formik } from "formik";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EducationForm from "../../../../forms/education";
import { EducationSchema } from "../../../../../helpers/schemas";
export default function AddEducation({
  active,
  close,
  addUserEducation,
}) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>Add</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{}}
          validationSchema={EducationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const castedvalues = EducationSchema.cast(values);
            addUserEducation(castedvalues);
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
