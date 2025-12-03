import React, { useState } from 'react'
import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation, Trans } from 'react-i18next';
import i18n from 'i18next';
import Link from 'next/link';
import { submitRegistrationForm } from '@/pages/api';
import { useRouter } from 'next/router';



const Registration = (props) => {
    const [mode, setMode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [responseDataName, setResponseDataName] = useState(null);
    const [responseDataEmail, setResponseDataEmail] = useState(null);
    const [responseDataPhoneNumber, setResponseDataPhoneNumber] = useState(null);
    const [responseDataPassword, setResponseDataPassword] = useState(null);
    const [status, setStatus] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);

    const [generalMessage, setGeneralMessage] = useState([])
    const router = useRouter()
    const selectedLanguageCode = router.query.lang || 'en';



    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const conditionalRedirect = (thatStatus) => {
        if (thatStatus) {
            props.setMode('');
            setButtonLoader(false);
        } else {
            props.setMode('Explore Saudi Arabia');
            setButtonLoader(false);
        }
    };

    const handleRegistrationApicalle = async (e) => {
        e.preventDefault();
        setButtonLoader(true);
        setGeneralMessage([])

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        let isValid = true;

        if (name.trim() === '') {
            setResponseDataName(<Trans i18nKey="common.validationFieldRequired"></Trans>);
            setButtonLoader(false);
            isValid = false;
        } else {
            setResponseDataName('');
        }

        if (email.trim() === '') {
            setResponseDataEmail(<Trans i18nKey="common.validationFieldRequired"></Trans>);
            setButtonLoader(false);
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setResponseDataEmail(<Trans i18nKey="common.validationInvalidEmailFormat"></Trans>);
            setButtonLoader(false);
            isValid = false;
        } else {
            setResponseDataEmail('');
        }

        if (phoneNumber.trim() === '') {
            isValid = false;
            setResponseDataPhoneNumber(<Trans i18nKey="common.validationFieldRequired"></Trans>);
            setButtonLoader(false);
        } else if (!isValidPhoneNumber(phoneNumber)) {
            isValid = false;
            setResponseDataPhoneNumber(<Trans i18nKey="common.validationInvalidPhoneNumber"></Trans>);
            setButtonLoader(false);
        } else {
            isValid = true;
            setResponseDataPhoneNumber('');
        }

        if (password.trim() === '') {
            setResponseDataPassword(<Trans i18nKey="common.validationFieldRequired"></Trans>);
            setButtonLoader(false);
            isValid = false;
        } else {
            setResponseDataPassword('');
        }

        if (isValid) {
            // All fields are valid, make the API call

            const deviceId = "deviceId"
            const userAgent = "userAgent"
            const mobile = phoneNumber
            handleApiCall(selectedLanguageCode, deviceId, userAgent, name, mobile, password, email)
            console.log("data", selectedLanguageCode, deviceId, userAgent, name, mobile, password, email)
        }
    };

    const handleApiCall = async (
        selectedLanguageCode,
        deviceId,
        userAgent,
        name,
        mobile,
        password,
        email
    ) => {
        try {
            // Perform the API call here, passing the required parameters
            const registraionApiCall = await submitRegistrationForm({ selectedLanguageCode, deviceId, userAgent, name, mobile, password, email })

            if (registraionApiCall.status) {
                setButtonLoader(false);
                conditionalRedirect(registraionApiCall.status);
                console.log("Registraion", registraionApiCall)
            } else {
                console.log('else', registraionApiCall);
                if (registraionApiCall.message.email) { setResponseDataEmail(registraionApiCall.message.email[0]) }
                if (registraionApiCall.message.mobile) { setResponseDataPhoneNumber(registraionApiCall.message.mobile[0]) }
                // if (registraionApiCall.message) { setGeneralMessage(registraionApiCall.message) }
                setButtonLoader(false);
                // Handle errors if needed
            }

        } catch (error) {
            setButtonLoader(false);
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        }
    };

    return (
        <>
            <form className="registration-form">
                <div className="popup-input-groups">
                    <label htmlFor="name" className="login-label">
                        <Trans i18nKey="common.name"></Trans>
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="popup-input"
                        placeholder={i18n.t('common.phName')}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    <span className={responseDataName ? 'd-block error-msg pt-2' : 'd-none'}>{responseDataName}</span>
                </div>
                <div className="popup-input-groups">
                    <label htmlFor="emailphone" className="login-label">
                        <Trans i18nKey="common.email"></Trans>{' '}
                    </label>
                    <input
                        type="text"
                        id="emailphone"
                        className="popup-input"
                        placeholder={i18n.t('common.phEmail')}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <span className={generalMessage.email ? 'd-block error-msg pt-2' : 'd-none'}>{generalMessage.email ? generalMessage.email : ''}</span>
                    <span className={responseDataEmail ? 'd-block error-msg pt-2' : 'd-none'}>{responseDataEmail}</span>
                </div>

                <div className="popup-input-groups">
                    <label htmlFor="phonenumb" className="login-label">
                        <Trans i18nKey="common.phoneNumber"></Trans>
                    </label>
                    <PhoneInput
                        className="phonenumber-popup-input"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="SA"
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                    // onBlur={() => {
                    //     const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
                    //     const isValid = parsedPhoneNumber ? parsedPhoneNumber.isValid() : false;
                    //     setIsValidPhoneNumber(isValid);
                    // }}
                    />
                    <span className={generalMessage.mobile ? 'd-block error-msg pt-2' : 'd-none'}>{generalMessage.mobile ? generalMessage.mobile : ''}</span>
                    <span className={responseDataPhoneNumber ? 'd-block error-msg pt-2' : 'd-none'}>{responseDataPhoneNumber}</span>
                </div>

                <div className="popup-input-groups">
                    <label htmlFor="password" className="login-label">
                        <Trans i18nKey="common.password"></Trans>
                    </label>
                    <div className="password-box-wrap position-relative">
                        <input
                            type={passwordShown ? 'text' : 'password'}
                            id="txtPassword current-password"
                            className="popup-input w-100"
                            placeholder={i18n.t('common.phPassword')}
                            name="login_password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <div className="EyeIcon">
                            <i id="toggle_pwd" onClick={togglePassword} className={passwordShown ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                        </div>
                    </div>

                    <span className={responseDataPassword ? 'd-block error-msg pt-2' : 'd-none'}>{responseDataPassword}</span>
                </div>

                <div className="login-submit-btn">
                    <button className={`SecondaryButton ${buttonLoader}`} onClick={handleRegistrationApicalle}>
                        {buttonLoader ? <span className="button-loader"></span> : <Trans i18nKey="common.signUp"></Trans>}
                    </button>
                </div>
                <div className="login-desc-account">
                    <p>
                        <Trans i18nKey="common.alreadyHaveAccount"></Trans>{' '}
                        <Link
                            href=""
                            className="nounderline"
                            onClick={(e) => {
                                e.preventDefault();
                                props.setMode('Welcome back');
                            }}
                        >
                            <Trans i18nKey="common.logIn"></Trans>
                        </Link>
                    </p>
                </div>
                <div className="terms-info">
                    <p>
                        <Trans i18nKey="common.termsInfo"></Trans> <b><Link href="/terms-of-use" className="nounderline"><Trans i18nKey="common.termsOfUse"></Trans></Link></b> & <b><Link href="/privacy-policy" className="nounderline"><Trans i18nKey="common.privacyPolicy"></Trans></Link></b>
                    </p>
                </div>
            </form>
        </>
    );
};

export default Registration;