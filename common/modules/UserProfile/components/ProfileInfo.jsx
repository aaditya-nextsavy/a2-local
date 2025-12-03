import React from 'react'
import ProfileIconImg from '@/public/assets/images/profile-outlined.svg';
import { Trans } from 'next-i18next';
import EditProfileButton from './EditProfileButton';

const ProfileInfo = ({ userProfileData, onChildDataEdit }) => {

    const handleChildDataEdit = (data) => {
        onChildDataEdit(data)
        
    }
    return (
        <>
            <div className="user-profile-info-header d-flex align-items-center justify-content-between">
                <div className="drop-item-wrapper d-flex align-items-center">
                    <img src={ProfileIconImg.src} alt="" />
                    <p><Trans i18nKey="common.profile"></Trans></p>
                </div>
                <div className="header-edit-btn">
                    <EditProfileButton userProfileData={userProfileData} callbackFromParent={handleChildDataEdit} />
                </div>
            </div>
            <div className="user-profile-data">
                <table className='user-info-table'>
                    <tbody>
                        <tr>
                            <td scope="row">
                                <p className='user-bold'><Trans i18nKey="common.name"></Trans></p>
                            </td>
                            <td>
                                <p className='user-values text-capitalize'>{userProfileData.name ? userProfileData.name : userProfileData.first_name}</p>
                            </td>

                        </tr>
                        <tr>
                            <td scope="row">
                                <p className='user-bold'><Trans i18nKey="common.email"></Trans></p>

                            </td>
                            <td className='d-flex align-items-center'>
                                <p className='user-values'>{userProfileData.email}</p>{userProfileData.email_verified_at ? <span className='verified-tag'><img src='/assets/images/confirm_success.svg' className='verified-logo w-25 px-1' /></span> : ""}
                            </td>

                        </tr>
                        <tr>
                            <td scope="row">
                                <p className='user-bold'><Trans i18nKey="common.phoneNumber"></Trans></p>

                            </td>
                            <td>
                                <p className='user-values'>{userProfileData.mobile}</p><span className='verified-tag'></span>
                            </td>

                        </tr>
                        <tr>
                            <td scope="row">
                                <p className='user-bold'><Trans i18nKey="common.country"></Trans></p>

                            </td>
                            <td>
                                <p className={`user-values ${userProfileData.country ? '' : 'disabled'}`}>{userProfileData.country ? userProfileData.country : 'Not Selected'}</p>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProfileInfo