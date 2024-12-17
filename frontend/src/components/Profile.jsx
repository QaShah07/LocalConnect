import React, { useState, useEffect } from "react";
import api from "../Router/api";
import "../comp_css/Profile.css";
import Address from "../components/Address";
import UpdateAddress from "../components/UpdateAddress";

const userid = localStorage.getItem("userid");

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [add, setAdd] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [updateaddressModal, setUpdateAddressModal] = useState(false);
  const [showPassSection, setShowPassSection] = useState(false);
  const [passform, setNewPassword1] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewPassword1(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passData = { newpass: passform };

    api
      .put(`/ecom/customers/update-password/${userid}`, passData)
      .then(() => {
        alert("Password updated successfully");
        setShowPassSection(false);
      })
      .catch(() => {
        alert("Error occurred. Try again later.");
      });
  };

  const handlerUpdateAddress = (latestAddress) => {
    setAdd(latestAddress);
    setUpdateAddressModal(true);
  };

  const showUpdateAddAddressModal = () => setUpdateAddressModal(false);
  const showAddAddressModal = () => setAddressModal(false);

  const handlerAddAddress = () => {
    setAddressModal(true);
  };

  useEffect(() => {
    api
      .get(`/ecom/customers/${userid}`)
      .then((response) => {
        setProfileData(response.data);
        setAddressModal(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [userid]);

  const latestAddress = profileData?.address?.length
    ? profileData.address[profileData.address.length - 1]
    : null;

  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile Section</h2>
      <div className="profile-wrapper">
        <div className="profile-container">
          {addressModal && <Address onclose={showAddAddressModal} />}
          {updateaddressModal && (
            <UpdateAddress address={add} onclose={showUpdateAddAddressModal} />
          )}

          <div className="profile-details">
            <h1 className="profile-header">Profile Details</h1>
            {profileData ? (
              <>
                <p>
                  <strong>Account Status:</strong>{" "}
                  <span className="status">
                    {profileData.userAccountStatus}
                  </span>
                </p>
                <p>
                  <strong>Name:</strong> {profileData.firstName}{" "}
                  {profileData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {profileData.phoneNumber}
                </p>
                <p>
                  <strong>Registration:</strong>{" "}
                  {profileData.registerTime.substring(0, 10)}
                </p>
              </>
            ) : (
              <p>Loading profile data...</p>
            )}
          </div>

          <div className="latest-address">
            {latestAddress ? (
              <>
                <h2>Latest Address</h2>
                <p>
                  <strong>Building:</strong> {latestAddress.flatNo}
                </p>
                <p>
                  <strong>Street:</strong> {latestAddress.street}
                </p>
                <p>
                  <strong>City:</strong> {latestAddress.city}
                </p>
                <p>
                  <strong>State:</strong> {latestAddress.state}
                </p>
                <p>
                  <strong>Zip Code:</strong> {latestAddress.zipCode}
                </p>
                <button
                  className="btn update-btn"
                  onClick={() => handlerUpdateAddress(latestAddress)}
                >
                  Update Address
                </button>
              </>
            ) : (
              <>
                <h2>No Address Found</h2>
                <button className="btn add-btn" onClick={handlerAddAddress}>
                  Add Address
                </button>
              </>
            )}
          </div>
        </div>

        <div className="updatePassword">
          {showPassSection ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={passform}
                onChange={handleChange}
              />
              {error && <p className="error">{error}</p>}
              <div className="password-buttons">
                <button className="btn update-btn" type="submit">
                  Update Password
                </button>
                <button
                  className="btn cancel-btn"
                  type="button"
                  onClick={() => setShowPassSection(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button className="btn change-btn" onClick={() => setShowPassSection(true)}>
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;