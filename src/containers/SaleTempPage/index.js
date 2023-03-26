import React from 'react';
import { connect } from 'react-redux';
import SalesModal from './salesModal';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import actions from '../../actions';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SocialShare from '../../components/Store/SocialShare';
import { FIRESTORE_LINK } from '../../constants';
import Button from '../../components/Common/Button';
import ProductReviews from '../../components/Store/ProductReviews';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';
import CollapseComp from '../../components/Common/Collapse';
import PackProduct from './PackProduct';
import ProductImg from './ProductImg'
import { PlusIcon, MinusIcon, ConnectIcon, BagIcon } from '../../components/Common/Icon';
import moment from 'moment';
import { calculateDuration, calculateTotalDuration } from '../../utils/calculateDuration';
import { calculatePrice, getDefaultSize } from '../../utils/calculatePrice';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AddToWishList from '../../components/Store/AddToWishList';
import Checkbox from '../../components/Common/Checkbox';
import CountDownTimer from './CountDownTimer';
// import basic from '../../../public/images/mountain-bike.png'
// import firstExpertsimages from '../../../public/images/Expert.png';
// import secondExpertsimages from '../../../public/images/Experts.png'
import { GOOGLE_CLOUD_BUCKET_URL, BASE_API_URL } from "../../constants";
const hoursMinSecs = { hours: 1, minutes: 20, seconds: 40 }

class SaleTempPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modals: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchSaleTemps();
    this.props.fetchSaleTempBySlug(slug);
    this.props.fetchSaleTempReviews(slug);
    this.props.setSaleTempFAQs(this.props?.saleTemp?.faqs);
    document.body.classList.add('product-page');
  }
  componentDidUpdate(prevProps) {
    if (this.props?.saleTemp !== prevProps.saleTemp) {
      this.props.setSaleTempFAQs(this.props?.saleTemp?.faqs);
      this.props.setSaleTempPackages(this.props?.saleTemp.packages);
    }

    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchSaleTempBySlug(slug);
    }
  }
  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  receiveChildValue = (type, productKey, quantity, product_id) => {

    let temp = this.props?.mappedSaleTempPackages;
    if (temp?.[productKey]?.[type]) {
      temp[productKey][type] = temp?.[productKey]?.[type].map(object => {
        if (object.id === product_id) {
          return { ...object, value: quantity };
        }
        return object;
      });
      this.props.setSaleTempPackages(temp);
      temp?.[productKey]?.['optionalProducts'].map((object, index) => {
        this.props.selectOptionalProduct(productKey, index, object.selected);
        return object;
      });


    }

  };


  render() {
    const {
      isLoading,
      saleTemp,
      account,
      addSaleTempReview,
      reviews,
      reviewsSummary,
      reviewFormData,
      reviewFormErrors,
      reviewChange,
      toggleFAQ,
      saleTempFAQs,
      mappedSaleTempPackages,
      togglePackages,
      selectOptionalProduct,
      history
    } = this.props;
    const {
      totalRatings, totalReviews
    } = reviewsSummary;
    const averageRating =
      totalRatings > 0 && Math.round(totalRatings / totalReviews);
    return (
      <>

        <div className='product-shop'>
          {isLoading ? (
            <LoadingIndicator />

          ) : (
            <>
              <Row className='flex-row'>
                <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                  <div className='product-logo'>
                    <h1>{saleTemp.name}</h1>
                    <p >{saleTemp.description}</p>

                    <img className='logo-image' src='/images/logo.png' />
                    {averageRating && (
                      <div className='d-flex flex-wrap align-items-center mt-2'>
                        <ReactStars
                          classNames='mr-2'
                          size={17}
                          edit={false}
                          color={'#adb5bd'}
                          activeColor={'#ffb302'}
                          a11y={true}
                          isHalf={true}
                          emptyIcon={<i className='fa fa-star' />}
                          halfIcon={<i className='fa fa-star-half-alt' />}
                          filledIcon={<i className='fa fa-star' />}
                          value={averageRating}
                        />
                      </div>
                    )}
                    <div>
                      <h4>
                        Experts,  <img
                          style={{ width: '6%', height: '0%' }}
                          src={
                            "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee7f704e50f4a220fab16905e2f9c2ea91503dca_full.jpg"
                          }
                          alt="Avatar"
                          className="avatar"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            // currentTarget.src = fallbackImage;
                            currentTarget.src = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee7f704e50f4a220fab16905e2f9c2ea91503dca_full.jpg";
                          }}
                        />
                        <h5 className="display-6 fs-2 font-weight-bold" style={{ marginLeft: '6%' }}>{`${account.firstName} ${account.lastName}`}</h5>

                      </h4>


                      <div className='my-4 item-share socialMedia-icon'>
                        <SocialShare product={saleTemp} />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                  {saleTemp?.imageUrls?.length > 0 && (
                    <Carousel dynamicHeight={false}>
                      {saleTemp?.imageUrls.map(e => (
                        <div key={e} className='image_container'>
                          <img src={`${e ? `${FIRESTORE_LINK}/${e}` : '/images/placeholder-image.png'}`} />
                          {/* <div className="lens"></div>
                       <div className="result"></div> */}
                        </div>
                      ))}
                    </Carousel>
                  )}
                </Col>
              </Row>





              {/* <Row className='flex-row'>
                <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                  {saleTemp?.imageUrls?.length > 0 && (
                    <Carousel dynamicHeight={false}>
                      {saleTemp?.imageUrls.map(e => (
                        <div key={e} style={{ marginTop: '10%' }}>
                          <img className='image_size' src={`${e ? `${FIRESTORE_LINK}/${e}` : '/images/placeholder-image.png'}`} />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </Col>
                <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                  <div className='product-container'>
                    <div className='item-box'>
                      <div className='item-details'>
                        <h1 className='item-name one-line-ellipsis'>{saleTemp.name}</h1>
                        <hr />
                        <p className='item-desc'>{saleTemp.description}</p>
                      </div>
                      <Row>
                        <Col>
                          <div>
                            <h4>Frequency</h4>
                            <p>{saleTemp?.connectSlot?.frequency}</p>

                          </div>
                        </Col>
                        <Col>
                          <div>
                            <h4>Price</h4>
                            <p className='price'>{saleTemp?.connectSlot?.price} &#x20B9;</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs='12'>
                          <h4>Available Slot</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs='4'>
                          <h4>Day</h4>
                        </Col>
                        <Col xs='4'>
                          <h4>Duration</h4>
                        </Col>
                        <Col xs='4'>
                          <h4>Timing</h4>
                        </Col>
                      </Row>
                      {saleTemp?.connectSlot?.sessions.map((session, index) => (
                        <Row key={index}>
                          <Col xs='4'>
                            <div>
                              {session?.date && <p>{moment(session?.date).format('MMM Do')} {moment(session?.date).format('dddd').substring(0, 3)} </p>}
                            </div>
                            <div>
                              {session?.weekDays &&
                                session?.weekDays.map((item, index) => (
                                  <div key={index.toString()}>
                                    <p>{item}</p>
                                  </div>
                                ))}
                            </div>
                          </Col>
                          <Col>
                            {calculateDuration(session?.start, session?.end).totalDuration} minutes
                          </Col>
                          <Col >
                            <div>
                              <p>
                                {moment(session?.start)
                                  .format('hh:mm a')
                                  .toUpperCase()}{' '}
                                <span> - </span>
                                {moment(session?.end)
                                  .format('hh:mm a')
                                  .toUpperCase()}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      ))}
                      <div className='my-4 item-share'>
                        <SocialShare product={saleTemp} />
                      </div>
                      <Row>
                        <Col xs='12' lg='6' className='connect-slot__speakers'>
                          <Button variant='primary' text="Let's Connect" className='bag-btn' icon={<ConnectIcon />} />
                        </Col>
                        <Col xs='12' lg='6' className='connect-slot__speakers'>
                          <div className='connect-slot__speakers'>
                            <h4>Speakers :</h4>
                            {saleTemp?.connectSlot?.speakers.map(e => (
                              <div key={e.id} className='connect-slot_speakers-item'>
                                <div>
                                  <p>{e.firstName?.charAt(0)?.toUpperCase()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* heighLights  additional info*/}
              <Row className='flex-row'>
                {/* <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                  <div className='highLight-wrapper'>
                    <div className='highLight-header'>
                      <h3>
                        Connect 
                      </h3>
                    </div>
                    <CarouselSlider
                      swipeable={true}
                      showDots={false}
                      infinite={true}
                      autoPlay={true}
                      slides={saleTemp?.highLights}
                      responsive={responsiveOneItemCarousel}
                    >
                      {saleTemp?.highLights?.map((item, index) => (
                        <div className='highLight-box' key={index.toString()}>
                          <div className='highLight-box-content'>
                            <h4>{item.text}</h4>
                          </div>
                        </div>
                      ))}
                    </CarouselSlider>
                  </div>
                </Col> */}
                {/* <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                  <div className='additional-info'>
                    <div className='additional-info__header'>
                      <p>
                        Additional <span>Info</span>
                      </p>
                    </div>
                    <div className='additional-info__content'>
                      <div>
                        <i className='fa fa-wifi' aria-hidden='true' />
                        <p>
                          {calculateTotalDuration(saleTemp?.connectSlot?.sessions)} minutes
                        </p>
                      </div>
                      <div>
                        <i className='fa fa-address-card-o' aria-hidden='true' />
                        <p>In depth industrial Data,Product Demo</p>
                      </div>
                      <div>
                        
                        <i className='fa fa-signal' />
                        <p> Q & A section </p>
                      </div>
                      <div>
                        
                        <i className='fa fa-mobile' aria-hidden="true" />
                        <p> Access on Mobile & Desktop </p>
                      </div>
                    </div>
                  </div>
                </Col> */}
              </Row>
              {/* packages */}
              <Row className='flex-row review-bar'>
                <Col xs="2" className='alignData'>
                  <div className='pack_product_data'>
                    <h2>
                      <span className={`fa fa-star checked start-review`} style={{ color: '#ffb302' }} >
                        <h4>4.8/5</h4>
                      </span>
                    </h2>
                    <span>
                      92,836 ratings
                      <br />
                      1,241,474 already enrolled
                    </span>
                  </div>
                </Col>
                <p className='center-row'>|</p>
                <Col xs="2" >
                  <div className='gerenty-value'>
                    <h2>6 Months</h2>
                    <p>Under 10 hours of study a week</p>
                  </div>
                </Col>
                <p className='center-row'>|</p>
                <Col xs="2">
                  <div className='language-col'>
                    <h2>English</h2>
                    <p>Subtitles: English</p>
                  </div>
                </Col>
                <p className='center-row'>|</p>
                <Col xs="2">
                  <div className='level-col'>
                    <h2>Beginner Level</h2>
                    <p>No prior experience required.</p>
                  </div>
                </Col>
                <p className='center-row'>|</p>
                <Col xs="2" className='alignData'>
                  <div className='pack_product_data'>
                    <h2>
                      <h4>100% Self-Paced</h4>
                    </h2>
                    <span>
                      Learn on your own time
                    </span>
                  </div>
                  {/* <div className='time-col'></div>
                  <h2>100% Self-Paced</h2>
                  <p>Learn on your own time</p> */}
                </Col>
              </Row>
              <Row className='flex-row'>
                <Col className='highlight-col col-md-6 col-sm-12 col-lg-6 col-12'>
                  <h1 className='hightlight'>Highlights:</h1>

                  <Row>

                    <Col xs='11' >
                      {saleTemp?.highLights?.map((item, index) => (
                        <div key={index.toString()}>
                          <div style={{ display: 'flex', alignItems: 'center' }} >
                            <i className="fa fa-check icon-check-class" style={{ marginLeft: '5%' }}></i>
                            <h4 style={{ marginLeft: '2%' }}>{item.text}</h4>

                          </div>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Col>
                <Col className='specification-col col-md-6 col-sm-12 col-lg-6 col-12'>
                  <h1 className='specification'>Specification:</h1>
                  <Row>
                    <Col xs='4'>
                      <h4>Screen Size:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4>21.5 inches</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='4'>
                      <h4>Display Resolution:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4>1920 * 1080 Pixels</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='4'>
                      <h4>Maximum:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4></h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='4'>
                      <h4>Brand:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4>Acer</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='4'>
                      <h4>Special Feature:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4>Blue Light Filter,Wall Mountable</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs='4'>
                      <h4>Refresh Rate:</h4>
                    </Col>
                    <Col xs='8'>
                      <h4>75 Hz</h4>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className='flex-row'>
                <Col className='imageSaleTempCol col-md-6 col-sm-12 col-lg-6 col-12'>
                  {/* <img className='imageSaleTemp' src={'/images/common/page404.png'} /> */}
                </Col>
                <Col className='paragraphCol'>
                  <h1>Detailed Analysis for Energy Usage</h1>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, ex.</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro harum fuga itaque nam cupiditate velit, nostrum, non molestiae provident veritatis nisi veniam, magni doloribus? Sint.</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro harum fuga itaque nam cupiditate velit, nostrum, non molestiae provident veritatis nisi veniam, magni doloribus? Sint.</p>
                </Col>

              </Row>
              <Row className='flex-row'>

                <Col className='paragraphCol2'>
                  <h1>Scheduling of events</h1>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, ex.</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro harum fuga itaque nam cupiditate velit, nostrum, non molestiae provident veritatis nisi veniam, magni doloribus? Sint.</p>
                </Col>
                <Col className='imageSaleTempCol2 col-md-6 col-sm-12 col-lg-6 col-12'>
                  {/* <img className='imageSaleTemp' src={'/images/common/page404.png'} /> */}
                </Col>
              </Row>
              {/* 
              <Row className='flex-row'>
                <Col xs='12' md='12' lg='12' className='mb-3 px-3 px-md-2'>
                  <div>

                    <div style={{ backgroundColor: 'white', boxShadow: 'box-shadow-primary', borderRadius: 'border-radius-default', padding: '20px' }}>
                      <h2>All Packages:</h2>
                      <div style={{ display: 'flex' }}>

                      </div>

                    </div>
                  </div>
                </Col>
              </Row> */}




              <Row className='flex-row'>
                <Col style={{ display: 'flex' }}>
                  <div>
                    <div style={{ backgroundColor: 'white', boxShadow: 'box-shadow-primary', borderRadius: 'border-radius-default', padding: '20px' }}>
                      <h2>All Packages:</h2>
                      <div style={{ display: 'flex' }}>
                        {mappedSaleTempPackages?.map((packItem, mIndex) => (
                          <div key={mIndex.toString()} >
                            <div style={{ display: 'flex' }}>
                              <Card
                                style={{
                                  width: '12rem',
                                  marginRight: '20px',
                                }}
                              // className={`fa fa-chevron-right  ${packItem.isOpen ? 'dropDown_arrow' : null} `}
                              >
                                <div class="cards">
                                  <div class="card">
                                    <input type="checkbox" onClick={() => togglePackages(mIndex)} checked={packItem.isOpen ? true : false} style={{ position: 'absolute', top: '.5em', left: '.5em' }} />
                                  </div>
                                </div>
                                {/*  style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '105px', padding: '20px', height: '160px', width: '164px' }} */}
                                {/* <img src={basic} style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '105px', padding: '20px', height: '160px', width: '164px' }} /> */}
                                <CardBody>
                                  <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                    style={{ textAlign: 'center' }}
                                  >
                                    {packItem.packTitle}
                                  </CardSubtitle>
                                  {packItem.highLight}

                                </CardBody>
                              </Card>

                              {/* <span className={`fa fa-chevron-right  ${packItem.isOpen ? 'dropDown_arrow' : null} `} />
                            {packItem.packTitle} <span className='pack_product__highlight'>{packItem.highLight}</span> */}
                            </div>
                            <div>

                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='flex-row'>
                <Col xs='12' md='12' lg='12' className='mb-3 px-3 px-md-2'>
                  <div>
                    <div className='package_container'>
                      {/* <h2>Packages:</h2> */}
                      <div style={{ width: '100%' }}>
                        {mappedSaleTempPackages?.map((packItem, mIndex) => (
                          <div className='pack_product__wrapper' key={mIndex.toString()} style={{ display: packItem.isOpen ? "block" : "none" }}>

                            <div>
                              <CollapseComp isOpen={packItem.isOpen}>
                                <h4>Description:</h4>
                                <p>{packItem?.description}</p>
                                <h4>Products:</h4>
                                <button style={{ backgroundColor: 'white', color: 'white', marginLeft: '30px', padding: '15px 30px', textAlign: 'center' }}  >
                      view details
                    </button>
                                <Row className='pack_product_wrapper'>
                                  <Col xs='12' lg="6">
                                    <Row >
                                      {packItem?.noneOptionalProducts.map((item, index) => (
                                        <Col xs="6" lg="4" key={index.toString()}>
                                          {/* <div className=''>
                                        <img src={`${item?.imageUrl ? item?.imageUrl : '/images/placeholder-image.png'}`} />
                                      </div> */}
                                          <ProductImg
                                            key={item._id + mIndex}
                                            product={item}
                                            defaultSize={getDefaultSize(packItem?.noneOptionalProductsDefaultQuantity, item._id, item.quantity)}
                                            optional={false}
                                            mappedPackIndex={mIndex}
                                            opIndex={index}
                                            selectOptionalProduct={selectOptionalProduct}
                                            history={history}
                                            type={"noneOptionalProductsDefaultQuantity"}
                                            productKey={0}
                                            getDefaultvaluesFormProdcutImg={this.receiveChildValue}
                                          />
                                        </Col>
                                      ))}
                                      {packItem?.optionalProducts.map((item, index) => (
                                        <>
                                          {item.selected && (
                                            <>
                                              {/* <div className='plus_icon'>
                                            <PlusIcon />
                                          </div> */}
                                              <Col xs="6" lg="4" key={index.toString()}>
                                                <ProductImg
                                                  key={item._id + mIndex}
                                                  product={item}
                                                  defaultSize={getDefaultSize(packItem?.optionalProductsDefaultQuantity, item._id, item.quantity)}
                                                  optional={true}
                                                  mappedPackIndex={mIndex}
                                                  opIndex={index}
                                                  selectOptionalProduct={selectOptionalProduct}
                                                  history={history}
                                                  type={"optionalProductsDefaultQuantity"}
                                                  productKey={0}
                                                  getDefaultvaluesFormProdcutImg={this.receiveChildValue}
                                                />
                                              </Col>
                                            </>
                                          )}
                                        </>
                                      ))}
                                    </Row>
                                    {/* <Row>
                                </Row> */}
                                  </Col>
                                  <Col x="12" lg="6">
                                    {packItem?.noneOptionalProducts.map((item, index) => (
                                      <Row key={index.toString()}>
                                        <PackProduct
                                          key={item._id + mIndex}
                                          product={item}
                                          optional={false}
                                          mappedPackIndex={mIndex}
                                          opIndex={index}
                                          selectOptionalProduct={selectOptionalProduct}
                                          history={history}
                                          defaultSize={getDefaultSize(packItem?.noneOptionalProductsDefaultQuantity, item._id, item.quantity)}
                                        />
                                      </Row>
                                    ))}
                                    {packItem?.optionalProducts.map((item, index) => (
                                      <Row key={index.toString()}>
                                        <PackProduct
                                          key={item._id + mIndex}
                                          product={item}
                                          optional={true}
                                          mappedPackIndex={mIndex}
                                          opIndex={index}
                                          selectOptionalProduct={selectOptionalProduct}
                                          history={history}
                                          defaultSize={getDefaultSize(packItem?.optionalProductsDefaultQuantity, item._id, item.quantity)}
                                        />
                                      </Row>
                                    ))}
                                  </Col>
                                </Row>
                                <Row className='pack_product_add_to_cart'>
                                  <div className='pack_product_add_to_cart--price'>
                                    <p>{calculatePrice(
                                      packItem?.noneOptionalProducts,
                                      packItem?.optionalProducts,
                                      packItem?.noneOptionalProductsDefaultQuantity,
                                      packItem?.optionalProductsDefaultQuantity
                                    )} &#x20B9;</p>
                                  </div>
                                  <Button
                                    variant='primary'
                                    // disabled={
                                    //   product.quantity <= 0 && !shopFormErrors['quantity']
                                    // }
                                    text='Add To List'
                                    className='bag-btn'
                                    icon={<BagIcon />}
                                  // onClick={() => handleAddToCart(product)}
                                  />
                                </Row>
                              </CollapseComp>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs='12' md='12' lg='12' className='mb-3 px-3 px-md-2'>
                  <div style={{ textAlign: 'center', backgroundColor: '#20afa5', height: '100%', padding: '20px' }}>
                    <div style={{ color: 'white', fontSize: '25px' }}>
                      Get Appointment
                    </div>
                    <div style={{ color: 'white' }}>
                      Still have Question ? Let's connect
                    </div>
                    <div className="App" style={{ padding: '20px' }}>
                      <CountDownTimer hoursMinSecs={hoursMinSecs.hours} />
                    </div>
                    <button style={{ backgroundColor: 'white', color: 'white', marginLeft: '30px', padding: '15px 30px', textAlign: 'center' }} onClick={this.toggle} >
                      view details
                    </button>
                  </div>
                </Col>
              </Row>
              {/*FAQs */}

              <Row>
                <div className='product-container' style={{ width: '100%' }}>
                  <h2>Frequently Asked Question</h2>
                  {saleTempFAQs?.map((item, index) => (
                    <div className='faq' key={index.toString()}>
                      <h3 className='q' onClick={() => toggleFAQ(index)}>
                        Q : {item?.Q}?
                      </h3>
                      <CollapseComp isOpen={item?.isOpen}>
                        <p> A : {item?.A}</p>
                      </CollapseComp>
                    </div>
                  ))}
                </div>
              </Row>
              <ProductReviews
                reviewFormData={reviewFormData}
                reviewFormErrors={reviewFormErrors}
                reviews={reviews}
                reviewsSummary={reviewsSummary}
                reviewChange={reviewChange}
                addReview={addSaleTempReview}
              />
              <Row className='flex-row'>
                <Col xs='12' md='12' lg='12' className='mb-3 px-3 px-md-2'>
                  <div>
                    <div className='flex-row product-list' style={{ backgroundColor: 'white', boxShadow: 'box-shadow-primary', borderRadius: 'border-radius-default', height: '10%' }}>
                      <h2 style={{ padding: '32px', marginLeft: '6px' }}>Related Packages</h2>

                    </div>
                    <div className='flex-row product-list' style={{ backgroundColor: 'white', boxShadow: 'box-shadow-primary', borderRadius: 'border-radius-default', height: '10%' }}>
                      {this.props.saleTemps.map((temp, index) => {
                        return index <= 3 && <div className='product-container' key={temp._id}>
                          <div className='item-box'  >
                            <div className='item-link'>
                              <Link
                                to={`/saleTemp/${temp.slug}`}
                                className='d-flex flex-column h-100'
                              >
                                <div className='item-image-container'>
                                  <div className='item-image-box'>
                                    <img
                                      className='item-image'
                                      src={`${temp.imageUrls
                                        ? `${FIRESTORE_LINK}/${temp.imageUrls[0]}`
                                        : '/images/placeholder-image.png'
                                        }`}
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
                                  <div className='price mb-0'>{temp?.connectSlot?.price} &#x20B9;
                                  </div>

                                  <p> <AddToWishList
                                    product={temp}
                                    updateWishlist={this.props.updateWishlist}
                                    authenticated={this.props.authenticated}
                                  /></p>
                                </div>
                                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                
                </div> */}
                              </Link>
                            </div>
                          </div>
                        </div>
                      })}


                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
          <SalesModal modal={this.state.modal} toggle={this.toggle} />
          
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    saleTemp: state.saleTemp.saleTemp,
    account: state.account.user,
    saleTemps: state.saleTemp.saleTemps,
    isLoading: state.saleTemp.isLoading,
    saleTempFAQs: state.saleTemp.saleTempFAQs,
    reviews: state.review.saleTempReviews,
    reviewsSummary: state.review.reviewsSummary,
    highLights: state.saleTemp.highLights,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    mappedSaleTempPackages: state.saleTemp.mappedSaleTempPackages
  };
};
export default connect(
  mapStateToProps,
  actions
)(SaleTempPage);