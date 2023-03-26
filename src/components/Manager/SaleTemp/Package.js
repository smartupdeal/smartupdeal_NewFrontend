import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

import SelectOption from '../../Common/SelectOption';
const Package = props => {
  const {
    index,
    pack,
    onStateChangeHandler,
    selectedProduct,
    products,
    removePackage,
    edit,
    newEdit,
    saleTemp,
    formErrors
  } = props;
  const [opProductOptions, setOpProductOptions] = React.useState([]);
  const [nonOpProductOptions, setNonOpProductOptions] = React.useState([]);
  const [selectedNonOpProductValue, setSelectedNonOpProductValue] = React.useState([]);
  const [selectedOpProductValue, setSelectedOpProductValue] = React.useState([]);
 

  React.useEffect(
    () => {
      if (products && products?.length > 0) {
        const options = products
          .filter(e => !pack.noneOptionalProducts.includes(e._id))
          .map(e => {
            return {
              value: e._id,
              label: e.name,
            };
          });
        setOpProductOptions(options);
      }
      if (products && products?.length > 0) {
        const options = products
          .filter(e => !pack.optionalProducts.includes(e._id))
          .map(e => {
            return {
              value: e._id,
              label: e.name
            };
          });
        setNonOpProductOptions(options);
      }
    },
    [pack.optionalProducts, pack.noneOptionalProducts]
  );

  React.useEffect(
    () => {
      if (pack.optionalProducts.length > 0) {
        const options = products
          .filter(e => pack.optionalProducts.includes(e._id))
          .map(e => {
            return {
              value: e._id,
              label: e.name,
            };
          });
        setSelectedOpProductValue(options);
      } else {
        setSelectedOpProductValue([]);
      }
      if (pack.noneOptionalProducts.length > 0) {
        const options = products
          .filter(e => pack.noneOptionalProducts.includes(e._id))
          .map(e => {
            return {
              value: e._id,
              label: e.name,
            };
          });
        setSelectedNonOpProductValue(options);
      } else {
        setSelectedNonOpProductValue([]);
      }
    },
    [saleTemp?.packages[index], pack?.optionalProducts, pack.noneOptionalProducts,index]
  );

  const getProductsize = (quntityArr,selectedItem) => {
    
    if(quntityArr){
      let arr = quntityArr.filter( q => q.id === selectedItem.value);
      
      if(arr.length){
        return arr[0].value;
      }
      return 1;
    }
    return 1;
    //pack.noneOptionalProductsDefaultQuantity?.[i]?.value ?? 1
  }

  // 'packages.*.packTitle'
  return (
    <Row className={edit && !pack?.packAddEdit ? 'edit__wrapper' : null}>
      <Col xs='12' lg='6'>
        <Input
          type={'text'}
          label={'Package Title'}
          name='packTitle'
          error={formErrors && formErrors[`packages.${index}.packTitle`]}
          placeholder={'Package Title'}
          value={pack.packTitle}
          onInputChange={(name, value) => {
            onStateChangeHandler(name, value, index, edit, newEdit, pack);
          }}
        />
      </Col>
      <Col xs='12' lg='6'>
        <Input
          type={'text'}
          label={'Highlight'}
          name='highLight'
          placeholder={'Package Highlight'}
          error={formErrors && formErrors[`packages.${index}.highLight`]}
          value={pack.highLight}
          onInputChange={(name, value) => {
            onStateChangeHandler(name, value, index, edit, newEdit, pack);
          }}
        />
      </Col>
      <Col xs='12' lg='6'>
        <SelectOption
          // error={formErrors['taxable']}
          multi
          label={'Select Product (None Optional)'}
          name={'noneOptionalProducts'}
          options={nonOpProductOptions}
          value={selectedNonOpProductValue}
          handleSelectChange={value => {
            onStateChangeHandler('noneOptionalProducts', value, index, edit, newEdit, pack);
          }}
        />
        {formErrors && formErrors[`packages.${index}.noneOptionalProducts`] && (
          <span className='invalid-message'>{formErrors[`packages.${index}.noneOptionalProducts`]}</span>
        )}
        {selectedNonOpProductValue?.map((item, i) => (
          <Input  key={`item1-${i}`}
            type={'number'}
            error={formErrors && formErrors[`packages.${index}.noneOptionalProductsDefaultQuantity`]}
            min={1}
            label={'Select Default Size for '+item.label}
            name={selectedNonOpProductValue[i].value}
            placeholder={'Default Size'}
            value={ getProductsize(pack.noneOptionalProductsDefaultQuantity,item) }
            onInputChange={ (name , value) => {
              onStateChangeHandler('noneOptionalProductsDefaultQuantity', {'id':name,'value':value}, index, edit, newEdit, pack);
            }}
            { ...formErrors &&  formErrors[`packages.${index}.noneOptionalProductsDefaultQuantity`] }
          />
        ))}
      </Col>
      <Col xs='12' lg='6'>
        <SelectOption
          // error={formErrors['taxable']}
          multi
          label={'Select Product (Optional)'}
          name={'optionalProducts'}
          options={opProductOptions}
          value={selectedOpProductValue}
          handleSelectChange={value => {
            onStateChangeHandler('optionalProducts', value, index, edit, newEdit, pack);
          }}
        />
        {formErrors && formErrors[`packages.${index}.optionalProducts`] && (
          <span className='invalid-message'>{formErrors[`packages.${index}.optionalProducts`]}</span>
        )}
        {selectedOpProductValue?.map((item, i) => (
          <Input  key={`item2-${i}`}
            type={'number'}
            error={formErrors && formErrors[`packages.${index}.optionalProductsDefaultQuantity`]}
            min={1}
            label={'Select Default Size for '+item.label}
            name={selectedOpProductValue[i].value}
            placeholder={'Default Size'}
            value={ getProductsize(pack.optionalProductsDefaultQuantity,item) }
            onInputChange={ (name , value) => {
              onStateChangeHandler('optionalProductsDefaultQuantity', {'id':name,'value':value}, index, edit, newEdit, pack);
            }}
          />
        ))}

      </Col>
      <Col xs='12' md='12'>
        <Input
          type={'textarea'}
          error={formErrors && formErrors[`packages.${index}.description`]}
          label={'Description'}
          name={'description'}
          placeholder={'Package Description'}
          value={pack.description}
          onInputChange={(name, value) => {
            onStateChangeHandler(name, value, index, edit, newEdit, pack);
          }}
        />
      </Col>

      <Col xs='12' md='12'>
        <Button variant='danger' text='Delete' onClick={() => removePackage(index, edit)} />
      </Col>
    </Row>
  );
};

export default Package;
