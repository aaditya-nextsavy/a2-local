import Footer from '@/common/modules/Footer/Footer';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import HeaderBlack from '@/common/modules/Header/HeaderBlack';
import DeleteButton from '@/common/modules/UserProfile/components/DeleteButton';
import ProfileInfo from '@/common/modules/UserProfile/components/ProfileInfo';
import SettingsInfo from '@/common/modules/UserProfile/components/SettingsInfo';
import TripInfo from '@/common/modules/UserProfile/components/TripInfo';
import UserNavBar from '@/common/modules/UserProfile/components/UserNavBar';
import VerifyEmailButton from '@/common/modules/UserProfile/components/VerifyEmailButton';
import { fetchCategory, fetchContactData, fetchLocations, fetchPopulerTours, fetchUserProfileDetails } from '@/pages/api';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

const UserProfilePage = ({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo }) => {
  const [selectedOption, setSelectedOption] = useState('profileInfo');
  const [fullScreenLoader, setFullScreenLoader] = useState(true)
  const [userProfile, setUserProfile] = useState([])
  const router = useRouter();
  const selectedLanguageCode = router.locale || 'en';

  const deviceId = "deviceId";
  const userAgent = "userAgent";
  let token

  const handleTabState = (data) => {
    setFullScreenLoader(true)
    console.log("userProfile", data);

    switch (data) {
      case 'profileInfo':
        setSelectedOption('profileInfo')
        // Handle profile info logic or component rendering
        break;
      case 'trips':
        setSelectedOption('trips')
        // Handle trips logic or component rendering
        break;
      case 'settings':
        setSelectedOption('settings')
        // Handle settings logic or component rendering
        break;
      default:
      // Handle a default case if needed
    }
    setFullScreenLoader(false)
  };
  let tokenRef = useRef(null); // Initialize with null

  useEffect(() => {
    if (typeof window !== 'undefined') {
      tokenRef.current = localStorage.getItem('Token-for-login');
    }
  }, []);
  useEffect(() => {

    setFullScreenLoader(false)
    token = tokenRef;
    getUserDetails()
    if ('settings' in router.query) {
      handleTabState('settings')
    }
    if ('trips' in router.query) {
      handleTabState('trips')
    }
    if ('profile' in router.query) {
      handleTabState('profileInfo')
    }

    console.log("router", router)

  }, [router.query, router.locale, tokenRef])

  // useEffect(() => {

  // }, [selectedLanguageCode])


  const getUserDetails = async () => {
    if (typeof window !== 'undefined') {
      // Check if we are on the client side
      token = localStorage.getItem('Token-for-login');
      const getProfileDetails = await fetchUserProfileDetails({ selectedLanguageCode, userAgent, deviceId, token });
      if (getProfileDetails === undefined) {
        router.push('/');
      } else {
        setUserProfile(getProfileDetails);
      }
      console.log("getProfileDetails", getProfileDetails);
      setFullScreenLoader(false);
    }
  }

  const handleChildDataEdit = (data) => {
    console.log("handleChildDataEdit", data)
    getUserDetails();
  }

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
      {fullScreenLoader ? <FullScreenLoader /> :

        <div className="user-profile-wrapper">
          <HeaderBlack
            categoryData={categoryInfo}
            populerTourData={populerTourInfo}
          />
          <div className="user-background-black">
          </div>

          <div className="user-content-wrapper">
            <div className="container">
              <div className="row">
                <UserNavBar getstate={handleTabState} name={userProfile.name} email={userProfile.email} />
                <div className='col-xl-6 col-lg-6 col-md-7 col-sm-12 position-relative'>
                  {!userProfile.email_verified_at ?
                    <div className="d-flex">
                      <div className="verify-Mail verify-button-wrapper pb-4"> <VerifyEmailButton userProfileData={userProfile.email} /></div>

                      {/* 
                    <div className="verify-phone verify-button-wrapper pb-4 px-3">
                      <VerifyPhoneButton />
                    </div> 
                    */}
                    </div> : ""}

                  {selectedOption ?
                    <div className="user-profile-info-wrapper">
                      {selectedOption === 'trips' && (
                        <TripInfo />
                      )}

                      {selectedOption === 'settings' && (
                        <>
                          <SettingsInfo />
                          <DeleteButton callbackFromParent={handleDeletedAccount} userId={userProfile.id} />
                        </>
                      )}

                      {selectedOption === 'profileInfo' && (
                        <ProfileInfo userProfileData={userProfile} onChildDataEdit={handleChildDataEdit} />
                      )}
                    </div>
                    : ''}
                </div>
              </div>
            </div>
          </div>
          {/* <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} /> */}
        </div>

      }
    </>

  );
};


export const getServerSideProps = async ({ query }) => {
  const selectedLanguageCode = query.lang || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';

  try {
    const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
    const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
    const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
    const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
    return {
      props: {
        selectedLanguageCode,
        locationInfo: locations.data,
        categoryInfo: categorys.data,
        contactDataInfo: contactData,
        populerTourInfo: populerTour,
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        locationInfo: null, // Handle the error by setting locationInfo to null or an appropriate value
        categoryInfo: null,
        contactDataInfo: null,
        populerTourInfo: null,
      }
    };
  }
}

export default UserProfilePage;
