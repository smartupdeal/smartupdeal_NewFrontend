import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../../Common/Input';
import Switch from '../../../Common/Switch';
import Button from '../../../Common/Button';
import Package from '../Package';
import ConnectSlot from '../ConnectSlot';
import HighLight from '../HighLight';
import FileUpload from '../../../Common/FileUpload/FileUpload';
import FAQ from '../FAQ';
import SelectOption from '../../../Common/SelectOption';

const AddSaleTemp = props => {
  const {
    user,
    users,
    saleTempFormData,
    formErrors,
    saleTempChange,
    addHighLight,
    highLights,
    addSaleTemp,
    image,
    addPackage,
    removePackage,
    tempPackages,
    tempPackagesChange,
    highLightChange,
    removeHighLight,
    products,
    addFAQ,
    FAQs,
    faqChange,
    removeFAQ,
    connectSlotChange,
    connectSlotSessionChange,
    connectSlot,
    industries,
    technologies,
    skills,
    categories
  } = props;

  const [speakersOptions, setSpeakersOptions] = React.useState([]);
  const [industriesOptions, setIndustriesOptions] = React.useState([]);
  const [skillsOptions, setSkillsOptions] = React.useState([]);
  const [technologiesOptions, setTechnologiesOptions] = React.useState([]);
  const [categoriesOptions, setCategoriesOptions] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedIndustry, setSelectedIndustry] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState([]);
  const [selectedTechnology, setSelectedTechnology] = React.useState([]);
  const [fileUploaded, setFileUploaded] = React.useState(false);

  const updateUploadedFiles = files => {
    files.length > 0 ? setFileUploaded(true) : setFileUploaded(false);
    console.log('files',files);
    saleTempChange('image', files);
  };

  const handleSubmit = event => {
    event.preventDefault();
    addSaleTemp();
  };

  React.useEffect(
    () => {
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
     
      if (saleTempFormData?.category) {
        setSelectedCategories(categoriesOptions.filter(e => saleTempFormData?.category.includes(e.value)));
      }
      
      if (saleTempFormData?.industry) {
        setSelectedIndustry(industriesOptions.filter(e => saleTempFormData?.industry.includes(e.value)));
      }
      if (saleTempFormData?.technology) {
        setSelectedTechnology(technologiesOptions.filter(e => saleTempFormData?.technology.includes(e.value)));
      }
      if (saleTempFormData?.skill) {
        setSelectedSkill(skillsOptions.filter(e => saleTempFormData?.skill.includes(e.value)));
      }

    },
    [users,industries,technologies, skills, saleTempFormData,categories]
  );

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'name'}
              name={'name'}
              placeholder={'Template Name'}
              value={saleTempFormData.name}
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
              error={formErrors['technology']}
              label={'technology'}
              placeholder={'technology'}
              multi
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
              value={saleTempFormData.description}
              onInputChange={(name, value) => {
                saleTempChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <FileUpload
              accept='.jpg,.png,.jpeg'
              label='upload file'
              updateFilesCb={updateUploadedFiles}
              fileUploaded={fileUploaded}
              multiple
            />
            {formErrors['image'] && <span className='invalid-message'>{formErrors['image']}</span>}
          </Col>

          <Col xs='6' md='6'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={saleTempFormData.isActive}
              toggleCheckboxChange={value => saleTempChange('isActive', value)}
            />
          </Col>

          {/* connect slot */}
        </Row>
        <hr />
        <hr />
        <ConnectSlot
          connectSlot={connectSlot}
          connectSlotChange={connectSlotChange}
          connectSlotSessionChange={connectSlotSessionChange}
          speakersOptions={speakersOptions}
          formErrors={formErrors}
        />
        <hr />
        <hr />
        {/* packages */}
        <Row className='sub-sec-header'>
          <h3>Packages</h3>
          <Button
            type='button'
            text='Add Package'
            variant='primary'
            dark
            onClick={() => addPackage()}
            disabled={tempPackages?.length === 3}
          />
        </Row>
        {formErrors['packages'] && <span className='invalid-message'>{formErrors['packages']}</span>}
        {tempPackages?.map((item, index) => (
          <Package
            key={index.toString()}
            saleTempFormData={saleTempFormData}
            saleTempChange={saleTempChange}
            index={index}
            pack={item}
            onStateChangeHandler={tempPackagesChange}
            products={products}
            removePackage={removePackage}
            formErrors={formErrors}
          />
        ))}

        <hr />
        <hr />
        {/* highlights */}
        <Row className='sub-sec-header'>
          <h3>HighLights</h3>
          <Button
            type='button'
            text='addHighLight'
            className='sale__button'
            onClick={() => addHighLight()}
            disabled={highLights?.length === 3}
          />
        </Row>
        {formErrors['highLights'] && <span className='invalid-message'>{formErrors['highLights']}</span>}
        {highLights?.map((item, index) => (
          <HighLight
            key={index.toString()}
            index={index}
            highLight={item}
            onStateChangeHandler={highLightChange}
            removeHighLight={removeHighLight}
            formErrors={formErrors}
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
            onClick={() => addFAQ()}
            // disabled={highLights?.length === 3}
          />
        </Row>
        {formErrors['faqs'] && <span className='invalid-message'>{formErrors['faqs']}</span>}
        {FAQs?.map((item, index) => (
          <FAQ key={index.toString()} faq={item} onStateChangeHandler={faqChange} removeFAQ={removeFAQ} index={index} formErrors={formErrors} />
        ))}
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add sale Temp' />
        </div>
      </form>
    </div>
  );
};

export default AddSaleTemp;
