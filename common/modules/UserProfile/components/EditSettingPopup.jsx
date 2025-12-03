import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import SettingIconImg from '@/public/assets/images/bytesize_settings.svg';
import CloseBtn from '@/public/assets/images/Vector (2).png';
import { submitPasswordChangeForm } from "@/pages/api";
import i18n from 'i18next';
import { Trans } from "react-i18next";
import { useRouter } from "next/router";

function EditSettingPopup(props) {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("Welcome back");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShownNew, setPasswordShownNew] = useState(false);
    const [passwordShownConfirm, setPasswordShownConfirm] = useState(false);
    const [PasswordNotMatch, setPasswordNotMatch] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const togglePassword = () => setPasswordShown(!passwordShown);
    const togglePasswordNew = () => setPasswordShownNew(!passwordShownNew);
    const togglePasswordConfirm = () => setPasswordShownConfirm(!passwordShownConfirm);
    const router = useRouter();

    const selectedLanguageCode = router.query.lang || 'en';
    const userAgent = 'userAgent';
    const deviceId = 'deviceId';
    let token
    useEffect(() => {
        token = localStorage.getItem('Token-for-login');
    }, [])



    const updatePassword = (e) => {
        e.preventDefault();
        let valid = true;

        // Validation checks
        if (!password) {
            setCurrentPasswordError("Please enter your current password.");
            valid = false;
        } else if (password.length < 8) {
            setCurrentPasswordError("Password should contain at least 8 characters.");
            valid = false;
        } else {
            setCurrentPasswordError("");
        }

        if (!newPassword) {
            setNewPasswordError("Please enter a new password.");
            valid = false;
        } else if (newPassword.length < 8) {
            setNewPasswordError("New password should contain at least 8 characters.");
            valid = false;
        } else {
            setNewPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password.");
            valid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("New password and confirm password do not match.");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (password === newPassword) {
            setNewPasswordError("New password should be different from the current password.");
            valid = false;
        } else {
            setNewPasswordError("");
        }

        if (!valid) {
            return;
        }

        setButtonLoader(true);
        handlePasswordUpdateApi();
    };

    const handlePasswordUpdateApi = async () => {
        // Get the token
        const storedToken = localStorage.getItem('Token-for-login');

        try {
            const passwordChangeApiCall = await submitPasswordChangeForm({
                selectedLanguageCode,
                userAgent,
                deviceId,
                token: storedToken,
                password,
                newPassword
            });

            console.log("passwordChangeApiCall", passwordChangeApiCall);

            if (passwordChangeApiCall.message === 'Current password incorrect') {
                setCurrentPasswordError("Current Password does not match");
                setButtonLoader(false);
            }
            if (passwordChangeApiCall.status === true) {
                // Call the callback function from props
                setTimeout(() => {
                    props.callbackFromParent(true);
                    setButtonLoader(false);
                }, 800);
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div>
            <Modal
                show={props.showModal}
                onHide={props.onClose}
                onSubmit={props.onSubmit}
                bsSize="large"
                centered
                className="primary-popup-wrapper edit-profile"
                dir={selectedLanguageCode === 'ar' ? "rtl" : ''}
            >
                <Modal.Header className="popupmodale edit-setting-wrapper">
                    <div className="user-profile-info-header d-flex justify-content-between">
                        <div className="drop-item-wrapper d-flex align-items-center">
                            <img src={SettingIconImg.src} alt="" />
                            <p><Trans i18nKey="common.settings"></Trans></p>
                        </div>
                        <div className="loginpopup-btn">
                            <button className="close" aria-label="close" onClick={props.onClose}>
                                <img src={CloseBtn.src} alt="" />
                            </button>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body className="pt-0">
                    <div className="edit-setting-popup-wrapper">
                        <form className='edit-setting-form'>
                            <div className="input-group-contact edit-setting-input">
                                <label htmlFor="currentPass"><Trans i18nKey="common.currentPassword"></Trans></label>
                                <div className="position-relative">
                                    <input type={passwordShown ? "text" : "password"} id="txtPassword" className='popup-input-password' name="current-password" placeholder={i18n.t('common.phCurrentPassword')}
                                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <div className="EyeIcon">
                                        <i id="toggle_pwd" onClick={togglePassword} className={passwordShown ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                                    </div>
                                </div>
                                <span className="error-msg">{currentPasswordError}</span>
                            </div>
                            <div className="input-group-contact edit-setting-input">
                                <label htmlFor="NewPass"><Trans i18nKey="common.newPassword"></Trans></label>
                                <div className="position-relative">
                                    <input type={passwordShownNew ? "text" : "password"} id="newTxtPassword" className='popup-input-password' name="new-password" placeholder={i18n.t('common.phNewPassword')}
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    <div className="EyeIcon">
                                        <i id="toggle_pwd" onClick={togglePasswordNew} className={passwordShownNew ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                                    </div>
                                </div>
                                <span className="error-msg">{newPasswordError}</span>
                            </div>
                            <div className="input-group-contact edit-setting-input">
                                <label htmlFor="ConfirmPass"><Trans i18nKey="common.confirmPassword"></Trans></label>
                                <div className="position-relative">
                                    <input type={passwordShownConfirm ? "text" : "password"} id="confirmTxtPassword" className='popup-input-password' name="Confirm-password" placeholder={i18n.t('common.phConfirmPassword')}
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    <div className="EyeIcon">
                                        <i id="toggle_pwd" onClick={togglePasswordConfirm} className={passwordShownConfirm ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                                    </div>
                                </div>
                                <span className="error-msg">{confirmPasswordError}</span>
                            </div>
                            <div className="input-group-btn">
                                <button className="TertiaryButton" onClick={updatePassword} >
                                    {buttonLoader ? <span className='button-loader'></span> : <Trans i18nKey="common.updatePassword"></Trans>}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditSettingPopup;
