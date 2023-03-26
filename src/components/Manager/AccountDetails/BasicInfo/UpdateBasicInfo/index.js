import { Formik } from "formik";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as Yup from "yup";
import moment from "moment";
import BasicInfoForm from "../../../../forms/basicInfo";
import { GENDER } from "../../../../../constants";
export default function UpdateBasicInfo({
  basicInfo,
  active,
  close,
  updateProfile,
}) {
  const currentAddress=basicInfo?.addresses?.filter(address=>address?.isDefault===true).pop();
  const currentAddressId=currentAddress?._id;
  return (
    <Modal isOpen={active} size="lg">
      <ModalHeader>Update</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            firstName: basicInfo?.firstName,
            lastName: basicInfo?.lastName,
            phoneNumber: basicInfo?.phoneNumber,
            dob: moment(basicInfo?.dob).format("YYYY-MM-DD"),
            about: basicInfo?.about || "",
            gender: basicInfo?.gender || "",
            currentAddress:currentAddressId
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "First Name must be 15 characters or less")
              .required("First Name is required"),
            lastName: Yup.string()
              .max(15, "Last Name must be 15 characters or less")
              .required("Last Name is required"),
            phoneNumber: Yup.string()
              .max(15, "Phone Number must be 15 characters or less")
              .required("Phone Number is required"),
            dob: Yup.date().required("Date of Birth is required"),
            about: Yup.string()
              .max(500, "About yourself must be 500 characters or less")
              .required("About yourself is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            updateProfile(values);
            close();
          }}
        >
          {(values, submitCount) => (
            <BasicInfoForm
              addresses={basicInfo?.addresses}
              values={values}
              submitCount={submitCount}
            />
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button form="updateBasicInfo" type="submit">
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
