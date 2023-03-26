/*
 *
 * Account
 *
 */

import React from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import AccountDetails from "../../components/Manager/AccountDetails";
import SubPage from "../../components/Manager/SubPage";

class Account extends React.PureComponent {
  componentDidMount() {
    // this.props.fetchProfile();
    this.props.fetchAddresses();
  }


  render() {
    const {
      user,
      skills,
      technologies,
      industries,
      addresses,
      accountChange,
      updateProfile,
      updateUserAchievements,
      updateUserEducation,
      addUserEducation,
      deleteUserEducation,
      addUserExperience,
      updateUserExperience,
      deleteUserExperience,
      updateUserSkills,
      updateUserTechnologies,
      updateUserIndustries,
      updateProfilePicture
    } = this.props;
    return (
      <div className="account">
        <SubPage title={"Account Details"} isMenuOpen={null}>
          <AccountDetails
            user={user}
            addresses={addresses}
            availableSkills={skills}
            availableTechnologies={technologies}
            availableIndustries={industries}
            accountChange={accountChange}
            updateProfile={updateProfile}
            updateUserAchievements={updateUserAchievements}
            updateUserEducation={updateUserEducation}
            addUserEducation={addUserEducation}
            deleteUserEducation={deleteUserEducation}
            addUserExperience={addUserExperience}
            updateUserExperience={updateUserExperience}
            deleteUserExperience={deleteUserExperience}
            updateUserSkills={updateUserSkills}
            updateUserTechnologies={updateUserTechnologies}
            updateUserIndustries={updateUserIndustries}
            updateProfilePicture={updateProfilePicture}
          />
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    skills: state.application.skills,
    technologies: state.application.technologies,
    industries: state.application.industries,
    addresses: state.address.addresses,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Account);
