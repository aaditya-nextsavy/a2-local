import { Trans } from 'next-i18next'
import React from 'react'
import EditSettingButton from './EditSettingButton'
import DeleteButton from './DeleteButton'
import SettingIconImg from '@/public/assets/images/bytesize_settings.svg'

const SettingsInfo = ({selectedLanguageCode}) => {


  const handleDeletedAccount = (data) => {
    if (data) {
      setTimeout(() => {
        // Clear the local storage and redirect the user to the home page
        localStorage.removeItem('Token-for-login');
        localStorage.removeItem('status');

      }, 500);
    }
  }
    return (
        <>
            <div className="user-profile-info-header d-flex align-items-center justify-content-between">
                <div className="drop-item-wrapper d-flex align-items-center">
                    <img src={SettingIconImg.src} alt="" />
                    <p><Trans i18nKey="common.settings"></Trans></p>
                </div>
                <div className="header-edit-btn">
                    {/* <Link to='/edit-setting' className='nounderline'>
                        <button className='ButtonSmall'>
                          <img src={EditIconImg} /> Edit
                        </button>
                      </Link> */}
                    <EditSettingButton />
                </div>
            </div>
            <div className="user-profile-data">
                <table className='user-info-table'>
                    <tbody>
                        <tr>
                            <td scope="row">
                                <p className='user-bold'><Trans i18nKey="common.password"></Trans> :</p>
                            </td>
                            <td>
                                <p className='user-values' >**********</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
           
        </>
    )
}

export default SettingsInfo