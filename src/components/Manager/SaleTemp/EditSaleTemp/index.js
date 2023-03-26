import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../../Common/Input';
import Switch from '../../../Common/Switch';
import Button from '../../../Common/Button';
import Package from '../Package';
import HighLight from '../HighLight';
import FAQ from '../FAQ';
import 'react-datepicker/dist/react-datepicker.css';
import ConnectSlot from '../ConnectSlot';
import SelectOption from '../../../Common/SelectOption';

const EditSaleTemp = props => {
  const {
    saleTemp,
    saleTempChange,
    formErrors,
    updateSaleTemp,
    deleteSaleTemp,
    products,
    tempPackagesChange,
    removePackage,
    highLightChange,
    removeHighLight,
    addHighLight,
    faqChange,
    removeFAQ,
    addFAQ,
    users,
    addPackage,
    connectSlotChange,
    connectSlotSessionChange,
    user,
    industries,
    technologies,
    skills,
    categories
  } = props;
  const [selectedSpeakersOptions, setSelectedSpeakersOptions] = React.useState([]);
  const [speakersOptions, setSpeakersOptions] = React.useState([]);

  const [industriesOptions, setIndustriesOptions] = React.useState([]);
  const [skillsOptions, setSkillsOptions] = React.useState([]);
  const [technologiesOptions, setTechnologiesOptions] = React.useState([]);
  const [categoriesOptions, setCategoriesOptions] = React.useState([]);

  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedIndustry, setSelectedIndustry] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState([]);
  const [selectedTechnology, setSelectedTechnology] = React.useState([]);


  const getSelectedValue = (arr,id) =>{
    if(typeof arr[0] === 'string'){
      return arr.includes(id)
    }else{
      let temp = [];
      arr.forEach(value => {
         if(value.value == id){
          temp.push(value);
         }
      })
      return temp.length > 0;
    }
   
  }

  React.useEffect(
    () => {
      if (users.length > 0) {
        const options = users
          .filter(e => e._id !== user._id)
          .map(e => {
            return {
              value: e._id,
              label: `${e.firstName} ${e.lastName}`
            };
          });

        setSpeakersOptions(options);
      }

      if (categories.length > 0) {
        const options = categories
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });

          setCategoriesOptions(options);
      }

      if (industries.length > 0) {
        const industriesOptions = industries
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });

          setIndustriesOptions(industriesOptions);
      }

      if (technologies.length > 0) {
        const technologiesOptions = technologies
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });

          setTechnologiesOptions(technologiesOptions);
      }

      if (skills.length > 0) {
        const skillsOptions = skills
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });

          setSkillsOptions(skillsOptions);
      }
    },
    [users, user]
  );
  React.useEffect(
    () => {
      
      if (saleTemp.connectSlot.speakers.length > 0) {
        const options = users
          .filter(e => saleTemp.connectSlot.speakers.includes(e._id) && e._id !== user._id)
          .map(e => {
            return {
              value: e._id,
              label: `${e.firstName} ${e.lastName}`
            };
          });
        setSelectedIndustry(options);
      }
     
      if (saleTemp.industry.length > 0) {
        const options = industries
          .filter(e => getSelectedValue(saleTemp.industry,e._id))
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });
          setSelectedIndustry(options);
      }

      if (saleTemp.technology.length > 0) {
        const options = technologies
          .filter(e => getSelectedValue(saleTemp.technology,e._id))
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });
          setSelectedTechnology(options);
      }

      if (saleTemp.skill.length > 0) {
        const options = skills
          .filter(e =>  getSelectedValue( saleTemp.skill,e._id))
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });
          setSelectedSkill(options);
      }

      if (saleTemp.category.length > 0) {
        const options = categories
          .filter(e => getSelectedValue(saleTemp.category,e._id))
          .map(e => {
            return {
              value: e._id,
              label: `${e.name}`
            };
          });
          setSelectedCategories(options);
      }

    },
    [saleTemp, users, user ]
  );

  const handleSubmit = event => {
    event.preventDefault();
    updateSaleTemp();
  };
  return (
    <div className='add-product'>
      <h1 />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'name'}
              name={'name'}
              placeholder={'Template Name'}
              value={saleTemp?.name}
              onInputChange={(name, value) => {
                saleTempChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <SelectOption
              //error={formErrors['category']}
              label={'category'}
              placeholder={'category'}
              multi
              value={selectedCategories}
              options={categoriesOptions}
              handleSelectChange={value => {
                saleTempChange('category', value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <SelectOption
              error={formErrors['industry']}
              label={'industry'}
              placeholder={'industry'}
              multi
              value={selectedIndustry}
              options={industriesOptions}
              handleSelectChange={value => {
                saleTempChange('industry', value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <SelectOption
              error={formErrors['skill']}
              label={'skill'}
              placeholder={'skill'}
              multi
              value={selectedSkill}
              options={skillsOptions}
              handleSelectChange={value => {
                saleTempChange('skill', value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
          <SelectOption
              multi
              //error={formErrors['technology']}
              label={'technology'}
              placeholder={'technology'}
              value={selectedTechnology}
              options={technologiesOptions}
              handleSelectChange={value => {
                saleTempChange('technology', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Template Description'}
              value={saleTemp.description}
              onInputChange={(name, value) => {
                saleTempChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={saleTemp.isActive}
              toggleCheckboxChange={value => saleTempChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <hr />
        {/* connect slot */}

        <hr />
        <hr />
        <ConnectSlot
        connectSlot={saleTemp.connectSlot}
        connectSlotChange={connectSlotChange}
        connectSlotSessionChange={connectSlotSessionChange}
        speakersOptions={speakersOptions}
        edit={true}
         />
        <hr />
        <hr />
        {/* packages */}
        {/* <h2>Packages</h2> */}
        <Row className='sub-sec-header'>
          <h3>Packages</h3>{' '}
          <Button
            type='button'
            text='Add Package'
            variant='primary'
            dark
            onClick={() => addPackage(true)}
            disabled={saleTemp.packages?.length === 3}
          />
        </Row>
        {saleTemp.packages?.map((item, index) => (
          <Package
            key={index.toString()}
            saleTempChange={saleTempChange}
            index={index}
            pack={item}
            edit={true}
            onStateChangeHandler={tempPackagesChange}
            products={products}
            selectedProduct={item?.products}
            saleTemp={saleTemp}
            removePackage={removePackage}
          />
        ))}

        <hr />
        <hr />
        {/* highlight */}
        <Row className='sub-sec-header'>
          <h3>HighLights</h3>
          <Button
            type='button'
            text='addHighLight'
            className='sale__button'
            onClick={()=>addHighLight(true)}
            disabled={saleTemp.highLights?.length === 3}
          />
        </Row>
        {saleTemp.highLights?.map((item, index) => (
          <HighLight
            key={index.toString()}
            index={index}
            highLight={item}
            edit={true}
            onStateChangeHandler={highLightChange}
            removeHighLight={removeHighLight}
          />
        ))}
        <hr />
        <hr />
        {/* FAQs */}
        <Row className='sub-sec-header'>
          <h3>FAQs</h3>
          <Button
            type='button'
            text='add FAQ'
            variant='primary'
            dark
            onClick={()=>addFAQ(true)}
            // disabled={highLights?.length === 3}
          />
        </Row>

        {saleTemp.faqs?.map((item, index) => (
          <FAQ
            key={index.toString()}
            faq={item}
            onStateChangeHandler={faqChange}
            removeFAQ={removeFAQ}
            index={index}
            faqEdit={true}
          />
        ))}

        <hr />
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button type='submit' text='Save' className='mb-3 mb-md-0 mr-0 mr-md-3' />
          <Button variant='danger' text='Delete' onClick={() => deleteSaleTemp(saleTemp._id)} />
        </div>
      </form>
    </div>
  );
};

export default EditSaleTemp;
