import { useState } from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import Link from 'next/link';
import { submitLoginForm } from '@/pages/api';
import { useRouter } from 'next/router';
import CaptchaBlock from '../../CaptchaBlock/CaptchaBlock';
import { useAuth } from '@/lib/AuthContext';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [responseDataEmail, setResponseDataEmail] = useState('');
    const [responseDataPassword, setResponseDataPassword] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [token, setToken] = useState('');
    const [status, setStatus] = useState(false);
    const [errWidgetStatus, setErrWidgetStatus] = useState(false)
    const { login } = useAuth();
    const router = useRouter()
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const selectedLanguageCode = router.query.lang || 'en';
        const deviceId = 'deviceId';
        const userAgent = 'userAgent';

        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Initialize variables to hold validation results
        let emailError = '';
        let passwordError = '';

        if (email === '') {
            emailError = i18n.t('common.validationFieldRequired');
        } else if (!emailPattern.test(email)) {
            emailError = i18n.t('common.validationInvalidEmailFormat');
        }

        if (password === '') {
            passwordError = i18n.t('common.validationFieldRequired');
        } else if (password.length < 8) {
            passwordError = i18n.t('common.validationPasswordDigit');
        }

        // Set the validation results into state
        setResponseDataEmail(emailError);
        setResponseDataPassword(passwordError);

        // If there are validation errors, return without making the API call
        if (emailError || passwordError) {
            return;
        }
        // if (!errWidgetStatus) {
        //     return;
        // }

        // Call the handleApiCall function with the required parameters
        handleApiCall(selectedLanguageCode, deviceId, userAgent, email, password);
    };

    const handleApiCall = async (
        selectedLanguageCode,
        deviceId,
        userAgent,
        email,
        password
    ) => {
        try {
            // Perform the API call here, passing the required parameters
            const LoginResponse = await submitLoginForm({
                selectedLanguageCode,
                userAgent,
                deviceId,
                Email: email, // Changed variable name to match the API
                Password: password, // Changed variable name to match the API
            });

            console.log("LoginResponse ", LoginResponse)
            const { data, status, message, status_code } = LoginResponse;


            setErrorMsg(message)
            setResponseDataEmail(message.email)
            setResponseDataPassword(message.password)

            if (LoginResponse.status_code === 200) {
                const { token } = LoginResponse.data.token;
                login(LoginResponse.data.token);    
                setErrorMsg('')
                setToken(LoginResponse.data.token);
                // localStorage.setItem('Token-for-login', LoginResponse.data.token);
                // localStorage.setItem('status', LoginResponse.status);
                // props.callbackFromParent(LoginResponse.status);
            } else {
                console.log('Login Token unavailabel');
            }

            // Handle the API response as needed
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        }
    };

    const handleStatus = (childStatus) => {
        setErrWidgetStatus(childStatus)
        // console.log("childStatus handleStatus", childStatus);
    };

    return (
        <>
            <form className="login-form">
                {errorMsg && (
                    <span className="error-msg text-center d-block">
                        {errorMsg === 'تم تسجيل الدخول بنجاح' || errorMsg === 'Logged In Succcessfull' ? '' : errorMsg}
                    </span>
                )}
                <div className="popup-input-groups">
                    <label htmlFor="email" className="login-label">
                        <Trans i18nKey="common.email"></Trans>
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="popup-input"
                        placeholder={i18n.t('common.phEmail')}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <span
                        className={
                            responseDataEmail ? 'd-block error-msg pt-2' : 'd-none'
                        }
                    >
                        {responseDataEmail}
                    </span>
                </div>
                <div className="popup-input-groups">
                    <label htmlFor="password" className="login-label">
                        <Trans i18nKey="common.password"></Trans>
                    </label>
                    <div className="password-box-wrap position-relative">
                        <input
                            type={passwordShown ? 'text' : 'password'}
                            id="txtPassword"
                            className="popup-input w-100"
                            name="login_password"
                            placeholder={i18n.t('common.phPassword')}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <div className="EyeIcon">
                            <i
                                id="toggle_pwd"
                                onClick={togglePassword}
                                className={
                                    passwordShown
                                        ? 'fa-regular fa-eye-slash'
                                        : 'fa-regular fa-eye'
                                }
                            ></i>
                        </div>
                    </div>
                    <span
                        className={
                            responseDataPassword ? 'd-block error-msg pt-2' : 'd-none'
                        }
                    >
                        {responseDataPassword}
                    </span>
                </div>
                <div className="login-desc row align-items-center">
                    <div className="col-6 d-flex">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember"> <Trans i18nKey="common.rememberMe"></Trans></label>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <Link
                            href=""
                            className="nounderline"
                            onClick={e => {
                                e.preventDefault();
                                props.setMode('Forgot Password ?');
                            }}
                        >
                            <Trans i18nKey="common.forgotPassword"></Trans>
                        </Link>
                    </div>
                </div>
                {/* <CaptchaBlock callbackStatus={handleStatus} /> */}
                <div className="login-submit-btn">
                    <button className="SecondaryButton" onClick={handleLogin}>
                        <Trans i18nKey="common.logIn"></Trans>
                    </button>
                </div>
                <div className="login-desc-account">
                    <p>
                        <Trans i18nKey="common.dontHaveAccount"></Trans> {' '}
                        <Link
                            href=""
                            className="nounderline"
                            onClick={e => {
                                e.preventDefault();
                                props.setMode('Explore Saudi Arabia');
                            }}
                        >
                            <Trans i18nKey="common.signUp"></Trans>
                        </Link>
                    </p>
                </div>
            </form>
        </>
    );
}