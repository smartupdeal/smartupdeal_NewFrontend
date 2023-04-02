import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { TbArrowsSort } from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";
// import { FIRESTORE_LINK } from '../../../constants'
import PlaceholerImage from "../../../assets/images/placeholder-image.png";

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import AddToWishList from '../AddToWishList';
import SideBar from '../../../containers/Sidebar';

const imagePerRow = 16;

const SaleTempList = props => {

  const { saleTemps, updateWishlist, authenticated } = props;
  const searchvalue = useSelector(state => state.navigation.searchValue);
  const [next, setNext] = useState(imagePerRow);
  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const [saleData, setSaleData] = useState([]);
  const [open,setOpen] = useState(false);

  useEffect(() => {
    setSaleData(saleTemps);
    // saleTemps.sort((a, b) => (a.connectSlot.price > b.connectSlot.price) ? 1 : -1)

  }, [saleTemps]);
  const [sortStatus, setSortStatus] = useState(true);

  const handleSort = () => {
    if (sortStatus) {
      let sorted = saleTemps.sort((a, b) => (a.connectSlot.price > b.connectSlot.price) ? 1 : -1)
      setSaleData(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = saleTemps.sort((a, b) => (b.connectSlot.price > a.connectSlot.price) ? 1 : -1)
      setSaleData(sorted);
      setSortStatus(!sortStatus);
    }
  }


  useEffect(() => {
    const results = !searchvalue
      ? saleTemps
      : saleTemps.filter((data) => {
        return data.name.toLowerCase().includes(searchvalue.toLowerCase());
      }
      );
    console.log("results", results);
    setSaleData(results);
  }, [searchvalue])

  return (
    <>
      <div className='sort-icon-div' >
        <div className='sort-icon' onClick={() => handleSort()}><TbArrowsSort /><span className='text'>Sort</span></div>
        <div className='filter-icon' onClick={() => setOpen(!open)}><IoFilterSharp /><span className='text1'>Filters</span></div>
      </div>
      <div className='product-list' >
        {saleData?.slice(0, next)?.map((temp, index) => {
          return <div className='product-container' key={temp._id}>
            <div className='item-box' >
              <div className='add-wishlist-box'>
                <AddToWishList
                  product={temp}
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </div>
              <div className='item-link'>
                <Link
                  to={`/saleTemp/${temp.slug}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='item-image'
                        // src={`${temp.imageUrls
                        //   ? `${FIRESTORE_LINK}/${temp.imageUrls[0]}`
                        //   : '/images/placeholder-image.png'
                        //   }`}
                        src={PlaceholerImage}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{temp.name}</h1>
                      <p className='item-desc mb-0'>{temp.description}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: '5%' }}>
                    {temp.totalReviews > 0 && (
                      <p className='mb-0' style={{ display: 'flex' }}>
                        <span className='fs-16 fw-1 mr-1'>
                          <ReactStars {...{
                            size: 30,
                            isHalf: true,
                            value: parseFloat(temp?.averageRating).toFixed(1),
                            edit: false
                          }}></ReactStars>
                        </span>
                        <span className=' fw-1 ml-1 mt-2' style={{ fontSize: '18px' }}>({parseFloat(temp?.averageRating).toFixed(1)})</span>
                        {/* <span
                        className={`fa fa-star ${temp.totalReviews !== 0 ? 'checked' : ''
                          } mt-2`}
                        style={{ color: '#ffb302',fontSize:'20px' }}
                      ></span> */}
                      </p>

                    )}
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                    <p className='price mb-0'>&#x20B9; {temp?.connectSlot?.price} </p>
                  </div>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                
                </div> */}
                </Link>
              </div>
            </div>
          </div>
        })}
        {next < saleData?.length && (
          <Button
            className="mt-4 load-more-button"

            onClick={handleMoreImage}
          >
            Load more
          </Button>
        )}
        <div
          className={open ? 'mini-menu-open' : 'hidden-mini-menu'}
          aria-hidden={`${open ? false : true}`}
        >
          <div className='mini-menu'>
            <SideBar openSidebar={open} closeSidebar={() => setOpen(!open)} />
          </div>
          <div
            className={
              open ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </>
  );
};
export default SaleTempList;
