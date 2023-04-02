/**
 *
 * Page404
 *
 */

import React from 'react';
import SearchBar from '../../../components/Common/SearchBar';
import page404img from '../../../assets/images/common/page404.png';

const Page404 = props => {
  return (
    <div className='page-404'>We're sorry,The page you requested could not be found. 
    <div><h>Please search something else</h> </div>
    <div><img  src={page404img} height={400} width={500}/></div>
    <h2>Search</h2>
    <SearchBar />
    </div>
  );
};

export default Page404;
