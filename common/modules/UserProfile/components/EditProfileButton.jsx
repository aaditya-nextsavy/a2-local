import React, { Component } from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditIconImg from '@/public/assets/images/Edit-icon.svg'

import { Trans } from 'react-i18next';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

class EditProfileButton extends Component {


    constructor(props) {
        super(props);
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
    handleChildData = (data) => {   
        
        if (data) {
            this.props.callbackFromParent(data)
        }
    }

    render() {
        
        return (
            <>
                <button className='ButtonSmall' onClick={this.open}>
                    <img src={EditIconImg.src} alt='edit button' /> <Trans i18nKey="common.edit"></Trans>
                </button>

                <EditProfilePopup showModal={this.state.showModal} onClose={this.close} userProfileData={this.props.userProfileData} callbackFromParent={this.handleChildData} />
            </>
        );
    }
}

export default EditProfileButton;
