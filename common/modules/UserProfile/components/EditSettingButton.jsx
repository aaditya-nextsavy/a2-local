import React, { Component } from 'react';
import EditSettingPopup from './EditSettingPopup';
import EditIconImg from '@/public/assets/images/Edit-icon.svg'

import { Trans } from 'react-i18next';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

class EditSettingButton extends Component {


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
    dataFromChild = (data) => {
        if (data) {
            this.close()
        }
    }


    render() {



        const isLoggedIn = this.state.isLoggedIn;

        return (
            <>
                <button className='ButtonSmall' onClick={this.open}>
                    <img src={EditIconImg.src} alt='edit button' /> <Trans i18nKey="common.edit"></Trans>
                </button>

                <EditSettingPopup showModal={this.state.showModal} onClose={this.close} callbackFromParent={this.dataFromChild} />
            </>
        );
    }
}

export default EditSettingButton;
