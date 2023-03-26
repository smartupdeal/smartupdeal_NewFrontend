import { Formik } from "formik";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ExperienceForm from "../../../../forms/experience";
import { ExperienceSchema } from "../../../../../helpers/schemas";
export default function AddExperience({ active, close, addUserExperience }) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>Add</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            organization: "",
            designation: "",
            fromDate: "",
            toDate: "",
            isCurrent:false
          }}
          onSubmit={(values) => {
            const castedvalues = ExperienceSchema.cast(values);
            addUserExperience(castedvalues);
            close();
          }}
        >
          {({ values, submitCount }) => (
            <ExperienceForm values={values} submitCount={submitCount} />
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button form="experience" type="submit">
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
