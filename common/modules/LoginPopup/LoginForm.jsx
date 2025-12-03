import React, { Component } from "react";
import {
  Modal,
} from "react-bootstrap";
import { Trans } from 'react-i18next';
import PurpleLogo from "@/public/assets/images/logoPurple.svg";
import VerifyEmail from "@/public/assets/images/Verify mail icon.png";
import VerifyPhone from "@/public/assets/images/Verify Phone Number icon.png";
import AccountSuccess from "@/public/assets/images/icon-park-outline_success.png";
import CloseBtn from "@/public/assets/images/Vector (2).png";
import ArrowIcon from "@/public/assets/images/arrow_back.png";
import PhonenumberInputBox from "./PhonenumberInputBox";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Image from "next/image";
import Link from "next/link";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      smShow: false,
      forgotPassEmail: "",
      email: "",
      password: "",
      mode: "Welcome back",
    };
    this.setMode = this.setMode.bind(this);
  }

  setMode = (mode) => {
    this.setState({
      mode,
    });
  };

  renderLogoImg = () => {
    return <Image src={PurpleLogo} alt="img" />;
  };
  renderSentMailImg = () => {
    return <Image src={VerifyEmail} alt="img" className="VerifyMailImg" width={100} height={100} />;
  };
  renderSentOTPImg = () => {
    return <Image src={VerifyPhone} alt="img" className="VerifyMailImg" width={100} height={100}/>;
  };
  renderAccountSuccess = () => {
    return <Image src={AccountSuccess} alt="img" className="VerifyMailImg" width={100} height={100}/>;
  };

  renderForgot = () => {
    return (
      <>
        <p className="Forgot-passSub-Title">
          <Trans i18nKey="common.forgotTitle"></Trans>
        </p>

        <ForgotPassword setMode={this.setMode} callbackFromParent={(Email) => this.setState({ forgotPassEmail: Email })} />
      </>
    );
  };

  renderRegister = () => {
    return (
      <>
        <Registration setMode={this.setMode} />
      </>
    );
  };
  loginStatus = (loginStatus) => {
    // alert("login-form status", loginStatus)
    this.props.gotStatus(loginStatus);
  };
  renderLogin = () => {
    return (
      <>
        <Login setMode={this.setMode} callbackFromParent={this.loginStatus} />
      </>
    );
  };
  renderCheckMail = () => {
    return (
      <>
        <p className="Forgot-passSub-Title">
          <Trans i18nKey="common.forgotPasswordResetLink"></Trans> <b>{this.state.forgotPassEmail}</b>
        </p>
        <form className="forgot-password-Check-mail-form">
          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => {
                e.preventDefault();
                this.setMode("Check Your Email");
              }}
            >
              <Trans i18nKey="common.openEmail"></Trans>
            </button>
          </div>
          {/* <div className="popoup-text">
            <p>
              Didn’t receive the email ?
              <b>
                <Link to="" className="nounderline">
                  {" "}
                  Click to resend
                </Link>
              </b>
            </p>
          </div> */}
          <div className="login-desc-account">
            <div className="back-to-home-btn d-flex align-items-center justify-content-center">
              <img src={ArrowIcon.src} alt="" className="back-icon-forgotpass" />
              <Link
                href=""
                className="nounderline"
                onClick={(e) => {
                  e.preventDefault();
                  this.setMode("Welcome back");
                }}
              >
                <Trans i18nKey="common.backToLogin"></Trans>
              </Link>
            </div>
          </div>
        </form>
      </>
    );
  };
  renderVerifyMail = () => {
    return (
      <>
        <form className="verify-mail-form">
          <div className="popup-input-groups">
            <label for="email" className="login-label">
              Email{" "}
            </label>
            <input
              type="text"
              id="email"
              className="popup-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-bottom-text verify-email">
            <p>A verification email will be send on above email address.</p>
          </div>
          <div className="change-to-phone-num">
            <Link
              href=""
              className="nounderline"
              onClick={(e) => {
                e.preventDefault();
                this.setMode("Verify Phone Number");
              }}
            >
              Verify Phone Number
            </Link>
          </div>
          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => {
                e.preventDefault();
                // this.setMode("Email Sent");
                console.log(this.state.forgotPassEmail)
              }}
            >
              Send Email
            </button>
          </div>
        </form>
      </>
    );
  };
  renderEmailSent = () => {
    return (
      <>
        <form className="forgot-password-Check-mail-form">
          <p className="check-mail-text">
            A verification email is succesfully sent on{" "}
            <b>harry123@gmail.com</b>
          </p>
          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => {
                e.preventDefault();
                this.setMode("Email Verified Successfully");
              }}
            >
              Open Email
            </button>
          </div>
          <div className="popoup-text">
            <p>
              Didn’t get the mail?
              <b>
                <Link href="" className="nounderline">
                  {" "}
                  Resend mail
                </Link>
              </b>
            </p>
          </div>
        </form>
      </>
    );
  };
  renderVerifyEmailSuccess = () => {
    return (
      <>
        <form className="verified-mail-form">
          <p className="check-mail-text">
            <Trans i18nKey="common.verificationThankYouEmail"></Trans>
          </p>
        </form>
      </>
    );
  };
  renderVerifyPhone = () => {
    return (
      <>
        <form className="verify-phone-form">
          <div className="popup-input-groups">
            <label for="phonenumb" className="login-label">
              Phone Number
            </label>
            <PhonenumberInputBox />
          </div>
          <div className="input-bottom-text verify-email">
            <p>An OTP will be send on above phone number.</p>
          </div>

          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => {
                e.preventDefault();
                this.setMode("Enter OTP");
              }}
            >
              Get OTP
            </button>
          </div>
        </form>
      </>
    );
  };
  renderVerifyOTP = () => {
    return (
      <>
        <form className="verify-otp-phone-form">
          <div className="input-otp-box">
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(1)"
              maxlength="1"
            />
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(2)"
              maxlength="1"
            />
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(3)"
              maxlength="1"
            />
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(4)"
              maxlength="1"
            />
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(5)"
              maxlength="1"
            />
            <input
              className="otp-verify"
              type="text"
              oninput="digitValidate(this)"
              onkeyup="tabChange(6)"
              maxlength="1"
            />
          </div>

          <div className="login-submit-btn">
            <button
              className="SecondaryButton"
              onClick={(e) => {
                e.preventDefault();
                this.setMode("Phone number Verified Successfully");
              }}
            >
              Verify
            </button>
          </div>
        </form>
      </>
    );
  };
  rednerVerifyPhoneSucess = () => {
    return (
      <>
        <form className="verified-mail-form">
          <p className="check-mail-text">
            Thank you for verifying your phone number, it helps us to secure
            your athaarabia account.
          </p>

          <a
            onClick={(e) => {
              e.preventDefault();
              this.setMode("Account Created Successfully");
            }}
          >
            Success
          </a>
        </form>
      </>
    );
  };
  renderAccountCreated = () => {
    return <></>;
  };

  render() {
    const selectedLanguageCode = 'en';
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
          centered
          className="primary-popup-wrapper"
          dir={selectedLanguageCode === 'ar' ? "rtl" : ''}
        >
          <Modal.Header className="popupmodale login-signin-popup-header">
            <div className="loginPopup">
              <div className="loginpopup-header">
                <div className="loginLogo">
                  {this.state.mode === "Welcome back"
                    ? this.renderLogoImg()
                    : this.state.mode === "Explore Saudi Arabia"
                      ? this.renderLogoImg()
                      : this.state.mode === "Forgot Password ?"
                        ? this.renderLogoImg()
                        : this.state.mode === "Check Your Email"
                          ? this.renderSentMailImg()
                          : this.state.mode === "Verify Email ID"
                            ? this.renderSentMailImg()
                            : this.state.mode === "Email Sent"
                              ? this.renderSentMailImg()
                              : this.state.mode === "Email Verified Successfully"
                                ? this.renderSentMailImg()
                                : this.state.mode === "Verify Phone Number"
                                  ? this.renderSentOTPImg()
                                  : this.state.mode === "Enter OTP"
                                    ? this.renderSentOTPImg()
                                    : this.state.mode === "Phone number Verified Successfully"
                                      ? this.renderSentOTPImg()
                                      : this.renderAccountSuccess()
                  }
                </div>
                <div className="loginpopup-btn">
                  <button
                    className="close"
                    aria-label="close"
                    onClick={(e) => {
                      this.props.onClose();
                      this.setMode("Welcome back");
                    }}
                  >
                    <Image src={CloseBtn} alt="img" width={22} height={22} />
                  </button>
                </div>
              </div>
              <div
                className={
                  this.state.mode === "Email Verified Successfully"
                    ? "block-title Email-Verified-Successfully"
                    : "block-title"
                }
              >
                <h2>
                  <Trans i18nKey={this.state.mode === "Welcome back"
                    ? "common.welcomeBack"
                    : this.state.mode === "Explore Saudi Arabia"
                      ? "common.exploreSaudiAarabia"
                      : this.state.mode === "Forgot Password ?"
                        ? `common.forgotPassword`
                        : this.state.mode === "Check Your Email"
                          ? "common.checkYourEmail"
                          : this.state.mode === "Verify Email ID"
                            ? "common.verifyEmailId"
                            : this.state.mode === "Email Sent"
                              ? "common.emailSent"
                              : this.state.mode === "Email Verified Successfully"
                                ? "common.emailVerifiedSuccess"
                                : this.state.mode === "Verify Phone Number"
                                  ? "common.verifyPhoneNumber"
                                  : this.state.mode === "Enter OTP"
                                    ? "common.enterOTP"
                                    : this.state.mode === "Phone number Verified Successfully"
                                      ? "Phone number Verified Successfully"
                                      : "common.accountCreatedSuccessfully"
                  } ></Trans>
                  {" "}
                </h2>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body className="login-signin-popup-body">
            <div className="popup-body-wrapper">
              {this.state.mode === "Welcome back"
                ? this.renderLogin()
                : this.state.mode === "Explore Saudi Arabia"
                  ? this.renderRegister()
                  : this.state.mode === "Forgot Password ?"
                    ? this.renderForgot()
                    : this.state.mode === "Check Your Email"
                      ? this.renderCheckMail()
                      : this.state.mode === "Verify Email ID"
                        ? this.renderVerifyMail()
                        : this.state.mode === "Email Sent"
                          ? this.renderEmailSent()
                          : this.state.mode === "Email Verified Successfully"
                            ? this.renderVerifyEmailSuccess()
                            : this.state.mode === "Verify Phone Number"
                              ? this.renderVerifyPhone()
                              : this.state.mode === "Enter OTP"
                                ? this.renderVerifyOTP()
                                : this.state.mode === "Phone number Verified Successfully"
                                  ? this.rednerVerifyPhoneSucess()
                                  : this.renderAccountCreated()
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoginForm;
