import React from 'react';
import { connect } from "react-redux";
import actions from "../../actions";

import SubPage from '../../components/Manager/SubPage';
import SaleTempList from "../../components/Manager/SaleTempList";
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSaleTemps();
  }
  render() {
    const { history, saleTemps, isLoading } = this.props;

    return (
      <>
        <SubPage title='sales List' actionTitle='Add' handleAction={() => history.push('/dashboard/salesPitch/add')}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : saleTemps.length > 0 ? (
            <SaleTempList saleTemps={saleTemps} />
          ) : (
            <NotFound message='no temps found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    saleTemps: state.saleTemp.saleTemps,
    isLoading: state.saleTemp.isLoading,
    user: state.account.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(List);
