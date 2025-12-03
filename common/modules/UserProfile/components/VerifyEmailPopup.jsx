import React, { useEffect, useState } from "react";
import {
  Modal
} from "react-bootstrap";
import VerifyEmail from '@/public/assets/images/Verify mail icon.png'
import i18n from "i18next";
import Link from "next/link";
import { fetchOtpSendReqDetails, submitOtpSendVerifyDetails } from "@/pages/api";
import { useRouter } from "next/router";

const VerifyEmailPopup = (props) => {
  const [mode, setMode] = useState("Verify Email ID");
  const [mailId, setMailId] = useState()
  const [buttonLoader, setButtonLoader] = useState(false)
  const [error, setError] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const router = useRouter()


  const selectedLanguageCode = router.query.lang || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';
  let token

  useEffect(() => {
    token = localStorage.getItem('Token-for-login')
    console.log("props.userProfileData", props.userProfileData)
    setMailId(props.userProfileData.email)

    // console.log("props.userProfileData.email", props.userProfileData.email, token)
  }, [])



  const renderSentMailImg = () => {
    return (
      <img src={VerifyEmail.src} alt="" className="VerifyMailImg" />
    )
  }

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleApiCallOTPSend = async (e) => {
    e.preventDefault();
    token = localStorage.getItem('Token-for-login')
    setError(""); // Clear any previous error messages

    if (!validateEmail(mailId)) {
      setError("Please enter a valid email address.");
      return;
    }
    setButtonLoader(true);

    try {
      // Your API call
      const SendOtpApiCall = await fetchOtpSendReqDetails({
        selectedLanguageCode,
        userAgent,
        deviceId,
        mailId,
        token,
      });

      // console.log("SendOtpApiCall", SendOtpApiCall)

      if (SendOtpApiCall.status) {
        setButtonLoader(false);
        setMode("Email Sent");
      } else {
        setButtonLoader(false);
        setError("Failed to send email OTP. Please try again."); // Set error message
      }
    } catch (error) {
      setButtonLoader(false);
      setError("An error occurred while sending the email OTP."); // Set error message
      console.error(error);
    }
  };

  const HandleResendVal = (e) => {
    e.preventDefault();
    setMode("Verify Email ID")
    setTimeout(() => {
      handleApiCallOTPSend(e)
    }, 500);
  }

  const renderVerifyMail = () => {
    return (
      <>
        <form className="verify-mail-form">
          <div className="popup-input-groups">
            <label htmlFor="email" className="login-label">
              {i18n.t("common.email")}
            </label>
            <input
              type="text"
              id="email"
              className={`popup-input ${error ? "invalid" : ""}`}
              value={mailId}
              onChange={(e) => setMailId(e.target.value)}
              placeholder={i18n.t("common.phEmail")}
              disabled
            />
            {error && <span className="error-msg">{error}</span>} {/* Display error message */}
          </div>
          <div className="input-bottom-text verify-email">
            <p>{i18n.t("common.verigyEmailOTP")}</p>
          </div>
          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => handleApiCallOTPSend(e)}
              disabled={buttonLoader}
            >
              {buttonLoader ? <span className="button-loader"></span> : i18n.t("common.sendEmail")}
            </button>
          </div>
        </form>
      </>
    )
  };

  const handleVerifyOTPGet = async (e) => {
    e.preventDefault();
    token = localStorage.getItem('Token-for-login')
    setError(""); // Clear any previous error messages

    // Join the OTP values to form the complete OTP
    const otp = otpValues.join("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    setButtonLoader(true);

    try {
      // Your API call
      const verifyOtpApiCall = await submitOtpSendVerifyDetails({
        selectedLanguageCode,
        userAgent,
        deviceId,
        mailId,
        otp,
        token,
      });

      // console.log("submitOtpSendVerifyDetails", verifyOtpApiCall)

      if (verifyOtpApiCall.message !== "Invalid code!") {
        setButtonLoader(false);
        setMode("Email Verified Successfully");
      } else {
        setButtonLoader(false);
        setError("Invalid OTP. Please try again."); // Set error message
      }
    } catch (error) {
      setButtonLoader(false);
      setError("An error occurred while verifying OTP."); // Set error message
      console.error(error);
    }
  };


  const handleOtpInputChange = (index, value) => {
    if (value.match(/^[A-Za-z0-9]$/) || value === "") {
      // Update the OTP value at the specified index
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);
      setError(""); // Clear any previous error messages
    }
  };

  const renderEmailSent = () => {
    return (
      <>
        <form className='forgot-password-Check-mail-form verify-otp-phone-form'>
          <p className="check-mail-text">{i18n.t('common.emailSentOTP')} <b>{mailId}</b></p>
          <div className="input-otp-box">
            {otpValues.map((value, index) => (
              <input
                key={index}
                className="otp-verify"
                type="text"
                value={value}
                onChange={(e) => handleOtpInputChange(index, e.target.value)}
                maxLength="1"
              />
            ))}
          </div>
          <div className="text-center pb-2">
            {error && <span className="error-msg text-center">{error}</span>} {/* Display error message */}
          </div>
          <div className="login-submit-btn">
            <button className='SecondaryButton' onClick={(e) => handleVerifyOTPGet(e)}> {buttonLoader ? <span className="button-loader"></span> : i18n.t('common.verify')}</button>
          </div>
          <div className="popoup-text resent-otp-link">
            <p>{i18n.t('common.didntGetOTP')}
              <b><Link href='' className='nounderline ' onClick={(e) => HandleResendVal(e)}> {i18n.t('common.resendOTP')}</Link></b></p>
          </div>
        </form>
      </>
    )
  };
  const renderVerifyEmailSuccess = () => {
    return (
      <>
        <form className='verified-mail-form'>
          <p className="check-mail-text">{i18n.t('common.verificationThankYouEmail')}</p>
        </form>
      </>
    )
  };

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.onClose}
        bsSize="large"
        centered
        className="primary-popup-wrapper"
      >
        <Modal.Header className="popupmodale">
          <div className="loginPopup">
            <div className="loginpopup-header">
              <div className="loginLogo">
                {mode === "Verify Email ID" ? renderSentMailImg() : mode === "Email Sent" ? renderSentMailImg() : mode === "Email Verified Successfully" ? renderSentMailImg() : ""}
              </div>
              <div className="loginpopup-btn">
                <button className="close" aria-label="close" onClick={props.onClose}>
                  <img src="/assets/images/CloseBtn.svg" alt="" />
                </button>
              </div>
            </div>
            <div className={mode === "Email Verified Successfully" ? "block-title Email-Verified-Successfully" : "block-title"}>
              <h2>
                {mode === "Verify Email ID"
                  ? i18n.t('common.verifyEmailId')
                  : mode === "Email Sent"
                    ? i18n.t('common.emailSent')
                    : mode === "Email Verified Successfully"
                      ? i18n.t('common.emailVerifiedSuccess')
                      : ""}
              </h2>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="popup-body-wrapper">
            {mode === "Verify Email ID" ? (renderVerifyMail()) : mode === "Email Sent" ? (renderEmailSent()) : mode === "Email Verified Successfully" ? (renderVerifyEmailSuccess()) : ""}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyEmailPopup;
