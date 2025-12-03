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
import CalenderBtnPopup from './CalenderBtnPopup';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

class CalenderBtnContent extends Component {


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

                
                <button className='TertiaryButton' id="datetype" placeholder='Fixed' onClick={this.open} >Fixed </button>
               
               

                <CalenderBtnPopup showModal={this.state.showModal} onClose={this.close} />
            </>
        );
    }
}

export default CalenderBtnContent;
