import React, { Component } from 'react'


class PasswordInputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordShown: false
        };
    }
    togglePassword = () => {
        this.setState({
            passwordShown: !this.state.passwordShown
        });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    render() {
        return (
            <>
                <input type={this.state.passwordShown ? "text" : "password"} id="txtPassword" className='popup-input' name="login_password" placeholder="Enter your password" onChange={this.handlePasswordChange} required />
                <div className="EyeIcon">
                    <i id="toggle_pwd" onClick={this.togglePassword} className={this.state.passwordShown ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </>
        );
    }
}

export default PasswordInputBox
