import React from 'react';
import DatePicker from 'react-datepicker';
import { setMinutes, setHours, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import moment from 'moment';
import SelectOption from '../../Common/SelectOption';


const weekDays = [
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' }
];
const Sessions = props => {
  const { frequency, session, formErrors, edit, index, connectSlotSessionChange , selectedWeekDays } = props;
  return (
    <>
      {frequency === 'once' && (
        <Col xs='12' lg='4'>
          <div className='input-box'>
            <label>Date</label>
            <DatePicker
              dateFormat='MM-dd-yyyy'
              onChange={value => {
                connectSlotSessionChange('date', value, edit, index);
              }}
              placeholderText='Select a Date'
              // selected={connectSlot?.date}
              selected={session?.date ? new Date(session?.date) : null}
              className='connect-date'
              minDate={Date.now()}
            />
          </div>
          {formErrors && formErrors[`connectSlot.sessions.${index}.date`] && <span className='invalid-message'>{formErrors[`connectSlot.sessions.${index}.date`]}</span>}
        </Col>
      )}

      {frequency === 'repeated' && (
        <Col xs='12' lg='4'>
          <SelectOption
            // error={formErrors['taxable']}
            multi
            label={'Select Days'}
            name={'weekDays'}
            options={weekDays}
            value={selectedWeekDays}
            handleSelectChange={value => {
              connectSlotSessionChange('weekDays', value, edit, index);
            }}
          />
          {formErrors && formErrors[`connectSlot.sessions.${index}.weekDays`] && <span className='invalid-message'>{formErrors[`connectSlot.sessions.${index}.weekDays`]}</span>}
        </Col>
      )}

      {frequency && (
        <>
          {/* start time */}
          <Col xs='12' lg='4'>
            <div className='input-box'>
              <label>Start Time</label>
              <DatePicker
                onChange={value => {
                  connectSlotSessionChange('start', value, edit, index);
                }}
                placeholderText='Select a Start Time'
                selected={session?.start ? new Date(session?.start) : null}
                className='connect-date'
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
              // dateFormat="MM-DD-YYYY h:mm aa"
              />
            </div>
            {formErrors && formErrors[`connectSlot.sessions.${index}.start`] && <span className='invalid-message'>{formErrors[`connectSlot.sessions.${index}.start`]}</span>}
          </Col>

          {/* end time */}
          <Col xs='12' lg='4'>
            <div className='input-box'>
              <label>End Time </label>
              <DatePicker
                onChange={value => {
                  connectSlotSessionChange('end', value, edit, index);
                }}
                placeholderText='Select a End Time'
                selected={session?.end ? new Date(session?.end) : null}
                className='connect-date'
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'

                disabled={!session?.start}
                // setHours(setMinutes(new Date(connectSlot?.start), 15), moment(connectSlot.start).hours())
                // setMinutes(new Date(connectSlot?.start), 15)
                minTime={
                  session?.start
                    ? setHours(setMinutes(new Date(), 
                    (parseInt(moment(session.start).minutes()) > 0 ? 45 : 30)
                    ), moment(session.start).hours()
                    )
                    : null
                }
                maxTime={session?.start ? setHours(setMinutes(new Date(session?.start), 0), 23) : null}
              />
            </div>
            {formErrors && formErrors[`connectSlot.sessions.${index}.end`] && <span className='invalid-message'>{formErrors[`connectSlot.sessions.${index}.end`]}</span>}
          </Col>
        </>
      )}
    </>
  );
};

export default Sessions;
