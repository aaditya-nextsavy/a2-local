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
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

// import ProfileIconImg from '../../../assets/images/profile-outlined.svg'


import CloseBtn from '../../../assets/images/Vector (2).png'
import CalenderBookTour from "../../BookTour/components/CalenderBookTour";
import TestCalender from "./TestCalender";
// import PasswordInputBox from "./PasswordInputBox";
// import PhoneNumberInput from "./PhoneNumberInput";

// import DeleteIconImg from '../../../assets/images/delete-btn.svg'


const SelectedDates = () => {
    console.log("Dates")

}



class CalenderBtnPopup extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            smShow: false,
            email: "",
            password: "",
            mode: "Welcome back"
        };
    }

    setMode = mode => {
        this.setState({
            mode
        });
    };

    renderCalender = () => {

        return (
            <>
                <div className="MakeTourCalenderWrapper position-relative">
                    {/* <CalenderBookTour/> */}
                    <TestCalender />
                    {/* <Calendar onChange={handleDateChange} /> */}

                    <div className="MakeTourCalenderBtns closeBtn d-flex align-items-center ">
                        <button className="TertiaryButton" onClick={this.props.onClose}>Close</button>
                        {/* <button className="SecondaryButton" onClick={SelectedDates}>Select Date</button> */}
                    </div>
                </div>
            </>
        );
    };




    render() {

        return (
            <div>
                <Modal
                    show={this.props.showModal}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    bsSize="large"
                    centered
                >


                    <Modal.Body className="">
                        <>
                            {(this.renderCalender())}
                        </>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default CalenderBtnPopup;
