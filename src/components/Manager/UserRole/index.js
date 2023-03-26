/**
 *
 * UserRole
 *
 */

import React from "react";

const UserRole = ({ role }) => {
  return (
    <>
      {role === "ROLE_ADMIN" ? (
        <span>Admin</span>
      ) : role === "ROLE_MERCHANT" ? (
        <span>Merchant</span>
      ) : (
        <span>Member</span>
      )}
    </>
  );
};

UserRole.defaultProps = {
  role: "",
};

export default UserRole;
