import React from 'react';
import { FIRESTORE_LINK } from '../../constants';
import { Link } from 'react-router-dom';
import ProductModal from './productModal';
import { Row, Col } from 'reactstrap';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import { PlusIcon, MinusIcon } from '../../components/Common/Icon';
import { getProductRating } from '../SalesPitch/actions';
function ProductImg(props) {
  const { product, defaultSize, optional, mappedPackIndex, opIndex, selectOptionalProduct, history, type, productKey, getDefaultvaluesFormProdcutImg } = props;
  console.log("producat--------------> product", product);
  const [quantity, setQuantity] = React.useState(defaultSize);
  const [averageRating, setAverageRating] = React.useState();
  const [modal,setModal] = React.useState(false);
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
  const quantityUpdate = (quantity) => {
    if (quantity <= product.quantity) {
      setQuantity(quantity);
      getDefaultvaluesFormProdcutImg(type, productKey, quantity, product?._id);
    }

  };
  const navigateToProduct = () => {
    event.preventDefault();
    // history.push(`/product/${product.slug}`)
  }
  return (
    // <Col lg='2' sm='4' xs='6' >
    <div className={`pack_product ${optional ? 'greenBorder' : 'blueBorder'}`} onClick={() => setModal(true)}>
      <div className='pack_product_image'>
        <img src={`${product.imageUrl ? product.imageUrl : '/images/placeholder-image.png'}`} onClick={navigateToProduct} />
      </div>
      <div className='pack_product_data'>
        <div>
          {averageRating > 0 && (
            <p>
              <span className='fs-14 fw-1 mr-1'>{averageRating?.toFixed(1)}</span>
              <span className={`fa fa-star checked`} style={{ color: '#ffb302' }} />
              <h2>${product.price}</h2>
            </p>

          )}
        </div>
        <div>
        </div>
      </div>
      <div className='pack_product_quantity'>
        <Button variant='secondary' icon={<MinusIcon />} onClick={() => quantity > 1 && quantityUpdate(quantity - 1)} />
        <div className='pack_product_price'>{quantity}</div>
        <Button variant='secondary' icon={<PlusIcon />} onClick={() => quantityUpdate(quantity + 1)} />
      </div>
      <ProductModal modal={modal} toggle={() => setModal(false)} />
    </div>
    // </Col>
  );
}
export default ProductImg;