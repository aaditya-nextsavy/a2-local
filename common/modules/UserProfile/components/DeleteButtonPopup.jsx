import { useState } from "react";
import { Modal } from "react-bootstrap";
import i18n from 'i18next';
import DeleteIconImg from '@/public/assets/images/delete-btn.svg';
import { Trans } from "react-i18next";
import { useRouter } from "next/router";
import { deleteUserAccount } from "@/pages/api";

function DeleteButtonPopup(props) {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [buttonLoader, setButtonLoader] = useState(false);
    const router = useRouter();
    const selectedLanguageCode = router.query.lang || 'en';

    const togglePassword = () => setPasswordShown(!passwordShown);

    const handleDeleteAccount = (e) => {
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

        if (!valid) return;

        setButtonLoader(true);
        deleteApiCall();
    };

    const deleteApiCall = async () => {
        const token = localStorage.getItem('Token-for-login');
        const { userId } = props;

        try {
            const response = await deleteUserAccount({
                selectedLanguageCode,
                userAgent: navigator.userAgent,
                deviceId: 'deviceId',
                id: userId,
                token,
                password
            });

            if (response.message === 'Current password incorrect') {
                setCurrentPasswordError(i18n.t("common.passwordIncorrect"));
                setButtonLoader(false);
            } else if (response.status) {
                setTimeout(() => {
                    props.callbackFromParent(true);
                    setButtonLoader(false);
                    router.push('/');
                }, 800);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={props.showModal}
            onHide={props.onClose}
            centered
            className="primary-popup-wrapper"
            dir={selectedLanguageCode === 'ar' ? "rtl" : ''}
        >
            <Modal.Header className="popupmodale edit-setting-wrapper">
                <div className="user-profile-info-header d-flex justify-content-between">
                    <div className="drop-item-wrapper d-flex align-items-center">
                        <img src={DeleteIconImg.src} alt="" />
                        <p><Trans i18nKey="common.deleteAccount"></Trans></p>
                    </div>
                    <button className="close" aria-label="close" onClick={props.onClose}>
                        <img src="/assets/images/CloseBtn.svg" alt="" />
                    </button>
                </div>
            </Modal.Header>

            <Modal.Body className="pt-0">
                <div className="edit-setting-popup-wrapper delete-account">
                    <form className="edit-setting-form" onSubmit={handleDeleteAccount}>
                        <div className="input-group-contact edit-setting-input">
                            <label htmlFor="currentPass"><Trans i18nKey="common.password"></Trans></label>
                            <div className="position-relative">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    id="txtPassword"
                                    className="popup-input-password"
                                    name="current-password"
                                    placeholder={i18n.t('common.phPassword')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="EyeIcon">
                                    <i
                                        id="toggle_pwd"
                                        onClick={togglePassword}
                                        className={passwordShown ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
                                    ></i>
                                </div>
                            </div>
                            <span className="error-msg">{currentPasswordError}</span>
                        </div>
                        <div className="delete-declaimer">
                            <p><Trans i18nKey="common.deleteInfoMsg"></Trans></p>
                        </div>
                        <div className="delete-button">
                            <button
                                className="DeleteButton"
                                type="submit"
                                disabled={buttonLoader}
                            >
                                {buttonLoader ? <span className="button-loader"></span> : <Trans i18nKey="common.deleteAccount"></Trans>}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default DeleteButtonPopup;
