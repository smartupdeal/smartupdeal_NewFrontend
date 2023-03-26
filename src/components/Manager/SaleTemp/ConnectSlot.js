import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import SelectOption from '../../Common/SelectOption';
import Sessions from './Sessions';

const frequencyOptions = [{ value: 'once', label: 'Once' }, { value: 'repeated', label: 'Repeated' }];

const weekDays = [
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' }
];

const getselectedWeekDays = (connectSlot,index) => {
    if(connectSlot?.sessions[index]  && connectSlot?.sessions[index]?.weekDays.length > 0){
        return (weekDays.filter(e => connectSlot?.sessions[index]?.weekDays?.includes(e.value)));
    }else{
      return '';
    }
}

const Sessionlist = (props) => {
  const { noOfSessions , connectSlot, formErrors,connectSlotSessionChange,edit } = props;
  const rows = [];
  for (let i = 0; i < noOfSessions; i++) {
      rows.push(<Sessions 
           key={i}
           frequency={connectSlot.frequency}
           session={connectSlot?.sessions[i] ?? {}}
           formErrors={formErrors}
           edit={edit}
           index={i}
           connectSlotSessionChange={connectSlotSessionChange}
           selectedWeekDays={getselectedWeekDays(connectSlot,i)}
         />);
  }
  return <>{rows}</>;
}

const ConnectSlot = props => {
  const { connectSlot, connectSlotChange,connectSlotSessionChange, speakersOptions, edit, formErrors } = props;
  const [selectedFrequency, setSelectedFrequency] = React.useState([]);
  //const [selectedWeekDays, setSelectedWeekDays] = React.useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = React.useState([]);
  React.useEffect(
    () => {

      if (connectSlot?.frequency) {
        setSelectedFrequency(frequencyOptions.filter(e => e.value === connectSlot?.frequency));
      }
      // if (connectSlot?.weekDays && connectSlot?.weekDays.length > 0) {
      //   setSelectedWeekDays(weekDays.filter(e => connectSlot?.weekDays.includes(e.value)));
      // }

      if (connectSlot.speakers && connectSlot.speakers.length > 0) {
        setSelectedSpeaker(speakersOptions.filter(e => connectSlot.speakers.includes(e.value)));
      }
    },
    [connectSlot, speakersOptions]
  );
  return (
    <>
    <Row>
      <Col xs='12' lg='12'>
        <h3 className='connect-slot__header'>connect slot</h3>
      </Col>

      <Col xs='12' lg='2'>
        <Input
          type={'number'}
          error={formErrors&&formErrors['connectSlot.price']}
          label={'Price'}
          name={'price'}
          placeholder={'Price'}
          value={connectSlot?.price}
          onInputChange={(name, value) => {
            connectSlotChange(name, value, edit);
          }}
        />
      </Col>
      {/* speakers */}
      <Col xs='12' lg='6'>
        <SelectOption
          // error={formErrors['taxable']}
          multi
          label={'Speakers'}
          name={'speakers'}
          options={speakersOptions}
          value={selectedSpeaker}
          handleSelectChange={value => {
            connectSlotChange('speakers', value, edit);
          }}
        />
      </Col>
      {/* frequency */}
      <Col xs='12' lg='2'>
        <SelectOption // error={formErrors['taxable']}
          label={'frequency'}
          name={'frequency'}
          options={frequencyOptions}
          value={selectedFrequency}
          handleSelectChange={value => {
            connectSlotChange('frequency', value, edit);
          }}
        />
        {formErrors&&formErrors['connectSlot.frequency'] && <span className='invalid-message'>{formErrors['connectSlot.frequency']}</span>}
      </Col>

      <Col xs='12' lg='2'>
        <Input
          type={'number'}
          error={formErrors&&formErrors['connectSlot.noOfSessions']}
          label={'No of Sessions'}
          name={'noOfSessions'}
          placeholder={'noOfSessions'}
          value={connectSlot?.noOfSessions}
          onInputChange={(name, value) => {
            connectSlotChange(name, value, edit);
          }}
        />
      </Col>
      </Row>
      <Row>
      <Sessionlist 
      noOfSessions={parseInt(connectSlot?.noOfSessions)} 
      connectSlot={connectSlot} 
      formErrors={formErrors} 
      connectSlotSessionChange={connectSlotSessionChange}
      edit={edit}
       />
       </Row>
      </>
  );
};

export default ConnectSlot;
