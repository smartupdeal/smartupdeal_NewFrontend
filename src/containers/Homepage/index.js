/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import actions from '../../actions';
import banners from './banners.json';
import SideBar from '../Sidebar';
import CarouselSlider from '../../components/Common/CarouselSlider';
import SaleTempList from '../../components/Store/SaleTempList';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';

class Homepage extends React.PureComponent {

  componentDidMount() {
    this.props.fetchSaleTemps();
  }

  render() {
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                children={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => {
                  return <div key={index} style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center' }} >
                    <img key={index} src={item.imageUrl} style={{ height: '380px', width: '100%' }} />
                  </div>
                })}
              </CarouselSlider>
            </div>
          </Col>
          {/* <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-5.jpg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-6.jpg' />
            </div>
          </Col> */}
        </Row>
        
        <Row >
          <Col xs="3" className='sidebar' >
            <SideBar />
          </Col>
          <Col xs="col-sm-12 col-lg-9" style={{  height: 'auto', overflow: 'auto' }}>
            <SaleTempList saleTemps={this.props.saleTemps} updateWishlist={this.props.updateWishlist} authenticated={this.props.authenticated} />
            <Row className='flex-row' style={{ marginTop: '10%' }} >
              <Col className='order-lg-2 mb-3 px-3 px-md-2'>
                <Card
                  style={{
                    margin: 'auto',
                    width: '25rem',
                    border: 'none',
                    boxShadow: '0px 4px 16px rgb(43 52 69 / 10%)'
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h1" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                      <i className="fa fa-truck" aria-hidden="true" style={{ backgroundColor: '#f3f5f9', padding: '15px', color: '#4E97FD', borderRadius: '50%', fontSize: '50px' }}></i>
                      <div style={{ color: '#4E97FD', fontWeight: '600', paddingTop: '2%' }}>Smart Deals<div style={{ color: '#7D879C', fontSize: '18px' }}>Start From Rs.10</div></div>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
              <Col className='order-lg-2 mb-3 px-3 px-md-2'>
                <Card
                  style={{
                    margin: 'auto',
                    width: '25rem',
                    border: 'none',
                    boxShadow: '0px 4px 16px rgb(43 52 69 / 10%)'
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h1" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                      <i className="fa fa-calendar-check-o" aria-hidden="true" style={{ backgroundColor: '#f3f5f9', padding: '15px', color: '#4E97FD', borderRadius: '50%', fontSize: '50px' }}></i>
                      <div style={{ color: '#4E97FD', fontWeight: '600', paddingTop: '2%' }}>Approch <div style={{ color: '#7D879C', fontSize: '18px' }}>Secure System</div></div>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
              <Col className='order-lg-2 mb-3 px-3 px-md-2'>
                <Card
                  style={{
                    margin: 'auto',
                    width: '25rem',
                    order: 'none',
                    boxShadow: '0px 4px 16px rgb(43 52 69 / 10%)'
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h1" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                      <i className="fa fa-headphones" aria-hidden="true" style={{ backgroundColor: '#f3f5f9', padding: '15px', color: '#4E97FD', borderRadius: '50%', fontSize: '50px' }}></i>
                      <div style={{ color: '#4E97FD', fontWeight: '600', paddingTop: '2%' }}>Connects<div style={{ color: '#7D879C', fontSize: '18px' }}>24/7 daily</div></div>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    saleTemps: state.saleTemp.saleTemps
  };
};

export default connect(mapStateToProps, actions)(Homepage);
