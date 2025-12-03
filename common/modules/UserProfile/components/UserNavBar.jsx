
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ProfileIconImg from '@/public/assets/images/profile-outlined.svg'
import TripIconImg from '@/public/assets/images/bx_trip.svg'
import SettingIconImg from '@/public/assets/images/bytesize_settings.svg'
import SignOutIconImg from '@/public/assets/images/charm_sign-out.svg'
import Nav from 'react-bootstrap/Nav';
import { Trans } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FullScreenLoader from '../../FullScreenLoader/FullScreenLoader';

const UserNavBar = (props) => {

    const router = useRouter();
    const { query } = router;
    // const [name, setName] = useState(props.name)
    // const [email, setEmail] = useState(props.email)
    // const [loginStatus, setLoginStatus] = useState('') 

    const [fullScreenLoader, setFullScreenLoader] = useState(false)


    const fullName = props.name
    const initials = fullName
        ? fullName
            .split(" ") // Split full name into words
            .slice(0, 2) // Take the first two words
            .map((word) => word.charAt(0)) // Get the first character of each word
            .join("") // Join the characters to form initials
        : "";



    const handleLogout = () => {
        // Clear the user's session data
        setFullScreenLoader(true)
        localStorage.removeItem('Token-for-login');
        localStorage.removeItem('status');

        // Redirect the user to the desired page (e.g., the home page)

        router.push('/'); // Redirect to the home page

        // Optionally, you can also display a message to confirm the logout if needed
        // alert('You have been logged out.');

    };

    const handletabchange = (e, data) => {
        // console.log("data dadasghdashdkjha;ld", data)
        props.getstate(data)
    }

    useEffect(() => {

    }, [router.asPath])


    return (
        <>
            {fullScreenLoader ? <FullScreenLoader /> :
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 pb-4">
                    <div className="user-navigation">
                        <div className="user-name-info d-flex align-items-center">
                            {/* <img src={UserImg} /> */}
                            <div className='user-initials'>
                                <span className='user-initials-text m-0 text-uppercase'>{initials}</span>
                            </div>
                            <div className="user-name-emial">
                                <h6>{props.name}</h6>
                                <p>{props.email}</p>
                            </div>
                        </div>
                        <div className="user-account-navigation">
                            <Nav className="flex-column user-navbar">
                                <Nav.Link eventKey="/user/?profile" className={router.asPath === "/user/?profile" ? "active" : "not-link"} >
                                    <Link href='/user/?profile' className='nounderline'>
                                        <div className="drop-item-wrapper d-flex align-items-center">
                                            <img src={ProfileIconImg.src} alt="" />
                                            <p><Trans i18nKey="common.profile"></Trans></p>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link eventKey="user/?trips" className={router.asPath === "/user/?trips" ? "active" : "not-link"} >
                                    <Link href='/user/?trips' className='nounderline'>
                                        <div className="drop-item-wrapper d-flex align-items-center">
                                            <img src={TripIconImg.src} alt="" />
                                            <p><Trans i18nKey="common.trips"></Trans></p>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link eventKey="user/?settings" className={router.asPath === "/user/?settings" ? "active" : "not-link"} >
                                    <Link href='/user/?settings' className='nounderline'>
                                        <div className="drop-item-wrapper d-flex align-items-center">
                                            <img src={SettingIconImg.src} alt="" />
                                            <p><Trans i18nKey="common.settings"></Trans></p>
                                        </div>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link eventKey="sign-out">
                                    <Link href={'/'} className='nounderline' onClick={handleLogout}>
                                        <div className="drop-item-wrapper d-flex align-items-center">
                                            <img src={SignOutIconImg.src} alt="" />
                                            <p className='red-color-txt'><Trans i18nKey="common.signOut"></Trans></p>
                                        </div>
                                    </Link>
                                </Nav.Link>
                            </Nav>

                            <Dropdown className="user-account-drop-down-nav">
                                <Dropdown.Toggle className="UserIcon only-for-drop-down" id="dropdown-basic">
                                    {props.dataDropValue}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link href={`/user/?profile`} className='nounderline'>
                                            <div className="drop-item-wrapper d-flex align-items-center">
                                                <img src={ProfileIconImg.src} alt="" />
                                                <p><Trans i18nKey="common.profile"></Trans></p>
                                            </div>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href='/user/?trips' className='nounderline'>
                                            <div className="drop-item-wrapper d-flex align-items-center">
                                                <img src={TripIconImg.src} alt="" />
                                                <p><Trans i18nKey="common.trips"></Trans></p>
                                            </div>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href='/user/?settings' className='nounderline'>
                                            <div className="drop-item-wrapper d-flex align-items-center">
                                                <img src={SettingIconImg.src} alt="" />
                                                <p><Trans i18nKey="common.settings"></Trans></p>
                                            </div>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href='/' className='nounderline' onClick={handleLogout}>
                                            <div className="drop-item-wrapper d-flex align-items-center">
                                                <img src={SignOutIconImg.src} alt="" />
                                                <p className='red-color-txt'><Trans i18nKey="common.signOut"></Trans></p>
                                            </div>
                                        </Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserNavBar
