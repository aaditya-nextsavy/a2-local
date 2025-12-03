import { useEffect, useState } from 'react';
import VerifyEmailPopup from './VerifyEmailPopup';
import ArrowRightImg from '@/public/assets/images/arrow-right.svg';
import i18n from 'i18next';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

const VerifyEmailButton = ({ userProfileData }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true)

    const close = () => {
        setShowModal(false);
    };

    const open = () => {
        setShowModal(true);
    };
    useEffect(() => {
        if (userProfileData) {
            setLoading(false)
        }
    }, [])


    return (
        <>
            {loading ? '' :
                <>
                    <button className="PrimaryButton" onClick={open}>
                        {i18n.t('common.verifyEmail')}
                        <img src={ArrowRightImg.src} className="arrowRightBtn" />
                    </button>

                    <VerifyEmailPopup showModal={showModal} onClose={close} userProfileData={userProfileData} />
                </>
            }
        </>
    );
};

export default VerifyEmailButton;
