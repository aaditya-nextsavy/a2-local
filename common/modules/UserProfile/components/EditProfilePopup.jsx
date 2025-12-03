import { useState } from "react";
import { Modal } from "react-bootstrap";
import ProfileIconImg from '@/public/assets/images/profile-outlined.svg';
import CloseBtn from '@/public/assets/images/Vector (2).png';
import EditProfileForm from "./EditProfileForm";
import { Trans } from "react-i18next";

function EditProfilePopup(props) {
  const [showModal, setShowModal] = useState(false);

  const setMode = (mode) => {
    // Implement your mode change logic here if needed
  };

  const handleChildData = (data) => {
    if (data) {
      props.onClose(); // Call the onClose function from props
      props.callbackFromParent(data);
    }
  };

  const renderEditSettings = (userProfileData) => {
    return <EditProfileForm userProfileData={userProfileData} callbackFromParent={handleChildData} />;
  };

  const userProfileData = props.userProfileData;
  const selectedLanguageCode = localStorage.getItem("language_code");

  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.onClose}
        centered
        className="primary-popup-wrapper edit-profile"
        dir={selectedLanguageCode === "ar" ? "rtl" : ""}
      >
        <Modal.Header className="popupmodale edit-setting-wrapper">
          <div className="user-profile-info-header d-flex justify-content-between">
            <div className="drop-item-wrapper d-flex align-items-center">
              <img src={ProfileIconImg.src} alt="" />
              <p>
                <Trans i18nKey="common.profile"></Trans>
              </p>
            </div>
            <div className="loginpopup-btn">
              <button className="close" aria-label="close" onClick={props.onClose}>
                <img src={CloseBtn.src} alt="" />
              </button>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="pt-0">
          {renderEditSettings(userProfileData)}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditProfilePopup;
