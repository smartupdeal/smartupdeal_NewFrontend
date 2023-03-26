/**
 *
 * AccountDetails
 *
 */

import React, { useState } from "react";

import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";

import Achievements from "./Achievements";
import BasicInfo from "./BasicInfo";
import Interests from "./Interests";
import Education from "./Education";
import Experience from "./Experience";
import UserRole from "../UserRole";
const AccountDetails = (props) => {
  const {
    user,
    addresses,
    updateProfile,
    availableSkills,
    availableTechnologies,
    availableIndustries,
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
  } = props;
  const {
    avatar,
    merchant,
    role,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    about="",
    interests,
    achievements,
    education,
    experience,
  } = user;
  return (
    <div className="account-details">
      <Row>
        <Col>
          <Badge color="primary">
            <UserRole role={role} />
          </Badge>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <BasicInfo
          avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            addresses={addresses}
            phoneNumber={merchant ? merchant?.phoneNumber : user?.phoneNumber}
            email={merchant ? merchant?.email : user?.email}
            dob={dateOfBirth}
            gender={gender}
            about={about}
            designation={role}
            company={experience?.filter(exp=>exp?.isCurrent===true).pop()}
            education={
              education?.length > 0
                ? `${education[0]?.program} ${education[0]?.institution}`
                : "Update education"
            }
            updateProfile={updateProfile}
            updateProfilePicture={updateProfilePicture}
          />
        </Col>
        <Col xs="12">
          <Interests
            skills={interests?.skills}
            availableSkills={availableSkills}
            availableTechnologies={availableTechnologies}
            availableIndustries={availableIndustries}
            industries={interests?.industries}
            technologies={interests?.technologies}
            updateUserSkills={updateUserSkills}
            updateUserTechnologies={updateUserTechnologies}
            updateUserIndustries={updateUserIndustries}
          />
        </Col>
        <Col xs="12">
          <Achievements
            achievements={achievements}
            updateUserAchievements={updateUserAchievements}
          />
        </Col>
        <Col xs="12">
          <Education
            education={education}
            updateUserEducation={updateUserEducation}
            addUserEducation={addUserEducation}
            deleteUserEducation={deleteUserEducation}
          />
        </Col>
        <Col xs="12">
          <Experience
            experience={experience}
            updateUserExperience={updateUserExperience}
            addUserExperience={addUserExperience}
            deleteUserExperience={deleteUserExperience}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccountDetails;
