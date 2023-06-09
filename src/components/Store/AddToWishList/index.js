/**
 *
 * AddToWishList
 *
 */

import React from 'react';

import { HeartIcon } from '../../Common/Icon';

class AddToWishList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { product, updateWishlist, authenticated } = this.props;


    return (
      <div className='add-to-wishlist'>
        {authenticated === true ? (
          <input
            type='checkbox'
            id={`checkbox_${product.sku}`}
            name={product._id}
            key={product.isActive}
            className='checkbox'
            onChange={e => updateWishlist(e)}
            defaultChecked={product.isLiked ? product.isLiked : false}
          />
        ) : (
          <input
            type='checkbox'
            id={`checkbox_${this.props.product.sku}`}
            name={product._id}
            className='disabled-checkbox'
            onChange={e => updateWishlist(e)}
            defaultChecked={product.isLiked ? product.isLiked : false}
          />
        )}
        <label htmlFor={`checkbox_${product.sku}`} type='submit'>
          <HeartIcon className='heart-svg' />
        </label>
      </div>
    );
  }
}

export default AddToWishList;
