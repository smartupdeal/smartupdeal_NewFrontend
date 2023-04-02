import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import actions from '../../actions';
import { connect } from 'react-redux';
// import { FIRESTORE_LINK } from '../../constants';
import SocialShare from '../../components/Store/SocialShare';
import { BagIcon } from '../../components/Common/Icon';
class ProductModal extends React.Component {
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
       

      


          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
)(ProductModal);