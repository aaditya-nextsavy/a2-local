import { useState } from 'react';
import DeleteButtonPopup from './DeleteButtonPopup';
import { Trans } from 'react-i18next';

const DeleteButton = (props) => {
    const [showModal, setShowModal] = useState(false);

    const open = () => {
        setShowModal(true);
    };

    const close = () => {
        setShowModal(false);
    };

    const handleChildData = (data) => {
        if (data) {
            close();
            // Assuming you have a callback function to pass data to the parent component
            // this.props.callbackFromParent(data);
        }
    };

    return (
        <>
            <div className="delete-button-wrapper">
                <button className="DeleteButton" onClick={open}>
                    <img src="/assets/images/delete-btn.svg" alt="delete-btn" />
                    <Trans i18nKey="common.deleteAccount"></Trans>
                </button>
            </div>
            <DeleteButtonPopup showModal={showModal} onClose={close} callbackFromParent={handleChildData} userId={props.userId}/>
        </>
    );
};

export default DeleteButton;
