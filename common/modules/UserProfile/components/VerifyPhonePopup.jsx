import React, { Component, useState } from "react";
import {
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Nav,
  Popover,
  Tooltip,
  Button,
  Modal,
  OverlayTrigger
} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import ProfileIconImg from '../../../assets/images/profile-outlined.svg'


import CloseBtn from '../../../assets/images/Vector (2).png'

import VerifyPhone from '../../../assets/images/Verify Phone Number icon.png'
import PhonenumberInputBox from "../../../Layout/LoginPopup/PhonenumberInputBox";



class VerifyPhonePopup extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      smShow: false,
      email: "",
      password: "",
      mode: "Verify Phone Number"
    };
  }

  setMode = mode => {
    this.setState({
      mode
    });
  };

  renderSentOTPImg = () => {
    return (
      <img src={VerifyPhone} alt="" className="VerifyMailImg" />
    )
  }


  renderVerifyPhone = () => {
    return (
      <>
        <form className='verify-phone-form'>
          <div className="popup-input-groups">
            <label for="phonenumb" className='login-label'>Phone Number</label>
            <PhonenumberInputBox />
          </div>
          <div className="input-bottom-text verify-email">
            <p>An OTP will be send on above phone number.</p>
          </div>

          <div className="login-submit-btn">
            <button className='SecondaryButton' onClick={e => {
              e.preventDefault();
              this.setMode("Enter OTP");
            }} >Get OTP</button>
          </div>
        </form>
      </>
    )
  };
  renderVerifyOTP = () => {
    return (
      <>
        <form className='verify-otp-phone-form'>
          <div className="input-otp-box">
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(1)' maxlength="1" />
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(2)' maxlength="1" />
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(3)' maxlength="1" />
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(4)' maxlength="1" />
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(5)' maxlength="1" />
            <input className="otp-verify" type="text" oninput='digitValidate(this)' onkeyup='tabChange(6)' maxlength="1" />
          </div>


          <div className="login-submit-btn">
            <button className='SecondaryButton' onClick={e => {
              e.preventDefault();
              this.setMode("Phone number Verified Successfully");
            }} >Verify</button>
          </div>
        </form>
      </>
    )
  };
  rednerVerifyPhoneSucess = () => {
    return (
      <>
        <form className='verified-mail-form'>
          <p className="check-mail-text">Thank you for verifying your phone number, it helps us to secure your athaarabia account.</p>
        </form>
      </>
    )
  };




  render() {

    return (
      <>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
          centered
          className="primary-popup-wrapper"
        >
          <Modal.Header className="popupmodale" >
            <div className="loginPopup">
              <div className="loginpopup-header">
                <div className="loginLogo">
                  {this.state.mode === "Verify Phone Number" ? (this.renderSentOTPImg()) : this.state.mode === "Enter OTP" ? (this.renderSentOTPImg()) : this.state.mode === "Phone number Verified Successfully" ? (this.renderSentOTPImg()) : ""}
                </div>
                <div className="loginpopup-btn">
                  <button className="close" aria-label="close" onClick={this.props.onClose}>
                    <img src={CloseBtn} alt="" />
                  </button>
                </div>
              </div>
              <div className={this.state.mode === "Email Verified Successfully" ? "block-title Email-Verified-Successfully" : "block-title"}>
                <h2>{this.state.mode === "Verify Phone Number" ? "Verify Phone Number" : this.state.mode === "Enter OTP" ? "Enter OTP" : this.state.mode === "Phone number Verified Successfully" ? "Phone number Verified Successfully" : "" } </h2>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="popup-body-wrapper">
              {this.state.mode === "Verify Phone Number" ? (this.renderVerifyPhone()) : this.state.mode === "Enter OTP" ? (this.renderVerifyOTP()) : this.state.mode === "Phone number Verified Successfully" ? (this.rednerVerifyPhoneSucess()) : ""}
            </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }
}

export default VerifyPhonePopup
