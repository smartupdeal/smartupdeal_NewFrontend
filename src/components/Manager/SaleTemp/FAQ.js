import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const FAQ=(props)=> {
  const {faq,index,onStateChangeHandler, removeFAQ,faqEdit,formErrors }=props
    return (
      <Row className={faqEdit && !faq?.faqAddEdit ? 'edit__wrapper' : null}>
      <Col xs='12' lg='12'>
      <Input
        type={'text'}
        label={'Question'}
        name='Q'
        placeholder={'Question'}
        error={formErrors&&formErrors[`faqs.${index}.Q`]}
        value={faq?.Q}
        onInputChange={(name, value) => {
          onStateChangeHandler(name, value, index,faqEdit);
        }}
      />
    </Col>
    <Col xs='12' lg='12'>
      <Input
        type={'textarea'}
        label={'Answer'}
        error={formErrors&&formErrors[`faqs.${index}.A`]}
        name='A'
        placeholder={'Answer'}
        value={faq?.A}
        onInputChange={(name, value) => {
          onStateChangeHandler(name, value, index,faqEdit);
        }}
      />
    </Col>
    <Col xs='12' md='12'>
      <Button variant='danger' text='Delete' onClick={() => removeFAQ(index,faqEdit)} />
    </Col>
  </Row>
    );
}

export default FAQ;