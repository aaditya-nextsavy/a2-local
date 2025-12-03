import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { useTranslation, Trans } from 'react-i18next';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};




class PopupBtn extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            form: '',
            status: ''
        }

    }

    close = () => {
        this.setState({ showModal: false });
    }

    // searchParams = new URLSearchParams(window.location.search);
    // isGotLogin = searchParams.get('login') === 'true';
    componentDidUpdate() {
        const searchParams = new URLSearchParams(window.location.url);
        const isGotLogin = searchParams.get('login') === 'true';
        // alert(isGotLogin)
    }

    open = () => {

        this.setState({ showModal: true });
    }
    gotLoginStatus = (loginStatus) => {
        this.setState({ status: loginStatus })
        // console.log("popup", loginStatus)
        this.props.statusState(loginStatus)
        // alert("popup-file", loginStatus)
        setTimeout(() => {
            this.close();
        }, 800);
    }


    render() {
        const isLoggedIn = this.state.isLoggedIn;

        return (
            <>
                <button className='btn-secondary' onClick={this.open}><Trans i18nKey="Header.btn"></Trans></button>
                <LoginForm showModal={this.state.showModal} onClose={this.close} gotStatus={this.gotLoginStatus} />
            </>
        );
    }
}

export default PopupBtn 