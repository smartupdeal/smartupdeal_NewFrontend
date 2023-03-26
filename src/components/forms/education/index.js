import React from "react";
import { Row, Col } from "reactstrap";
import { Field, Form, ErrorMessage } from "formik";

export default function EducationForm({ values, submitCount }) {
  return (
    <Form id="education">
      <Row>
        <Col xs={12}>
          <label htmlFor="program">Course</label>
          <Field id="program" name="program" type="text" />
          <ErrorMessage name="program">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <label htmlFor="institution">College / University</label>
          <Field name="institution" type="text" />
          <ErrorMessage name="institution">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <label htmlFor="passingYear"> Passing Year</label>
          <Field name="passingYear" type="number" />
          <ErrorMessage name="passingYear">
            {(msg) => <span className="text-danger">{msg}</span>}
          </ErrorMessage>
        </Col>
      </Row>
    </Form>
  );
}
