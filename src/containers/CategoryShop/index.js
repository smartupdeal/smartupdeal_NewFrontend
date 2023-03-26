/**
 *
 * CategoryShop
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ProductList from '../../components/Store/ProductList';
import SaleTempList from '../../components/Store/SaleTempList'
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class CategoryShop extends React.PureComponent {

  componentDidMount() {


    const slug = this.props.match.params.slug;

    if (slug === 'saleTemp') {
      this.props.toggleList(true)
      this.props.fetchSaleTemps();
    } else if (slug === 'functions' || slug === 'industries' || slug === 'technology') {
      this.props.toggleList(true)
      this.props.fetchSaleTemps(slug);
    } else {
      this.props.toggleList(false)
      this.props.filterProducts('category', slug);
    }


  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      if (slug === 'saleTemp') {
        this.props.toggleList(true)
        this.props.fetchSaleTemps();
      } else {
        this.props.toggleList(false)
        this.props.filterProducts('category', slug);
      }

    }
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist, showSaleTempList, saleTemps } = this.props;

    return (
      <div className='category-shop'>

        {isLoading && <LoadingIndicator />}

        {showSaleTempList ? (<SaleTempList
          saleTemps={saleTemps}

        />) : products && products.length > 0 && (
          <ProductList
            products={products}
            authenticated={authenticated}
            updateWishlist={updateWishlist}
          />
        )}
        {!isLoading && !showSaleTempList && products && products.length <= 0 && (
          <NotFound message='no products found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
    showSaleTempList: state.saleTemp.showSaleList,
    saleTemps: state.saleTemp.saleTemps
  };
};

export default connect(mapStateToProps, actions)(CategoryShop);
