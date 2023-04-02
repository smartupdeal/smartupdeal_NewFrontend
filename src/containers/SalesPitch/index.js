import React from 'react'
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import Page404 from '../../components/Common/Page404';
import List from './List';
import Add from './Add';
import Edit from './Edit'

 class SalesPitch extends React.PureComponent {
  render() {
    return (
      <div className='salePitch-dashboard'>
        <Switch>
          <Route exact path='/dashboard/salesPitch' component={List} />
          <Route exact path='/dashboard/salesPitch/edit/:id' component={Edit} />
          {/* {user.role === 'ROLE_ADMIN' && ( */}
          <Route exact path='/dashboard/salesPitch/add' component={Add} />
          {/* )} */}
          <Route path='*' component={Page404} />
        </Switch>
      </div>
      )
    }






}


export default SalesPitch;