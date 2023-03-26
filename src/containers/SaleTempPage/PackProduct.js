import React from 'react';
import { FIRESTORE_LINK } from '../../constants';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import { PlusIcon, MinusIcon } from '../../components/Common/Icon';
import { getProductRating } from '../SalesPitch/actions';
function PackProduct(props) {
  const { product, optional, mappedPackIndex, opIndex, selectOptionalProduct, history, defaultSize } = props;
  const [quantity, setQuantity] = React.useState(1);
  const [checkBoxValue, setCheckBoxValue] = React.useState(false);
  const [averageRating, setAverageRating] = React.useState();
  React.useEffect(
    () => {
      
      const getAverageRating = async () => {
        const average = await getProductRating(product.slug);
        setAverageRating(average);
      };
      if (product) {
        getAverageRating();
      }
    },
    [product.slug]
  );
  const navigateToProduct = () => {
    event.preventDefault();
    history.push(`/product/${product.slug}`)
  }
  return (
    < div className="product_name_wrapper">
      {optional && !product?.selected&&(
        <Col xs="1" lg="1">
          <Button variant='secondary' className="list_plus_button" icon={<PlusIcon color="#2962ff"/>} onClick={() => selectOptionalProduct(mappedPackIndex, opIndex, true)} />
        </Col>
      )}
        {optional && product?.selected&&(
        <Col xs="1" lg="1">
           <Checkbox
            label=''
            name={product._id + mappedPackIndex}
            id={product._id + mappedPackIndex}
            checked={product.selected}
            value={checkBoxValue}
            disabled
            toggleCheckboxChange={(name, value) => {
              selectOptionalProduct(mappedPackIndex, opIndex, value);
            }}/>

        </Col>
      )}
      {!optional && (
        <Col xs="1" lg="1">
          <Checkbox
            label=''
            name={product._id + mappedPackIndex}
            id={product._id + mappedPackIndex}
            checked={true}
            disabled={true}
          />
        </Col>
      )}
      <Col xs="9">
        <p>{product.name}  <span className='pack_product_price'>{(defaultSize > 0 )? product.price*defaultSize : 0 }&#x20B9;</span></p>
      </Col>
      {/* <div className='pack_product_quantity'>
        <Button variant='secondary' icon={<MinusIcon />} onClick={() => quantity > 1 && setQuantity(quantity - 1)} />
        <div className='pack_product_price'>{quantity}</div>
        <Button variant='secondary' icon={<PlusIcon />} onClick={() => setQuantity(quantity + 1)} />
      </div> */}
    </div>
  );
}
export default PackProduct;
