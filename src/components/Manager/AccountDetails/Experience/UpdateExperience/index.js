import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik } from "formik";
import moment from "moment";
import ExperienceForm from "../../../../forms/experience";
import { ExperienceSchema } from "../../../../../helpers/schemas";
export default function UpdateExperience({
  experience,
  active,
  close,
  updateUserExperience,
}) {
  return (
    <Modal isOpen={active}>
      <ModalHeader>Update</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            organization: experience?.organization,
            designation: experience?.designation,
            fromDate: moment(experience?.fromDate).format("YYYY-MM-DD"),
            toDate: experience?.toDate
              ? moment(experience?.toDate).format("YYYY-MM-DD")
              : "",
            isCurrent: experience?.isCurrent,
          }}
          validationSchema={ExperienceSchema}
          onSubmit={(values, { setSubmitting }) => {
            const castedValues = ExperienceSchema.cast(values);
            updateUserExperience({ ...castedValues, _id: experience?._id });
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
