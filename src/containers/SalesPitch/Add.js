import React from 'react';
import AddSaleTemp from '../../components/Manager/SaleTemp/AddSaleTemp';
import SubPage from '../../components/Manager/SubPage';
import { connect } from 'react-redux';
import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Add extends React.PureComponent {
  componentDidUpdate() {}
  componentDidMount() {
     this.props.fetchProducts();
     this.props.getUsersList();
  }

  render() {
    const {
      history,
      user,
      users,
      saleTempFormData,
      formErrors,
      saleTempChange,
      tempPackagesChange,
      highLightChange,
      faqChange,
      removeFAQ,
      addSaleTemp,
      isLoading,
      addPackage,
      addHighLight,
      addFAQ,
      connectSlotChange,
      connectSlotSessionChange,
      connectSlot,
      FAQs,
      removePackage,
      tempPackages,
      highLights,
      products,
      removeHighLight,
      industries,
      technologies,
      skills,
      categories
    } = this.props;

    return (
      <SubPage title='Add Template' actionTitle='Cancel' handleAction={() => history.goBack()}>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : (
          <AddSaleTemp
            user={user}
            users={users}
            saleTempFormData={saleTempFormData}
            formErrors={formErrors}
            saleTempChange={saleTempChange}
            addSaleTemp={addSaleTemp}
            addPackage={addPackage}
            addHighLight={addHighLight}
            removePackage={removePackage}
            tempPackages={tempPackages}
            tempPackagesChange={tempPackagesChange}
            products={products}
            highLights={highLights}
            highLightChange={highLightChange}
            removeHighLight={removeHighLight}
            addFAQ={addFAQ}
            FAQs={FAQs}
            faqChange={faqChange}
            removeFAQ={removeFAQ}
            connectSlotChange={connectSlotChange}
            connectSlotSessionChange={connectSlotSessionChange}
            connectSlot={connectSlot}
            industries={industries}
            technologies={technologies}
            skills={skills}
            categories={categories}
          />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    saleTempFormData: state.saleTemp.saleTempFormData,
    formErrors: state.saleTemp.formErrors,
    isLoading: state.saleTemp.isLoading,
    tempPackages: state.saleTemp.tempPackages,
    connectSlot:state.saleTemp.connectSlot,
    highLights:state.saleTemp.highLights,
    FAQs:state.saleTemp.FAQs,
    products: state.product.products,
    users:state.users.users,
    skills: state.application.skills,
    technologies: state.application.technologies,
    industries: state.application.industries,
    categories: state.category.storeCategories,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Add);
