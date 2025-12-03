import React, { Component, useState } from "react";
import {
    Modal,
} from "react-bootstrap";

import TestMonthYear from "./TestMonthYear";
import { Trans } from "react-i18next";


class MonthPickerPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            dataShow: null,

            month: '',
            year: '',
            week: ''

        };
    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
    };
    handleClose = () => {
        this.setState({ showModal: false });
    };
    getData = (selectedDateFlexible, flexibleDateState) => {
        this.setState({ dataShow: selectedDateFlexible, month: selectedDateFlexible.month, year: selectedDateFlexible.year, week: selectedDateFlexible.Week })
        // console.log('monthdaadlakdsgjhllkj', flexibleDateState)
        this.props.onSelectMonth(selectedDateFlexible, flexibleDateState)
        this.setState({ showModal: false });

    }
    setMode = mode => {
        this.setState({
            mode
        });
    };

    renderCalender = () => {

        return (
            <>
                <div className="MakeFlexibleCalenderWrapper position-relative">
                    {/* <MonthYearPicker/> */}
                    <TestMonthYear theDataMonth={this.getData}
                        handleClose="onClick={this.props.onClose}" />
                    <div className="MakeTourCalenderBtns closebtnOnly d-flex align-items-center ">
                        <button className="TertiaryButton" onClick={this.handleClose}><Trans i18nKey="common.close"></Trans></button>
                    </div>
                </div>
            </>
        );
    };

    render() {


        return (
            <>
                {!this.state.dataShow ? (
                    <button className='TertiaryButton' id="datetype" placeholder='Fixed' onClick={this.handleOpenModal} ><Trans i18nKey="makeATour.flexible"></Trans> </button>
                ) : (
                    ""
                )}

                <Modal
                    show={this.state.showModal}
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
            </>
        );
    }
}

export default MonthPickerPopup;
