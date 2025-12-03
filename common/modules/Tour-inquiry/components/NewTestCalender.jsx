import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-bootstrap/Modal';
import SelectedDate from './SelectedDate';
import { Trans } from 'react-i18next';

class NewTestCalender extends Component {
    state = {
        showModal: false,
        selectedDate: null,
        dateState: true,
        formattedDate: null,
        daysNo: null
    };
    handleCountChange = (newCount) => {
        this.setState({ daysNo: newCount })
        this.props.onCountChange(newCount)

    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
        
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };
    handleStateFalse = () => {
        this.setState({formattedDate: null})
        this.props.statesNew()
    }

    handleSelectDate = () => {
        const date = this.state.selectedDate;
        const formattedDates = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        this.setState({ showModal: false, dateState: true, formattedDate: formattedDates });
        this.props.onSelectDate(this.state.selectedDate, this.state.dateState, formattedDates);
        this.props.setTrueDate();
        console.log(formattedDates)

    };

    render() {

        const maxDate = new Date();
        const minDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);

        return (
            <> {!this.state.formattedDate && <button className="TertiaryButton" onClick={this.handleOpenModal}><Trans i18nKey="makeATour.fixed"></Trans></button>}
                {this.state.formattedDate && (
                    <SelectedDate heyData={this.state.formattedDate} sendInputValue={this.handleCountChange}  updateStates={this.handleStateFalse} />
                )}
                <div className="maketourcalmainwrapper">
                    <Modal className='maketourcalmodel' show={this.state.showModal} onHide={this.handleCloseModal} size="md" centered>

                        <Modal.Body className='maketourcalmodelcontent'>
                            <div className="MakeTourCalenderWrapper position-relative">
                                <Calendar
                                    onChange={this.handleDateChange}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    showNeighboringMonth={true}
                                    locale="en-US"
                                />
                            </div>
                            <div className="d-flex maketourcalmodelbuttonwrapper">
                                <button className="TertiaryButton" onClick={this.handleCloseModal}>
                                   <Trans i18nKey="common.close"></Trans>
                                </button>
                                <button className="SecondaryButton" onClick={this.handleSelectDate}>
                                   <Trans i18nKey="common.selectDate"></Trans>
                                </button>
                            </div>
                        </Modal.Body>

                    </Modal>
                </div>
            </>
        );
    }
}

export default NewTestCalender;
