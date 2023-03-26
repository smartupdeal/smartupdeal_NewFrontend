import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const HighLight = props => {
  const { highLight, index, onStateChangeHandler, removeHighLight, edit,formErrors } = props;

  return (
    <Row className={edit && !highLight?.highlightEdit? 'edit__wrapper' : null}>
      <Col xs='12' lg='6'>
        <Input
          type={'text'}
          label={'Highlight Text'}
          name='text'
          error={formErrors&&formErrors[`highLights.${index}.text`]}
          placeholder={'Highlight Text'}
          value={highLight.text}
          onInputChange={(name, value) => {
            onStateChangeHandler(name, value, index, edit);
          }}
        />
      </Col>

      <Col xs='12' md='12'>
        <Button variant='danger' text='Delete' onClick={() => removeHighLight(index, edit)} />
      </Col>
    </Row>
  );
};

export default HighLight;
