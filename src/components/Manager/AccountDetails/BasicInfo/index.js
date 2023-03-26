import React, { useState } from "react";
import { Col, Button } from "reactstrap";
import { MdEmail, MdPhone, MdLocationPin } from "react-icons/md";
import { FaBirthdayCake, FaEdit } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import Gender from "../../../Common/Gender";
import UpdateBasicInfo from "./UpdateBasicInfo";
import UpdateProfilePicture from "./UpdateProfilePicture";
import moment from "moment";
import { GOOGLE_CLOUD_BUCKET_URL,BASE_API_URL } from "../../../../constants";
const fallbackImage="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee7f704e50f4a220fab16905e2f9c2ea91503dca_full.jpg";
export default function BasicInfo({
  avatar,
  firstName,
  lastName,
  addresses,
  gender,
  dob,
  phoneNumber,
  email,
  company,
  about,
  education,
  updateProfile,
  updateProfilePicture,
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateProfilePicture, setIsUpdateProfilePicture] = useState(false);

  const currentAddress = addresses
    ?.filter((address) => address?.isDefault === true)
    .pop();
  const toggleUpdateModal = () => {
    setIsUpdate((state) => !state);
  };
  const toggleUpdateProfilePictureModal = () => {
    setIsUpdateProfilePicture((state) => !state);
  };
  return (
    <>
      <div className="row">
        <div className="offset-10">
          <Button onClick={toggleUpdateModal}>Update</Button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mt-2">
        <div>
          <img
            src={
              `${GOOGLE_CLOUD_BUCKET_URL}${avatar}` ||
              fallbackImage
            }
            alt="Avatar"
            className="avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=fallbackImage;
            }}
          />
          <span onClick={toggleUpdateProfilePictureModal}>
            {" "}
            <FaEdit />
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <h1 className="display-6 fs-2 font-weight-bold">{`${firstName} ${lastName}`}</h1>
        </div>
        <div>
          <span className="text-muted font-weight-normal mr-2">
            {company?.designation} at
          </span>
          <span className="text-primary font-weight-bold">
            {company?.organization}
          </span>
        </div>
        <div>
          <p className="text-body text-center">{about}</p>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-between">
            <div className="mr-2">
              <span className="mr-1">
                <MdEmail />
              </span>
              {email}
            </div>
            <div>
              <span className="mr-1">
                <MdPhone />
              </span>
              {phoneNumber}
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-between">
            <div className="mr-2">
              {gender ? (
                <>
                  <Gender gender={gender} />
                </>
              ) : (
                <>Update gender</>
              )}
            </div>
            <div>
              <span className="mr-1">
                <FaBirthdayCake />
              </span>
              {dob ? (
                <> {moment(dob).format("MMMM Do YYYY")}</>
              ) : (
                <>Update date of birth</>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>
          <span className="mr-1">
            <SiGooglescholar />
          </span>
          {education}
        </div>
        <div>
          <span className="mr-1">
            <MdLocationPin />
          </span>
          {`${currentAddress?.address} ${currentAddress?.city} ${currentAddress?.state}`}
        </div>
      </div>
      <UpdateBasicInfo
        basicInfo={{
          firstName,
          lastName,
          addresses,
          gender,
          dob,
          phoneNumber,
          about,
          education,
        }}
        active={isUpdate}
        close={toggleUpdateModal}
        updateProfile={updateProfile}
      />
      <UpdateProfilePicture
        basicInfo={{
          firstName,
          lastName,
          addresses,
          gender,
          dob,
          phoneNumber,
          about,
          education,
        }}
        active={isUpdateProfilePicture}
        close={toggleUpdateProfilePictureModal}
        updateProfilePicture={updateProfilePicture}
      />
    </>
  );
}
