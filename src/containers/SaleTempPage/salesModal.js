import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import actions from '../../actions';
import { connect } from 'react-redux';
import { FIRESTORE_LINK } from '../../constants';
import SocialShare from '../../components/Store/SocialShare';
import { BagIcon } from '../../components/Common/Icon';
import moment from 'moment';
import { calculateDuration, calculateTotalDuration } from '../../utils/calculateDuration';
class SalesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    this.props.fetchSaleTemps();
  }
  render() {
    const {
      account,
      saleTemp,
      itemsInCart,
      handleAddToCart,
      handleRemoveFromCart,

    } = this.props;
    console.log("itemsInCart----------------->", itemsInCart);
    // console.log("saleTemp-------12444---->", JSON.stringify(saleTemp.connectSlot));
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-box" >
        <ModalBody>
          <Row className='flex-row'>
            <Col className='imageSaleTempmodel col-md-6 col-sm-12 col-lg-6 col-12'>
              {saleTemp?.imageUrls?.length > 0 && (
                <Carousel dynamicHeight={false} showThumbs={false}>
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

            <Col className='paragraphCol'>
              <div className='product-container'>
                <div className='item-box'>
                  <div className='item-details'>
                    <h1 className='item-name one-line-ellipsis'>
                      {saleTemp.name}
                    </h1>
                    <hr />
                  </div>
                  <div className='my-4 item-share'>
                    <SocialShare product={saleTemp} />
                  </div>


                  <div style={{ justifyContent: 'space-between', marginLeft: '20%' }}>
                    {/* <Button
                      color="primary"
                    >
                      Add To Card
                    </Button> */}

                    <Button
                      style={{
                        padding: '3%',
                        width: '87%',
                        backgroundColor: 'blue'
                      }}

                    >Book Appointment</Button>

                  </div>

                </div>
              </div>
            </Col>




          </Row>

          <Row>
            <Col>
              <div style={{ padding: '10%' }} >
                <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                  <div className='product-container'>
                    <div className='item-box'>

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
                      <Row >
                        <Col className='connect-slot__speakers'>
                          <div className='connect-slot__speakers'>

                            <div>
                              <h4>
                                Speakers,  <img
                                  style={{ width: '14%', height: '0%' }}
                                  src={
                                    "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee7f704e50f4a220fab16905e2f9c2ea91503dca_full.jpg"
                                  }
                                  alt="Avatar"
                                  className="avatar"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = fallbackImage;
                                  }}
                                />
                               <h5 className="display-6 fs-2 font-weight-bold" style={{ marginLeft: '22%' }}>{`${account.firstName} ${account.lastName}`}</h5>
                              </h4>
                            </div>

                          

                          </div>
                        </Col>
                      </Row>

                    </div>
                  </div>
                </Col>

              </div>
            </Col>

          </Row>


          {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    account: state.account.user,
    saleTemp: state.saleTemp.saleTemp,
    saleTemps: state.saleTemp.saleTemps,
    itemsInCart: state.cart.itemsInCart

  };
};
export default connect(
  mapStateToProps,
  actions
)(SalesModal);