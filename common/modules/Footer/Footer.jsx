import React, { useEffect, useState } from 'react'
import logo from '@/public/assets/images/logo.png'
import visionlogo from '@/public/assets/images/vision.png'
import { Trans } from 'react-i18next';

import linkedin from '@/public/assets/images/Icon.svg'
import insta from '@/public/assets/images/Icon-1.svg'
import youtube from '@/public/assets/images/Icon-2.svg'
import twitter from '@/public/assets/images/Icon-3.svg'
import fb from '@/public/assets/images/Icon-4.svg'
import mobileIcon from '@/public/assets/images/phone-Ftr.svg'
import mailIcon from '@/public/assets/images/Email-Ftr.svg'
import Link from 'next/link';

function Footer({ locationInfo, categoryInfo, contactDataInfo, selectedLanguageCode }) {
const [clientSide, setClientSide] = useState(false);
useEffect(() => {
    setClientSide(true);
}, [])

    // const { pathname } = useLocation();
    let contactInfo = contactDataInfo ? contactDataInfo[0] : null

    if (!contactInfo) {
        // console.log("contactDataInfo", contactDataInfo)
        return;
    }

    // const handlePlaceLinkClick = () => {
    //     if (pathname === '/tours') {
    //         window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }
    // };




    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className='site-footer'>
                <div className="container">
                    <div className='row flex-column-reverse flex-lg-row justify-content-lg-between'>
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 contact-info-right">
                            <div className="footer-logo">
                                <Link href="/" className='nounderline'> <img src={logo.src} className="logoHeader" alt="logo" /></Link>
                                <img src={visionlogo.src} className="visonlogo" alt="visonlogo" />
                            </div>
                            <div className="row">
                                <div className="col-xl-12 pb-3 col-lg-12 col-md-6 col-sm-12 office">
                                    {contactInfo ? <div className='address-info'>
                                        <h6><Trans i18nKey="Footer.office"></Trans></h6>
                                        <Link href={contactInfo.map_link} target='_blank' className='nounderline'>
                                            {clientSide ? <p dangerouslySetInnerHTML={{ __html: `${contactInfo.office_address}` }}>
                                            </p> : null}
                                        </Link>
                                    </div> : ''}
                                </div>
                                {contactInfo.mobile_number || contactInfo.phone_number || contactInfo.email_address ?
                                    <div className="col-xl-12 pb-xl-3 col-lg-12 col-md-6 col-sm-12">
                                        <h6><Trans i18nKey="Footer.contact"></Trans></h6>

                                        <ul className="contact list-footer">
                                            {contactInfo.mobile_number ? <li>
                                                {selectedLanguageCode === 'ar' ?
                                                    <>
                                                        <Link href={`tel:${contactInfo.mobile_number}`}>
                                                            {contactInfo.mobile_number}
                                                        </Link>
                                                        {" "} <img className='icon-img' src={mobileIcon.src} />
                                                    </> :
                                                    <>
                                                        <img className='icon-img' src={mobileIcon.src} /> {" "}
                                                        <Link href={`tel:${contactInfo.mobile_number}`}>
                                                            {contactInfo.mobile_number}
                                                        </Link>
                                                    </>
                                                }

                                            </li> : ''}
                                            {contactInfo.phone_number ? < li >
                                                {selectedLanguageCode === 'ar' ?
                                                    <>
                                                        <Link href={`tel:${contactInfo.phone_number}`}>
                                                            {contactInfo.phone_number}
                                                        </Link>
                                                        {" "} <img className='icon-img' src={mobileIcon.src} />
                                                    </> :
                                                    <>
                                                        <img className='icon-img' src={mobileIcon.src} /> {" "}
                                                        <Link href={`tel:${contactInfo.phone_number}`}>
                                                            {contactInfo.phone_number}
                                                        </Link>
                                                    </>
                                                }

                                            </li> : ''}
                                            {contactInfo.email_address ? <li>
                                                {selectedLanguageCode === 'ar' ?
                                                    <>
                                                        <Link href={`mailto:${contactInfo.email_address}`}>
                                                            {contactInfo.email_address}
                                                        </Link>
                                                        {" "} <img className='icon-img' src={mailIcon.src} />
                                                    </> :
                                                    <>
                                                        <img className='icon-img' src={mailIcon.src} /> {" "}
                                                        <Link href={`mailto:${contactInfo.email_address}`}>
                                                            {contactInfo.email_address}
                                                        </Link>
                                                    </>
                                                }

                                            </li> : ''}
                                        </ul>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                        {/* <div className="col-xl-1 col-lg-1"></div> */}
                        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 pb-3">
                            <div className='list-footer-wrapper'>
                                <div className="row">
                                    <div className='col-xl-1 col-lg-2 col-md-12 col-sm-12 d-none d-lg-block pb-5'>
                                        {/*<h6><Trans i18nKey="Footer.experienceSaudi"></Trans></h6>
                                            <ul className='experience list-footer'>
                                                {Experience ? Experience.map(expData =>
                                                    <Link href={`/tours/?&experience-id=${expData.id}&experience-title=${expData.title}`} className="nounderline" >
                                                        <li key={expData.id} id={expData.id}>
                                                            {expData.title}
                                                        </li>
                                                    </Link>
                                                ) : "No Data"}

                                            </ul> */}
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 pb-5">
                                        <h6><Trans i18nKey="Footer.place"></Trans></h6>
                                        <div className='align-beside'>
                                            <ul className='place list-footer'>
                                                {locationInfo ? locationInfo.slice(0, 12).map(placeData =>
                                                    <Link href={`/tours/?locations=${placeData.slug}`} key={placeData.id} className="nounderline">
                                                        <li key={placeData.id} id={placeData.id} ><Trans i18nKey="common.ToursIn"></Trans> {placeData.location}</li>
                                                    </Link>
                                                ) : "no data"}
                                            </ul>

                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pb-5">
                                        <h6><Trans i18nKey="common.categories"></Trans></h6>
                                        <ul className='categories list-footer'>
                                            {categoryInfo ? categoryInfo.slice(0, 6).map(catDate =>
                                                <Link href={`/tours/?categories=${catDate.slug}`} key={catDate.id} className="nounderline">
                                                    <li key={catDate.id} id={catDate.id}>{catDate.title}</li>
                                                </Link>
                                            ) : "No Data"}
                                        </ul>
                                    </div>

                                    <div className="col-xl-2 col-lg-5 col-md-5 col-sm-5 pb-5 addpaddingmobile">
                                        <h6><Trans i18nKey="Footer.company"></Trans></h6>
                                        <ul className='company list-footer'>

                                            <Link href={`/blogs`} className="nounderline"><li><Trans i18nKey="Footer.blogs"></Trans></li></Link>
                                            <Link href={`/about-us`} className="nounderline" ><li><Trans i18nKey="Footer.aboutUs"></Trans></li></Link>
                                            <Link href={`/contact-us`} className="nounderline" ><li><Trans i18nKey="Footer.contactUs"></Trans></li></Link>
                                            <Link href={`/faqs`} className="nounderline" ><li><Trans i18nKey="Footer.faqs"></Trans></li></Link>
                                            <Link href={`/terms-of-use`} className="nounderline" ><li><Trans i18nKey="common.termsOfUse"></Trans></li></Link>
                                            <Link href={`/privacy-policy`} className="nounderline" ><li><Trans i18nKey="common.privacyPolicy"></Trans></li></Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='social-icons'>
                        <ul className='social-icons-menu'>
                            {contactInfo.linked_link ? <li><Link href={`${contactInfo.linked_link}`} target='_black' className='nounderline'><img className='icon-img' src={linkedin} /></Link></li> : ''}
                            {contactInfo.insta_link ? <li><Link href={`${contactInfo.insta_link}`} target='_black' className='nounderline'><img className='icon-img' src={insta} /></Link></li> : ''}
                            {contactInfo.youtube_link ? <li><Link href={`${contactInfo.youtube_link}`} target='_black' className='nounderline'><img className='icon-img' src={youtube} /></Link></li> : ''}
                            {/* <li><Link href="//twitter.com/AthaarArabia" target='_black' className='nounderline'><img className='icon-img' src={twitter} /></Link></li> */}
                            {/* <li><Link href="/" target='_black' className='nounderline'><img className='icon-img' src={fb} /></Link></li> */}
                        </ul>
                    </div>

                </div>
                <div className='sub-footer'>
                    <div className='container sub-footer-flex'>
                    <p><Trans i18nKey="Footer.copyrightPart1"></Trans> {currentYear ? currentYear : '2024'} <Trans i18nKey="Footer.copyrightPart2"></Trans> <Link href="/" target="_blank" className='nounderline'><span><Trans i18nKey="Footer.companyName"></Trans></span></Link></p>
                    <p><Link href="https://www.nextsavy.com/" target='_blank' className='nounderline'><span><Trans i18nKey="Footer.craftedby"></Trans> <Trans i18nKey="Footer.craftedCompanyName"></Trans></span></Link></p>
                    </div>
                    </div>
            </footer >
        </>
    )
}
export default Footer
