import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import ArrowIcon from '@/public/assets/images/arrow_back.png';
import { submitResetPasswordForm } from '@/pages/api'; // Import your API function
import { useRouter } from 'next/router';

export default function ForgotPassword(props) {
    const { t } = useTranslation();
    const [forgotPassEmail, setForgotPassEmail] = useState('');
    const [buttonLoader, setButtonLoader] = useState(false);
    const [emailError, setEmailError] = useState('');
    const router = useRouter()
    const selectedLanguageCode = router.query.lang || 'en';

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        const userAgent = 'userAgent'
        const deviceId = 'deviceId'

        if (!forgotPassEmail) {
            setEmailError(t('common.validationFieldRequired'));


        } else if (!validateEmail(forgotPassEmail)) {

            setEmailError(t('common.validationInvalidEmailFormat'));
        } else {
            setButtonLoader(true);
            try {
                // Handle the API call and response
                const response = await submitResetPasswordForm({ selectedLanguageCode, userAgent, deviceId, forgotPassEmail });
                console.log("responseresponseresponse", response)
                if (response.status) {
                    setButtonLoader(false);
                    props.callbackFromParent(forgotPassEmail);
                    setTimeout(() => {
                        props.setMode('Check Your Email');
                    }, 600);
                } else {
                    setEmailError(t('common.EmailNotFound'));
                    setButtonLoader(false);
                }
            } catch (error) {
                console.error('API Error:', error);
                setButtonLoader(false);
            }
        }
    };

    return (
        <form className="forgot-password-form">
            <div className="popup-input-groups">
                <label htmlFor="emailphone" className="login-label">
                    <Trans i18nKey="common.email" />
                </label>
                <input
                    type="text"
                    id="emailphone"
                    className="popup-input"
                    placeholder={t('common.phEmail')}
                    value={forgotPassEmail}
                    onChange={(e) => setForgotPassEmail(e.target.value)}
                />
                {emailError && <div className="error-msg">{emailError}</div>}
            </div>

            <div className="login-submit-btn">
                <button className={`SecondaryButton ${buttonLoader}`} onClick={handleSubmit}>
                    {buttonLoader ? <span className="button-loader"></span> : <Trans i18nKey="common.sendEmail"></Trans>}
                </button>
            </div>
            <div className="login-desc-account">
                <div className="back-to-home-btn d-flex align-items-center justify-content-center">
                    <Image src={ArrowIcon.src} alt="img" className="back-icon-forgotpass" width={25} height={22} />
                    <Link href=""
                        className="nounderline"
                        onClick={(e) => {
                            e.preventDefault();
                            props.setMode('Welcome back');
                        }}
                    >
                        <Trans i18nKey="common.backToLogin" />

                    </Link>
                </div>
            </div>
        </form>
    );
}
