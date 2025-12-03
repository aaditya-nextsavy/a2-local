import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import UserIconImg from '@/public/assets/images/userIcon.svg';
import ProfileIconImg from '@/public/assets/images/profile-outlined.svg';
import TripIconImg from '@/public/assets/images/bx_trip.svg';
import SettingIconImg from '@/public/assets/images/bytesize_settings.svg';
import SignOutIconImg from '@/public/assets/images/charm_sign-out.svg';
import { Trans } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { fetchUserProfileDetails } from '@/pages/api';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useAuth } from '@/lib/AuthContext';


const UserProfileIcon = ({ callbackFromParent }) => {
  const [FullScreenLoaders, setFullScreenLoaders] = useState(false)

  const {logout} = useAuth();
  const history = useRouter();
  const selectedLanguageCode = history.query.lang || 'en';
  const userAgent = 'userAgent';
  const deviceId = 'deviceId';

  const handleLogout = () => {

    const currentPath = history.asPath;
    setFullScreenLoaders(true)
    logout(); // auth cookie logout
    // Array of specific URLs that should trigger the redirection
    const specificURLs = [
      '/user/profile?profile',
      '/user/profile?trips',
      '/user/profile?settings',
    ];

    // Check if the current URL matches any of the specific URLs
    if (specificURLs.includes(currentPath)) {
      // Clear the user's session data
      localStorage.removeItem('Token-for-login');
      localStorage.removeItem('status');
      callbackFromParent(0);
      // Redirect to the home page
      history.push('/');
    } else {
      localStorage.removeItem('Token-for-login');
      localStorage.removeItem('status');
      callbackFromParent(0);
      // Stay on the current page
      // You can also display a message to the user indicating they're logged out.
    }

  };

  const getUserDetails = async () => {
    let token = localStorage.getItem('Token-for-login');
    const getProfileDetails = await fetchUserProfileDetails({ selectedLanguageCode, userAgent, deviceId, token })
    // console.log("getProfileDetails", getProfileDetails);
    if (getProfileDetails === undefined) {
      // statusState(false)
      callbackFromParent(0)
    }
    else {
      if (getProfileDetails.status) {
        // statusState(true)
        callbackFromParent(1)
      }
    }
  }
  useEffect(() => {
    getUserDetails()
  }, [])



  return (
    <>
      {
        FullScreenLoaders ? <FullScreenLoader /> :
          <div className="user-profile-wrapper">
            <Dropdown>
              <Dropdown.Toggle className="UserIcon" id="dropdown-basic">
                <img src={UserIconImg.src} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link href={`/user/?profile`} className="nounderline">
                    <div className="drop-item-wrapper d-flex align-items-center">
                      <img src={ProfileIconImg.src} alt="" />
                      <p><Trans i18nKey="common.profile"></Trans></p>
                    </div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/user/?trips`} className="nounderline">
                    <div className="drop-item-wrapper d-flex align-items-center">
                      <img src={TripIconImg.src} alt="" />
                      <p><Trans i18nKey="common.trips"></Trans></p>
                    </div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/user/?settings`} className="nounderline">
                    <div className="drop-item-wrapper d-flex align-items-center">
                      <img src={SettingIconImg.src} alt="" />
                      <p><Trans i18nKey="common.settings"></Trans></p>
                    </div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div
                    onClick={handleLogout}
                    className="drop-item-wrapper d-flex align-items-center"
                  >
                    <img src={SignOutIconImg.src} alt="" />
                    <p className="red-color-txt"><Trans i18nKey="common.signOut"></Trans></p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
      }
    </>
  );
};

export default UserProfileIcon;
