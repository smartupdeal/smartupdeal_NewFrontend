import React from 'react';
import { Link } from 'react-router-dom';
import {FIRESTORE_LINK} from '../../../constants'
const SaleTempList=(props)=> {
    const {saleTemps}=props
    return (
        <div className='p-list'>
        {saleTemps.map((saleTemp, index) => (
          <Link
            to={`/dashboard/salesPitch/edit/${saleTemp._id}`}
            key={index}
            className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
          >
            <div  className='image-box' >
            <img
          className='item-image'
          src={`${
            saleTemp && saleTemp?.imageUrls
              ? `${FIRESTORE_LINK}/${saleTemp?.imageUrls[0]}`
              : 
              '/images/placeholder-image.png'
          }`}
        />
            </div>
            <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
              <h4 className='text-truncate'>{saleTemp.name}</h4>
              <p className='mb-2 text-truncate'>{saleTemp.description}</p>
            </div>
          </Link>
        ))}
      </div>
    );
}
export default SaleTempList;