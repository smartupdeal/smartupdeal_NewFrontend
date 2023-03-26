import React from "react";
import { Row, Col } from "reactstrap";
import { Field, Form, ErrorMessage } from "formik";
import {
  CustomInput,
  CustomDateInput,
  CustomInputSelect,
  CustomTextArea,
} from "../inputs";
import { GENDER } from "../../../constants";
export default function BasicInfoForm({ addresses, values, submitCount }) {
  const genderOptions = [
    { label: "Male", value: GENDER.MALE },
    { label: "Female", value: GENDER.FEMALE },
    { label: "Other", value: GENDER.NONE },
  ];
  console.log(addresses);
  const addressOptions = addresses?.map((address) => ({
    label: `${address?.address} ${address?.city} ${address?.state}`,
    value: address?._id,
  }));
  return (
    <Form id="updateBasicInfo">
      <Row>
        <Col xs={12}>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component={CustomInput} />
          <ErrorMessage name="firstName">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component={CustomInput} />
          <ErrorMessage name="lastName">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="phoneNumber"> Phone Number</label>
          <Field name="phoneNumber" component={CustomInput} />
          <ErrorMessage name="phoneNumber">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="dob"> DOB</label>
          <Field name="dob" component={CustomDateInput} />
          <ErrorMessage name="dob">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="gender"> Gender</label>
          <Field
            name="gender"
            component={({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              ...props
            }) => (
              <CustomInputSelect
                {...field}
                {...props}
                options={genderOptions}
              />
            )}
          />
          <ErrorMessage name="gender">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="about"> About Yourself</label>
          <Field name="about" component={CustomTextArea} />
          <ErrorMessage name="about">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label htmlFor="currentAddress"> Current Address</label>
          <Field
            name="currentAddress"
            component={({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              ...props
            }) => (
              <CustomInputSelect
                {...field}
                {...props}
                options={addressOptions}
              />
            )}
          />
          <ErrorMessage name="about">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
    </Form>
  );
}
