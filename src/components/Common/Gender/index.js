import React from "react";
import { BsGenderMale,BsGenderFemale } from "react-icons/bs";
import { GENDER } from "../../../constants";

export default function Gender({ gender }) {
  if (gender === GENDER?.MALE) {
    return (
      <>
        <span className="mr-1">
          <BsGenderMale />
        </span>
        <span>Male</span>
      </>
    );
  } else if (gender === GENDER?.FEMALE) {
    return (
      <>
        <span className="mr-1">
          <BsGenderFemale />
        </span>
        <span>Female</span>
      </>
    );
  } else {
    return (
      <>
        <span>Other Gender</span>
      </>
    );
  }
}
