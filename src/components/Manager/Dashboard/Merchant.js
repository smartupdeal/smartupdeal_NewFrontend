/*
 *
 * Customer
 *
 */

import React from 'react';

import { Routes , Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Product from '../../../containers/Product';
import Brand from '../../../containers/Brand';
import Order from '../../../containers/Order';
import Wishlist from '../../../containers/WishList';
import Support from '../../../containers/Support';
import SalesPitch from '../../../containers/SalesPitch';

const Customer = props => {
  return (
    <div className='merchant'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Routes >
              <Route exact path='/dashboard/account' component={Account} />
              <Route path='/dashboard/security' component={AccountSecurity} />
              <Route path='/dashboard/address' component={Address} />
              <Route path='/dashboard/product' component={Product} />
              <Route path='/dashboard/brand' component={Brand} />
              <Route path='/dashboard/orders' component={Order} />
              <Route path='/dashboard/wishlist' component={Wishlist} />
              <Route path='/dashboard/support' component={Support} />
              <Route path='/dashboard/salesPitch' component={SalesPitch} />
              <Route path='*' component={Page404} />
            </Routes >
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
