import React, { useState, useEffect } from "react";
import PurpleLogo from '@/public/assets/images/logoPurple.svg';
import AccountSuccess from "@/public/assets/images/icon-park-outline_success.png";
import ExpireLink from '@/public/assets/images/Error Symbol.svg'
import i18n from "i18next";
import FullScreenLoader from "@/common/modules/FullScreenLoader/FullScreenLoader";
import { useRouter } from "next/router";
import axiosConfig from "@/common/config/axios";
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, submitAuthResetPasswordToken, submitResetPasswordExternalLink } from "@/pages/api";
import Header from "@/common/modules/Header/Header";
import HeaderBlack from "@/common/modules/Header/HeaderBlack";
import Footer from "@/common/modules/Footer/Footer";



export default function ResetPassword() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [conformPasswordShown, setConformPasswordShown] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false)
    const [sucessStatus, setSucessStatus] = useState(true)
    const [tokenVerify, setTokenVerify] = useState(false)

    const [generalError, setGeneralError] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [fullScreenLoader, setFullScreenLoader] = useState(true)

    const [locationInfo, setLocationInfo] = useState([])
    const [categoryInfo, setCategoryInfo] = useState([])
    const [populerTourInfo, setPopulerTourInfo] = useState([])
    const [contactDataInfo, setContactDataInfo] = useState([])
    const [metaDataInfo, setMetaDataInfo] = useState([])

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    const router = useRouter();
    const { token } = router.query;
    const EmailUrl = router.query.email;
    const selectedLanguageCode = router.locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';

    useEffect(() => {
        const fetchData = async () => {

            let userAgent = 'userAgent';
            let deviceId = 'deviceId';
            let slug = "reset-password";
            let email = EmailUrl;
            try {
                const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
                const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
                const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
                const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
                const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })

                // setLoader(false);
                // Update state with fetched data
                setLocationInfo(locations.data)
                setCategoryInfo(categorys.data)
                setPopulerTourInfo(populerTour)
                setContactDataInfo(contactData)
                setMetaDataInfo(metaData)



            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, e.g., show an error message to the user.
            }
        };

        fetchData();
    }, [selectedLanguageCode])

    useEffect(() => {
        console.log("token:", token, "email", EmailUrl);
        setTimeout(() => {
            if (!token) {
                // router.push('/');
            } else {

                handleTokenVerify(EmailUrl)
            }
        }, 100);

    }, [router.query]);

    useEffect(() => {
        // Get the current URL
        const currentURL = window.location.href;

        // Create a canonical link element
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = currentURL;

        // Add the canonical link to the head of the document
        document.head.appendChild(canonicalLink);

        return () => {
            // Clean up by removing the canonical link when the component unmounts
            document.head.removeChild(canonicalLink);
        };
    }, []);

    const handleTokenVerify = async (EmailUrl) => {

        var email = EmailUrl


        const authToken = await submitAuthResetPasswordToken({ selectedLanguageCode, userAgent, deviceId, email, token })
        if (authToken) {

            const locData = authToken
            // console.log("response from API call handleTokenVerify", locData)
            if (locData.status) {
                setTokenVerify(true)
                setFullScreenLoader(false)
                // this.callbackFromParent(Email);

            } else {
                setFullScreenLoader(false)
                setGeneralError('Link Has Expired Generate new link')
                setTimeout(() => {
                    router.push('/')
                }, 1000);
                // this.setState({ emailError: i18n.t('common.EmailNotFound'), buttonLoader: false })
            }
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfPassword = () => {
        setConformPasswordShown(!conformPasswordShown);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError("");
        setConfirmPasswordError("");
        setButtonLoader(true)
        let validate = true
        // Password validation logic
        if (password.length < 8) {
            setButtonLoader(false)
            validate = false
            setPasswordError("Password must be at least 8 characters long.");
        }

        // Confirm password validation logic
        if (confirmPassword !== password) {
            validate = false
            setButtonLoader(false)
            setConfirmPasswordError("Passwords do not match.");
        }

        if (validate) {
            setButtonLoader(true)
            handleApiCall(EmailUrl, password)

        }
    };

    const handleApiCall = async (EmailUrl, password) => {

        var email = EmailUrl

        const passwordchange = await submitResetPasswordExternalLink({ selectedLanguageCode, userAgent, deviceId, email, password, token })

        // try {
        //     axiosConfig.post(`/auth/reset-password-submit?language_code=${selectedLanguageCode}&device_id=${deviceId}&user_agent=${userAgent}&email=${Email}&password=${password}&token=${token}`)
        //         .then((response) => {
        if (passwordchange) {
            const locData = passwordchange

            // console.log("response from API call reset Passwordddddd", locData)
            if (locData.status) {
                setButtonLoader(false)
                setSucessStatus(false)
                // this.props.callbackFromParent(Email);
                setTimeout(() => {
                    router.push('/')
                }, 1900);
            } else {
                setButtonLoader(false)
                setGeneralError('Link Has Expired Generate new link')
                // this.setState({ emailError: i18n.t('common.EmailNotFound'), buttonLoader: false })
            }
            //         });
            // } catch (e) {
            //     console.log("error")
            //     // this.setState({ error: true });
            // }
        }
    }
    //common.accountCreatedSuccessfully
    return (
        <>
            <HeaderBlack populerTourData={populerTourInfo} categoryData={categoryInfo} suppressHydrationWarning={true} />

            <div className="reset-password-wrapper">
                {/* <MetaInfo slug="reset-password" />  */}
                {fullScreenLoader ? <FullScreenLoader /> : ''}
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <div className="content-wrapper">
                        <div className="content-components-wrapper">
                            <div className="logo-image-wrapper">
                                <img src={PurpleLogo.src} alt="" className="logo-image" />
                            </div>
                            {tokenVerify ?
                                <>
                                    {
                                        sucessStatus ?
                                            <>
                                                < h5 className="reset-pass-title text-center">{i18n.t('common.resetPassword')}</h5>
                                                <p className="reset-pass-sub-title text-center">{i18n.t('common.EnterYourNewPasswordHere')}</p>
                                                <div className="login-box-wrapper">
                                                    <form className="login-form">
                                                        <span className="error-msg text-center d-block">
                                                            {generalError ? <span className="error-msg">{generalError} </span> : ''}
                                                        </span>
                                                        <div className="popup-input-groups">
                                                            <label htmlFor="password" className="login-label">
                                                                {i18n.t('common.newPassword')}
                                                            </label>
                                                            <div className="password-box-wrap position-relative">
                                                                <input
                                                                    type={passwordShown ? "text" : "password"}
                                                                    id="txtPassword current-password"
                                                                    className="popup-input w-100"
                                                                    name="login_password"
                                                                    placeholder={i18n.t('common.phNewPassword')}
                                                                    value={password}
                                                                    onChange={(event) => setPassword(event.target.value)}

                                                                />
                                                                <div className="EyeIcon">
                                                                    <i
                                                                        id="toggle_pwd"
                                                                        onClick={togglePassword}
                                                                        className={
                                                                            passwordShown
                                                                                ? "fa-regular fa-eye-slash"
                                                                                : "fa-regular fa-eye"
                                                                        }
                                                                    ></i>
                                                                </div>
                                                            </div>
                                                            <span className="error-msg">{passwordError}</span>
                                                        </div>
                                                        <div className="popup-input-groups">
                                                            <label htmlFor="password" className="login-label">
                                                                {i18n.t('common.confirmPassword')}
                                                            </label>
                                                            <div className="password-box-wrap position-relative">
                                                                <input
                                                                    type={conformPasswordShown ? "text" : "password"}
                                                                    id="txtPassword current-password"
                                                                    className="popup-input w-100"
                                                                    name="login_password"
                                                                    placeholder={i18n.t('common.phConfirmPassword')}
                                                                    value={confirmPassword}
                                                                    onChange={(event) => setConfirmPassword(event.target.value)}

                                                                />
                                                                <div className="EyeIcon">
                                                                    <i
                                                                        id="toggle_pwd"
                                                                        onClick={toggleConfPassword}
                                                                        className={
                                                                            conformPasswordShown
                                                                                ? "fa-regular fa-eye-slash"
                                                                                : "fa-regular fa-eye"
                                                                        }
                                                                    ></i>
                                                                </div>
                                                            </div>
                                                            <span className="error-msg">{confirmPasswordError}</span>
                                                        </div>

                                                        <div className="login-submit-btn">
                                                            <button
                                                                className={`SecondaryButton ${buttonLoader}`}
                                                                disabled={buttonLoader}
                                                                onClick={handleSubmit}
                                                            >
                                                                {buttonLoader ? <span className='button-loader'></span> : i18n.t('common.resetPassword')}
                                                            </button>

                                                        </div>
                                                    </form>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="sucess-password-change text-center pb-4">
                                                    <img src={AccountSuccess} alt="" className="VerifyMailImg" />
                                                </div>
                                                <h5 className="reset-pass-title text-center">{i18n.t('common.PasswordChangedSuccessfully')}</h5>
                                                <p className="reset-pass-sub-title text-center">{i18n.t('common.Youllberedirectedtohomepageifthen')} <a href="/" className="click-here-link">{i18n.t('common.clickHere')}</a></p>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <div className="sucess-password-change text-center pb-4">
                                        <img src={ExpireLink} alt="" className="VerifyMailImg" />
                                    </div>
                                    <h5 className="reset-pass-title text-center">{i18n.t('common.linkExpired')}</h5>
                                    <p className="reset-pass-sub-title-lg text-center">{i18n.t('common.RegenerateLinkFromForgotPassword')}</p>
                                    <p className="reset-pass-sub-title text-center">{i18n.t('common.Youllberedirectedtohomepageifthen')} <a href="/" className="click-here-link">{i18n.t('common.clickHere')}</a></p>
                                </>
                            }

                        </div>
                    </div>
                </div >
            </div >
            <Footer
                locationInfo={locationInfo}
                categoryInfo={categoryInfo}
                contactDataInfo={contactDataInfo}
                selectedLanguageCode={selectedLanguageCode}
            />
        </>
    );
}