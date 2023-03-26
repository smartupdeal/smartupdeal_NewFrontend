import React from "react";
import { Row, Col, Input } from "reactstrap";
import { Field, Form, ErrorMessage } from "formik";
import { CustomInput, CustomDateInput, CustomCheckboxInput } from "../inputs";
export default function ExperienceForm({ values, submitCount }) {
  return (
    <Form id="experience">
      <Row>
        <Col xs={12}>
          <label htmlFor="organization">Organization</label>
          <Field
            id="organization"
            name="organization"
            component={CustomInput}
          />
          <ErrorMessage name="organization">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <label htmlFor="designation">Designation</label>
          <Field name="designation" component={CustomInput} />
          <ErrorMessage name="designation">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <label htmlFor="fromDate"> From</label>
          <Field name="fromDate" type="date" component={CustomDateInput} />
          <ErrorMessage name="fromDate">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
        <Col xs={6}>
          <label htmlFor="toDate"> To</label>
          <Field name="toDate" component={CustomDateInput} disabled={values.isCurrent} />
          <ErrorMessage name="toDate">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="ml-3 mt-3">
          <label htmlFor="isCurrent">&nbsp;</label>
          <Field
            name="isCurrent"
            type="checkbox"
           
            component={({ field, form, ...props }) => (
              <CustomCheckboxInput  label="Currently working?" field={field} form={form} {...props} />
            )}
          />
          <ErrorMessage name="isCurrent">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
    </Form>
  );
}
