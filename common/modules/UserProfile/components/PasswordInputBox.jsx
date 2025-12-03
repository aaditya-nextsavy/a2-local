import React from 'react';

class PasswordInputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordShown: false,
        };
    }


    togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        this.setState({ passwordShown: !this.state.passwordShown });
    };

    render() {
        return (
            <>
                <input
                    type={this.state.passwordShown ? 'text' : 'password'}
                    id="txtPassword"
                    className="popup-input-password"
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                />
                <div className="EyeIcon">
                    <i
                        id="toggle_pwd"
                        onClick={this.togglePassword}
                        className={
                            this.state.passwordShown
                                ? 'fa-regular fa-eye-slash'
                                : 'fa-regular fa-eye'
                        }
                    ></i>
                </div>
            </>
        );
    }
}

export default PasswordInputBox;
