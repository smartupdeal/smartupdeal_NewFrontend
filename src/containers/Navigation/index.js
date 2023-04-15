/**
 *
 * Navigation
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link, NavLink as ActiveLink, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import pp from "../../assets/images/logo.png";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';
// import '../../styles/core/_navigation.scss'
class Navigation extends React.PureComponent {

  constructor(props) {
    super(props);
    this.toggle2 = this.toggle2.bind(this);
    this.onMouseEnter2 = this.onMouseEnter2.bind(this);
    this.onMouseLeave2 = this.onMouseLeave2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.onMouseEnter3 = this.onMouseEnter3.bind(this);
    this.onMouseLeave3 = this.onMouseLeave3.bind(this);
    this.state = {
      dropdownOpen2: false,
      dropdownOpen3: false
    };
  }
  componentDidMount() {
    this.props.fetchStoreBrands();
    this.props.fetchStoreCategories();
  }

  toggleBrand() {
    this.props.fetchStoreBrands();
    this.props.toggleBrand();
  }

  toggleCategory() {
    this.props.toggleCategory();
  }

  toggleMenu() {
    this.props.fetchStoreCategories();
    this.props.toggleMenu();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  toggle2() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

  toggle3() {
    this.setState(prevState => ({
      dropdownOpen3: !prevState.dropdownOpen3
    }));
  }


  onMouseEnter2() {
    this.setState({ dropdownOpen2: true });
  }

  onMouseLeave2() {
    this.setState({ dropdownOpen2: false });
  }


  onMouseEnter3() {
    this.setState({ dropdownOpen3: true });
  }

  onMouseLeave3() {
    this.setState({ dropdownOpen3: false });
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? 'react-autosuggest__suggestion-match'
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className='d-flex'>
          <img
            className='item-image'
            src={`${suggestion.imageUrl
              ? suggestion.imageUrl
              : '/images/placeholder-image.png'
              }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className='name'>{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='price'>${suggestion.price}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      signOut,
      brands,
      categories,
      isMenuOpen,
      isCartOpen,
      isCategoryOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      application,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const inputProps = {
      placeholder: 'Search Products',
      className: 'search-bar',
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      },
    };


    return (
      <header className='header fixed-mobile-header'>
        <div className='header-info main-header'>
          <label for="notify-1">
            <input id="notify-1" type="checkbox" />
            <div id="notification-bar">
              <div className="container">

                <i className="fa fa-phone"></i>
                <span> +91-8272000707</span>
                <i className='fa fa-envelope' />
                <span>info@smartupdeal.com</span>
                <i className="fa fa-times-circle" ></i>
              </div>
            </div>

          </label>
        </div>
        <Container fluid>
          <Row className='align-items-center top-header'>

            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 3, order: 1 }}
            >

              <div className='header-links1'>
                <Button
                  borderless
                  variant='empty'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                {/* <img className='logo-image' style={{ margin: '5%' }} src='/images/logo.png' /> */}
                <img className='logo-image' style={{ margin: '5%' }} src={pp} />


              </div>
            
            </Col>
            <Col
              xs={{ size: 20, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 5, order: 2 }}
              className='pt-2 pt-lg-0 w-25'
              style={{display:'flex',justifyContent:'space-between'}}
            >
                <Dropdown
                toggle={() => this.toggleCategory()}
                isOpen={isCategoryOpen}
                className="drop-down"
              >
                <DropdownToggle nav>
                 Categories<span className='fa fa-chevron-down dropdown-caret'></span>
                </DropdownToggle>
                <DropdownMenu className='nav-brand-dropdown'>
                  <DropdownItem style={{ cursor: 'pointer' }}>
                    Use-Cases
                  </DropdownItem>
                  <DropdownItem style={{ cursor: 'pointer' }}>
                    Smart Home Automation
                    <Dropdown direction="right" className="d-inline-block submenu" onMouseOver={this.onMouseEnter2} onMouseLeave={this.onMouseLeave2} isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                      <DropdownToggle nav>
                        <span className='fa fa-chevron-left dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu className='nav-brand-dropdown'>
                        <DropdownItem> Smart Office Automation</DropdownItem>
                        <DropdownItem> Smart Retail Automation</DropdownItem>
                        <DropdownItem> Smart Hotel Automation</DropdownItem>
                        <DropdownItem> Smart Building Automation</DropdownItem>
                        <DropdownItem> Smart Industrial Automation</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>
                  <DropdownItem style={{ cursor: 'pointer' }}>
                    Smart Class Automation
                    <Dropdown direction="right" className="d-inline-block submenu" onMouseOver={this.onMouseEnter3} onMouseLeave={this.onMouseLeave3} isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                      <DropdownToggle nav>
                        <span className='fa fa-chevron-left dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu className='nav-brand-dropdown'>
                        <DropdownItem> Smart Healthcare</DropdownItem>
                        <DropdownItem> Smart Cities</DropdownItem>
                        <DropdownItem> Asset Tracking</DropdownItem>
                        <DropdownItem> Remote Management</DropdownItem>
                        <DropdownItem> Energy Management</DropdownItem>
                        <DropdownItem> Process Management</DropdownItem>
                        <DropdownItem> Waste Management</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>
                  {categories.map(data => {
                    return <DropdownItem style={{ cursor: 'pointer' }} onClick={() => history.push(`shop/category/${data.slug}`)} value={data.name}>{data.name}</DropdownItem>
                  })}
                  {/* 
                   <SubMenu label="Smart Class Automation">
                     {smartAutomationArray.slice(0, showMore ? smartAutomationArray.length : 3).map((data, index) => {
                       return <MenuItem key={index}>{data}</MenuItem>
                     })}
                     <a style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '10px', marginRight: '10%' }} onClick={() => setShoMore(!showMore)}><span style={{ color: 'blue' }}>{showMore ? "Show Less" : "Show More"}</span></a>
                   </SubMenu> */}
                  {/* {categories.map((cate, index) => {
                     return <DropdownItem style={{ cursor: 'pointer' }} onClick={() => history.push(`shop/category/${cate.slug}`)} value={cate.name}>
                       {cate.name}
                       {Object.entries(application).map((app) => {
                         if (app[0] === cate.slug) {
                           return <Dropdown direction="right" className="d-inline-block submenu" onMouseOver={this.onMouseEnter2} onMouseLeave={this.onMouseLeave2} isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                             <DropdownToggle nav>
                               <span className='fa fa-chevron-left dropdown-caret'></span>
                             </DropdownToggle>
                             <DropdownMenu className='nav-brand-dropdown'>
                               {app[1].map(data => {
                                 return <DropdownItem>{data.name}</DropdownItem>
                               })}
                             </DropdownMenu>
                           </Dropdown>
 
                         }
                       })}
                     </DropdownItem>
                   })} */}


                </DropdownMenu>
              </Dropdown>
              <div className='navbar-size'>

                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}
                  onSuggestionSelected={(_, item) => {
                    c
                  }}
                />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 5, order: 3 }}
              className='desktop-hidden'
            >
              <div className='header-links'>
                <Button
                  borderless
                  variant='empty'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <img src="images/logo.png"></img>
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 4, order: 3 }}
              className='pt-2 pt-lg-0'
            >
              <Navbar color='light' light expand='md' className='mt-md-0'>
                <CartIcon
                  className='d-none d-md-block'
                  cartItems={cartItems}
                  onClick={toggleCart}
                />
                <Nav navbar>
                  {brands && brands.length > 0 && (
                    <Dropdown
                      nav
                      inNavbar
                      toggle={() => this.toggleBrand()}
                      isOpen={isBrandOpen}
                    >
                      <DropdownToggle nav>
                        Brands
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right className='nav-brand-dropdown'>
                        <div className='mini-brand'>
                          <MiniBrand
                            brands={brands}
                            toggleBrand={() => this.toggleBrand()}
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/shop'
                      activeClassName='active'
                    >
                      Shop
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {user.firstName ? user.firstName : 'Welcome'}
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push('/dashboard/account')}
                        >
                          Dashboard
                        </DropdownItem>
                        <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        <i className="fa fa-user"></i>
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => history.push('/login')}>
                          Login
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/register')}>
                          Sign Up
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* <Container>
                  <div >
                  <hr style={{ "width": "120%" }} />
                  <Container style={{ "width": "120%" }}>
                  <Row style={{ width : "200%", height: "200%"}}>
                      <Col md='1' className='text-center d-none d-md-block '>
                        <i className="fa fa-envelope icon-color"></i>
                        <Row style={{ "textAlign" : "center" }}><b>All</b></Row>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block '>
                        <i className="fa fa-file icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-tag icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-book icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-globe icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-compass icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-pencil icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-copy icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-table icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-building icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-address-card icon-color"></i>
                      </Col>
                      <Col md='1' className='text-center d-none d-md-block'>
                        <i className="fa fa-camera icon-color"></i>
                      </Col>
                    </Row>
                  </Container>
                </div>
          </Container> */}

        {/* hidden cart drawer */}
        <div
          className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className='mini-cart'>
            <Cart />
          </div>
          <div
            className={
              isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
          aria-hidden={`${isMenuOpen ? false : true}`}
        >
          <div className='mini-menu'>
            <Menu />
          </div>
          <div
            className={
              isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={toggleMenu}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    isCategoryOpen: state.navigation.isCategoryOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    categories: state.category.storeCategories,
    application: state.application,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));