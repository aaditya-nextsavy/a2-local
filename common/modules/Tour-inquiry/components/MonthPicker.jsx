import React, { Component } from 'react';
import { render } from 'react-dom';

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
} from 'react-bootstrap';
import MonthPickerPopup from './MonthPickerPopup';
import { Trans } from 'react-i18next';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

class MonthPicker extends Component {


    constructor() {
        super();
        this.state = {
            showModal: false,
            form: ''
        }

    }
    monthData = (selectedDateFlexible, flexibleDateState) => {
        this.props.onSelectMonth(selectedDateFlexible, flexibleDateState)
    }

    close = () => {
        this.setState({ showModal: false });
    }



    open = () => {
        this.setState({ showModal: true });
    }


    render() {

        const isLoggedIn = this.state.isLoggedIn;

        return (
            <>
                <button className='TertiaryButton' id="datetype" placeholder='Fixed' onClick={this.open} ><Trans i18nKey="makeATour.flexible"></Trans> </button>
                <MonthPickerPopup showModal={this.state.showModal} onClose={this.close} helloData={this.monthData} />
            </>
        );
    }
}

export default MonthPicker;
