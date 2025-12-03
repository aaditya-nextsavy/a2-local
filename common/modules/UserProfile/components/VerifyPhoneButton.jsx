import React, { Component } from 'react';
import { render } from 'react-dom';

import VerifyPhonePopup from './VerifyPhonePopup';

import EditIconImg from '../../../assets/images/Edit-icon.svg'

import ArrowRightImg from '../../../assets/images/arrow-right.svg'

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

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

class VerifyPhoneButton extends Component {


    constructor() {
        super();
        this.state = {
            showModal: false,
            form: ''
        }

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
                <button className='PrimaryButton' onClick={this.open}>
                    Verify Phone <img src={ArrowRightImg} className='arrowRightBtn' />
                </button>
                
                <VerifyPhonePopup showModal={this.state.showModal} onClose={this.close} />
            </>
        );
    }
}

export default VerifyPhoneButton;
