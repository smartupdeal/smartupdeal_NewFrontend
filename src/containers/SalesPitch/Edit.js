/*
 *
 * Edit
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import EditSaleTemp from '../../components/Manager/SaleTemp/EditSaleTemp';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetTemp();
    const tempId = this.props.match.params.id;
    this.props.fetchSaleTemp(tempId);
    this.props.fetchProducts();
    this.props.getUsersList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetTemp();
      const tempId = this.props.match.params.id;
      this.props.fetchSaleTemp(tempId);
      this.props.fetchProducts();
    }
  }

  render() {
    const {
      history,
      user,
      saleTemp,
      formErrors,
      saleTempEditChange,
      updateSaleTemp,
      deleteSaleTemp,
      tempPackagesChange,
      connectSlotChange,
      connectSlotSessionChange,
      removePackage,
      highLightChange,
      removeHighLight,
      faqChange,
      removeFAQ,
      products,
      users,
      addPackage,
      tempPackages,
      addHighLight,
      addFAQ,
      industries,
      technologies,
      skills,
      categories
    } = this.props;

    return (
      <SubPage title='Edit Template' actionTitle='Cancel' handleAction={history.goBack}>
        {saleTemp?._id ? (
          <EditSaleTemp
            user={user}
            saleTemp={saleTemp}
            formErrors={formErrors}
            saleTempChange={saleTempEditChange}
            updateSaleTemp={updateSaleTemp}
            deleteSaleTemp={deleteSaleTemp}
            products={products}
            tempPackagesChange={tempPackagesChange}
            removePackage={removePackage}
            highLightChange={highLightChange}
            removeHighLight={removeHighLight}
            faqChange={faqChange}
            removeFAQ={removeFAQ}
            connectSlotChange={connectSlotChange}
            connectSlotSessionChange={connectSlotSessionChange}
            users={users}
            addPackage={addPackage}
            tempPackages={tempPackages}
            addHighLight={addHighLight}
            addFAQ={addFAQ}
            industries={industries}
            technologies={technologies}
            skills={skills}
            categories={categories}


          />
        ) : (
          <NotFound message='no product found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    saleTemp: state.saleTemp.saleTemp,
    formErrors: state.product.editFormErrors,
    products: state.product.products,
    users:state.users.users,
    tempPackages: state.saleTemp.tempPackages,
    skills: state.application.skills,
    technologies: state.application.technologies,
    industries: state.application.industries,
    categories: state.category.storeCategories,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Edit);
