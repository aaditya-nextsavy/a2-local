import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import SubPageHeader from '@/common/modules/SubPageHeaders/SubPageHeader';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import i18n from "i18next";
import { Trans } from "react-i18next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/common/modules/Footer/Footer';
import mobileIcon from '@/public/assets/images/phone-cont.svg'
import mailIcon from '@/public/assets/images/Email-cont.svg'
import Image from 'next/image';
import ContactUsForm from '@/common/modules/Contact-us/ContactUsForm';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, submitContactForm } from '../api';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import CaptchaBlock from '@/common/modules/CaptchaBlock/CaptchaBlock';

const Index = ({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) => {
    const router = useRouter();
    const selectedLanguageCode = router.locale || 'en';
    const [fullScreenLoader, setFullScreenLoader] = useState(true)
    const [isClient, setIsClient] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        message: '',
    });
    const [errWidgetStatus, setErrWidgetStatus] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true)
            setFullScreenLoader(false)
        }, 1000);
    }, [])

    const [buttonLoader, setButtonLoader] = useState(false)

    const [errName, setErrName] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPhone, setErrPhone] = useState('')
    const [errCountry, setErrCountry] = useState('')
    const [errMessage, setErrMessage] = useState('')


    let contactInfo = contactDataInfo ? contactDataInfo[0] : null

    let schema
    let canonicalPageURL

    if (selectedLanguageCode === 'ar') {
        canonicalPageURL = '/ar/contact-us'
        schema = {
            "@context": "http://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
                "@type": "ContactPoint",
                "telephone": [contactInfo.mobile_number, contactInfo.phone_number],
                "email": contactInfo.email_address,
                "contactType": "Customer Service",
                "url": "https://athaararabia.com/ar/contact-us"
            }
        }
    } else {
        canonicalPageURL = '/contact-us'
        schema = {
            "@context": "http://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
                "@type": "ContactPoint",
                "telephone": [contactInfo.mobile_number, contactInfo.phone_number],
                "email": contactInfo.email_address,
                "contactType": "Customer Service",
                "url": "https://athaararabia.com/contact-us"
            }
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Form submitted: ', formData);
        // You can submit the formData to your API or store it in local storage here

        var Name = formData.name
        var Email = formData.email
        var PhoneNumber = formData.phone ? formData.phone : ''
        var Country = formData.country
        var Message = formData.message

        setErrName('')
        setErrEmail('')
        setErrPhone('')
        setErrCountry('')
        setErrMessage('')

        setButtonLoader(true)

        let isValid = true;

        // Validate name
        if (!Name) {
            setErrName(i18n.t('common.validationFieldRequired'));
            // console.log("The name field is required")
            isValid = false;
            setButtonLoader(false)
        }

        // Validate email
        if (!Email) {
            setErrEmail(i18n.t('common.validationFieldRequired'))
            // console.log("The email field is required")
            isValid = false;
            setButtonLoader(false)
        }

        // Validate nationality
        if (!Country) {
            setErrCountry(i18n.t('common.validationFieldRequired'))
            // console.log("The country field is required")
            isValid = false;
            setButtonLoader(false)
        }

        // Validate date
        if (!Message) {
            setErrMessage(i18n.t('common.validationFieldRequired'))
            // console.log("The Message is required")
            isValid = false;
            setButtonLoader(false)
        }

        // Validate phone number using react-phone-number-input

        if (PhoneNumber.trim() === '') {
            setErrPhone(i18n.t('common.validationFieldRequired'), PhoneNumber)

            // console.log("Phone number is required ", " first if", PhoneNumber)
            isValid = false;
            setButtonLoader(false)
        } else if (!isValidPhoneNumber(PhoneNumber)) {
            setErrPhone(i18n.t('common.validationInvalidPhoneNumber'))

            // console.log("Invalid phone number ", " second if",)
            isValid = false;
            setButtonLoader(false)
        }
        if (errWidgetStatus === false) {
            // setErrCaptchaValidation('!')
            isValid = false;
            setButtonLoader(false);
        }

        if (isValid) {
            // console.log("isValid", isValid)
            setErrName('')
            setErrEmail('')
            setErrPhone('')
            setErrCountry('')
            setErrMessage('')
            setButtonLoader(true)
            setIntoApi(formData)

        }
    }

    const setIntoApi = async (formData) => {
        var Name = formData.name
        var Email = formData.email
        var PhoneNumber = formData.phone
        var Country = formData.country
        var Message = formData.message

        try {
            const ContactUsForm = await submitContactForm({
                selectedLanguageCode,
                userAgent: 'userAgent',
                deviceId: 'deviceId',
                Name,
                Email,
                PhoneNumber,
                Country,
                Message,

            });

            console.log("data from api call submitContactForm", ContactUsForm);

            if (ContactUsForm.status === true) {
                // Set apiSuccess to true if the status is true
                router.push("/contact-us/thank-you");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        } finally {
            setButtonLoader(false)
        }
    }

    const handleStatus = (childStatus) => {
        setErrWidgetStatus(childStatus)
        // console.log("childStatus handleStatus", childStatus);
    };



    // console.log("contactInfo", contactInfo)

    const titleHeaderMain = <Trans i18nKey="contactUs.title"></Trans>
    const titleHeaderSub = <Trans i18nKey="common.contactUs"></Trans>

    return (
        <>
            <MetaInfo metainfo={metaDataInfo} seoSchema={schema} seoCanonical={canonicalPageURL} />
            {fullScreenLoader ? <FullScreenLoader /> :
                <>
                    <div className="contactus-wrapper">
                        <SubPageHeader
                            TitleSub={titleHeaderSub}
                            TitleMain={titleHeaderMain}
                            locationData={locationInfo}
                            categoryData={categoryInfo}
                            populerTourData={populerTourInfo}
                        />

                        <div className="contactus-info">
                            <div className="container">
                                <div className="row flex-column-reverse flex-lg-row">
                                    <div className="col-lg-5 col-md-12 col-sm-12">
                                        <div className="contact-info">

                                            {contactInfo.office_address ? <div className="address pb-4">
                                                <h6><Trans i18nKey="Footer.office"></Trans></h6>
                                                <Link href={contactInfo.map_link} target='_blank' className='nounderline'>
                                                    <p dangerouslySetInnerHTML={{ __html: `${contactInfo.office_address}` }}>
                                                        {/* Al Shitaiwi Tours<br />
                                    As Sulimaniyah, Prince Mamdouh <br />Bin AbdulAziz Road,<br />
                                    Riyadh, 12245<br />
                                    Saudi Arabia */}
                                                    </p>
                                                </Link>
                                            </div> : ''}
                                            {/* <GeolocationComponent/> */}
                                            <div className="contact pb-4">
                                                <h6><Trans i18nKey="common.contact"></Trans></h6>
                                                <ul className='contact list-footer'>
                                                    {contactInfo.mobile_number ? <li>
                                                        {selectedLanguageCode === 'ar' ?
                                                            <>
                                                                <Link href='/' onClick={(e) => handlePhoneClick(e, contactInfo.mobile_number)} className="tel-link nounderline">
                                                                    {contactInfo.mobile_number}
                                                                </Link>
                                                                {" "} <Image className='icon-img' src={mobileIcon} alt="mobile icon" width={18} height={18}   />
                                                            </> :
                                                            <>
                                                                <Image className='icon-img' src={mobileIcon} alt='mobile icon' width={18} height={18}   /> {" "}
                                                                <Link href='/' onClick={(e) => handlePhoneClick(e, contactInfo.mobile_number)} className="tel-link nounderline">
                                                                    {contactInfo.mobile_number}
                                                                </Link>
                                                            </>
                                                        }

                                                    </li> : ''}
                                                    {contactInfo.phone_number ? <li>
                                                        {selectedLanguageCode === 'ar' ?
                                                            <>
                                                                <Link href='/' onClick={(e) => handlePhoneClick(e, contactInfo.phone_number)} className="tel-link nounderline">
                                                                    {contactInfo.phone_number}
                                                                </Link>
                                                                {" "} <Image className='icon-img' src={mobileIcon} alt="mobile icon" width={18} height={18}   />
                                                            </> :
                                                            <>
                                                                <Image className='icon-img' src={mobileIcon} alt="mobile icon" width={18} height={18}   /> {" "}
                                                                <Link href='/' onClick={(e) => handlePhoneClick(e, contactInfo.phone_number)} className="tel-link nounderline">
                                                                    {contactInfo.phone_number}
                                                                </Link>
                                                            </>}

                                                    </li> : ''}
                                                    {contactInfo.email_address ? <li>
                                                        {selectedLanguageCode === 'ar' ?
                                                            <>
                                                                <Link href='/' onClick={(e) => handleEmailClick(e, contactInfo.email_address)} className="tel-link nounderline">
                                                                    {contactInfo.email_address}
                                                                </Link>
                                                                {" "} <Image className='icon-img' src={mailIcon} alt="mail icon" width={18} height={18}   />
                                                            </> :
                                                            <>
                                                                <Image className='icon-img' src={mailIcon} alt="mail icon" width={18} height={18}   /> {" "}
                                                                <Link href='/' onClick={(e) => handleEmailClick(e, contactInfo.email_address)} className="tel-link nounderline">
                                                                    {contactInfo.email_address}
                                                                </Link>
                                                            </>}

                                                    </li> : ''}
                                                </ul>
                                            </div>
                                            {contactInfo.map_iframe ? <div className="location pb-4">
                                                <h6><Trans i18nKey="common.location"></Trans></h6>
                                                <div className="img-location-map" dangerouslySetInnerHTML={{ __html: `${contactInfo.map_iframe}` }}>
                                                </div>
                                            </div> : ''}
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-md-12 col-sm-12 pb-5">
                                        <div className="contact-form">
                                            <div className="BlockTitle  d-flex align-items-center">
                                                <Image src='/assets/images/contact-form.svg' alt="contact-form" width={100} height={100} />
                                                <h4><Trans i18nKey="common.contactUs"></Trans></h4>
                                            </div>
                                            {/* <ContactUsForm /> */}
                                            <form className='contact-form-data' onSubmit={handleSubmit}>
                                                <div className="input-group-contact">
                                                    <label for="name"><Trans i18nKey="common.name"></Trans></label>
                                                    <input type="text" className='inputArea' id='name' placeholder={i18n.t('common.phName')} onChange={handleChange} />
                                                    <span className='error-msg'>{errName}</span>
                                                </div>
                                                <div className="input-group-contact">
                                                    <label for="email"><Trans i18nKey="common.email"></Trans></label>
                                                    <input type="email" className='inputArea' id='email' placeholder={i18n.t('common.phEmail')} onChange={handleChange} />
                                                    <span className='error-msg'>{errEmail}</span>

                                                </div>
                                                <div className="input-group-contact">
                                                    <label for="phone"><Trans i18nKey="common.phoneNumber"></Trans></label>
                                                    <PhoneInput
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        defaultCountry="SA"
                                                        value={formData.phone}
                                                        onChange={(phone) => setFormData({ ...formData, phone })}
                                                    />
                                                    <span className='error-msg'>{errPhone}</span>
                                                </div>
                                                <div className="input-group-contact">
                                                    <label for="country"><Trans i18nKey="common.country"></Trans></label>
                                                    <select name="country" className='inputArea dropdown-contact contact-us-dropdown' id="country" value={formData.country} onChange={handleChange} >
                                                        <option value="Select Your Country">{i18n.t('common.phCountrySelect')}</option>
                                                        <option value="Afghanistan">Afghanistan</option>
                                                        <option value="Åland Islands">Åland Islands</option>
                                                        <option value="Albania">Albania</option>
                                                        <option value="Algeria">Algeria</option>
                                                        <option value="American Samoa">American Samoa</option>
                                                        <option value="Andorra">Andorra</option>
                                                        <option value="Angola">Angola</option>
                                                        <option value="Anguilla">Anguilla</option>
                                                        <option value="Antarctica">Antarctica</option>
                                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                        <option value="Argentina">Argentina</option>
                                                        <option value="Armenia">Armenia</option>
                                                        <option value="Aruba">Aruba</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="Austria">Austria</option>
                                                        <option value="Azerbaijan">Azerbaijan</option>
                                                        <option value="Bahamas">Bahamas</option>
                                                        <option value="Bahrain">Bahrain</option>
                                                        <option value="Bangladesh">Bangladesh</option>
                                                        <option value="Barbados">Barbados</option>
                                                        <option value="Belarus">Belarus</option>
                                                        <option value="Belgium">Belgium</option>
                                                        <option value="Belize">Belize</option>
                                                        <option value="Benin">Benin</option>
                                                        <option value="Bermuda">Bermuda</option>
                                                        <option value="Bhutan">Bhutan</option>
                                                        <option value="Bolivia">Bolivia</option>
                                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                        <option value="Botswana">Botswana</option>
                                                        <option value="Bouvet Island">Bouvet Island</option>
                                                        <option value="Brazil">Brazil</option>
                                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                        <option value="Bulgaria">Bulgaria</option>
                                                        <option value="Burkina Faso">Burkina Faso</option>
                                                        <option value="Burundi">Burundi</option>
                                                        <option value="Cambodia">Cambodia</option>
                                                        <option value="Cameroon">Cameroon</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Cape Verde">Cape Verde</option>
                                                        <option value="Cayman Islands">Cayman Islands</option>
                                                        <option value="Central African Republic">Central African Republic</option>
                                                        <option value="Chad">Chad</option>
                                                        <option value="Chile">Chile</option>
                                                        <option value="China">China</option>
                                                        <option value="Christmas Island">Christmas Island</option>
                                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                                        <option value="Colombia">Colombia</option>
                                                        <option value="Comoros">Comoros</option>
                                                        <option value="Congo">Congo</option>
                                                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                                        <option value="Cook Islands">Cook Islands</option>
                                                        <option value="Costa Rica">Costa Rica</option>
                                                        <option value={`Cote D&apos;ivoire`}>Cote D&apos;ivoire</option>
                                                        <option value="Croatia">Croatia</option>
                                                        <option value="Cuba">Cuba</option>
                                                        <option value="Cyprus">Cyprus</option>
                                                        <option value="Czech Republic">Czech Republic</option>
                                                        <option value="Denmark">Denmark</option>
                                                        <option value="Djibouti">Djibouti</option>
                                                        <option value="Dominica">Dominica</option>
                                                        <option value="Dominican Republic">Dominican Republic</option>
                                                        <option value="Ecuador">Ecuador</option>
                                                        <option value="Egypt">Egypt</option>
                                                        <option value="El Salvador">El Salvador</option>
                                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                        <option value="Eritrea">Eritrea</option>
                                                        <option value="Estonia">Estonia</option>
                                                        <option value="Ethiopia">Ethiopia</option>
                                                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                                        <option value="Faroe Islands">Faroe Islands</option>
                                                        <option value="Fiji">Fiji</option>
                                                        <option value="Finland">Finland</option>
                                                        <option value="France">France</option>
                                                        <option value="French Guiana">French Guiana</option>
                                                        <option value="French Polynesia">French Polynesia</option>
                                                        <option value="French Southern Territories">French Southern Territories</option>
                                                        <option value="Gabon">Gabon</option>
                                                        <option value="Gambia">Gambia</option>
                                                        <option value="Georgia">Georgia</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="Ghana">Ghana</option>
                                                        <option value="Gibraltar">Gibraltar</option>
                                                        <option value="Greece">Greece</option>
                                                        <option value="Greenland">Greenland</option>
                                                        <option value="Grenada">Grenada</option>
                                                        <option value="Guadeloupe">Guadeloupe</option>
                                                        <option value="Guam">Guam</option>
                                                        <option value="Guatemala">Guatemala</option>
                                                        <option value="Guernsey">Guernsey</option>
                                                        <option value="Guinea">Guinea</option>
                                                        <option value="Guinea-bissau">Guinea-bissau</option>
                                                        <option value="Guyana">Guyana</option>
                                                        <option value="Haiti">Haiti</option>
                                                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                                        <option value="Honduras">Honduras</option>
                                                        <option value="Hong Kong">Hong Kong</option>
                                                        <option value="Hungary">Hungary</option>
                                                        <option value="Iceland">Iceland</option>
                                                        <option value="India">India</option>
                                                        <option value="Indonesia">Indonesia</option>
                                                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                                        <option value="Iraq">Iraq</option>
                                                        <option value="Ireland">Ireland</option>
                                                        <option value="Isle of Man">Isle of Man</option>
                                                        <option value="Israel">Israel</option>
                                                        <option value="Italy">Italy</option>
                                                        <option value="Jamaica">Jamaica</option>
                                                        <option value="Japan">Japan</option>
                                                        <option value="Jersey">Jersey</option>
                                                        <option value="Jordan">Jordan</option>
                                                        <option value="Kazakhstan">Kazakhstan</option>
                                                        <option value="Kenya">Kenya</option>
                                                        <option value="Kiribati">Kiribati</option>
                                                        <option value="Korea, Democratic People&apos;s Republic of">Korea, Democratic People&apos;s Republic of</option>
                                                        <option value="Korea, Republic of">Korea, Republic of</option>
                                                        <option value="Kuwait">Kuwait</option>
                                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                        <option value="Lao People&apos;s Democratic Republic">Lao People&apos;s Democratic Republic</option>
                                                        <option value="Latvia">Latvia</option>
                                                        <option value="Lebanon">Lebanon</option>
                                                        <option value="Lesotho">Lesotho</option>
                                                        <option value="Liberia">Liberia</option>
                                                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                        <option value="Liechtenstein">Liechtenstein</option>
                                                        <option value="Lithuania">Lithuania</option>
                                                        <option value="Luxembourg">Luxembourg</option>
                                                        <option value="Macao">Macao</option>
                                                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                                        <option value="Madagascar">Madagascar</option>
                                                        <option value="Malawi">Malawi</option>
                                                        <option value="Malaysia">Malaysia</option>
                                                        <option value="Maldives">Maldives</option>
                                                        <option value="Mali">Mali</option>
                                                        <option value="Malta">Malta</option>
                                                        <option value="Marshall Islands">Marshall Islands</option>
                                                        <option value="Martinique">Martinique</option>
                                                        <option value="Mauritania">Mauritania</option>
                                                        <option value="Mauritius">Mauritius</option>
                                                        <option value="Mayotte">Mayotte</option>
                                                        <option value="Mexico">Mexico</option>
                                                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                        <option value="Monaco">Monaco</option>
                                                        <option value="Mongolia">Mongolia</option>
                                                        <option value="Montenegro">Montenegro</option>
                                                        <option value="Montserrat">Montserrat</option>
                                                        <option value="Morocco">Morocco</option>
                                                        <option value="Mozambique">Mozambique</option>
                                                        <option value="Myanmar">Myanmar</option>
                                                        <option value="Namibia">Namibia</option>
                                                        <option value="Nauru">Nauru</option>
                                                        <option value="Nepal">Nepal</option>
                                                        <option value="Netherlands">Netherlands</option>
                                                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                        <option value="New Caledonia">New Caledonia</option>
                                                        <option value="New Zealand">New Zealand</option>
                                                        <option value="Nicaragua">Nicaragua</option>
                                                        <option value="Niger">Niger</option>
                                                        <option value="Nigeria">Nigeria</option>
                                                        <option value="Niue">Niue</option>
                                                        <option value="Norfolk Island">Norfolk Island</option>
                                                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                        <option value="Norway">Norway</option>
                                                        <option value="Oman">Oman</option>
                                                        <option value="Pakistan">Pakistan</option>
                                                        <option value="Palau">Palau</option>
                                                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                        <option value="Panama">Panama</option>
                                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                                        <option value="Paraguay">Paraguay</option>
                                                        <option value="Peru">Peru</option>
                                                        <option value="Philippines">Philippines</option>
                                                        <option value="Pitcairn">Pitcairn</option>
                                                        <option value="Poland">Poland</option>
                                                        <option value="Portugal">Portugal</option>
                                                        <option value="Puerto Rico">Puerto Rico</option>
                                                        <option value="Qatar">Qatar</option>
                                                        <option value="Reunion">Reunion</option>
                                                        <option value="Romania">Romania</option>
                                                        <option value="Russian Federation">Russian Federation</option>
                                                        <option value="Rwanda">Rwanda</option>
                                                        <option value="Saint Helena">Saint Helena</option>
                                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                        <option value="Saint Lucia">Saint Lucia</option>
                                                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                                        <option value="Samoa">Samoa</option>
                                                        <option value="San Marino">San Marino</option>
                                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                                        <option value="Senegal">Senegal</option>
                                                        <option value="Serbia">Serbia</option>
                                                        <option value="Seychelles">Seychelles</option>
                                                        <option value="Sierra Leone">Sierra Leone</option>
                                                        <option value="Singapore">Singapore</option>
                                                        <option value="Slovakia">Slovakia</option>
                                                        <option value="Slovenia">Slovenia</option>
                                                        <option value="Solomon Islands">Solomon Islands</option>
                                                        <option value="Somalia">Somalia</option>
                                                        <option value="South Africa">South Africa</option>
                                                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                                        <option value="Spain">Spain</option>
                                                        <option value="Sri Lanka">Sri Lanka</option>
                                                        <option value="Sudan">Sudan</option>
                                                        <option value="Suriname">Suriname</option>
                                                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                        <option value="Swaziland">Swaziland</option>
                                                        <option value="Sweden">Sweden</option>
                                                        <option value="Switzerland">Switzerland</option>
                                                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                        <option value="Taiwan">Taiwan</option>
                                                        <option value="Tajikistan">Tajikistan</option>
                                                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                                        <option value="Thailand">Thailand</option>
                                                        <option value="Timor-leste">Timor-leste</option>
                                                        <option value="Togo">Togo</option>
                                                        <option value="Tokelau">Tokelau</option>
                                                        <option value="Tonga">Tonga</option>
                                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                        <option value="Tunisia">Tunisia</option>
                                                        <option value="Turkey">Turkey</option>
                                                        <option value="Turkmenistan">Turkmenistan</option>
                                                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                        <option value="Tuvalu">Tuvalu</option>
                                                        <option value="Uganda">Uganda</option>
                                                        <option value="Ukraine">Ukraine</option>
                                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="United States">United States</option>
                                                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                        <option value="Uruguay">Uruguay</option>
                                                        <option value="Uzbekistan">Uzbekistan</option>
                                                        <option value="Vanuatu">Vanuatu</option>
                                                        <option value="Venezuela">Venezuela</option>
                                                        <option value="Viet Nam">Viet Nam</option>
                                                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                        <option value="Western Sahara">Western Sahara</option>
                                                        <option value="Yemen">Yemen</option>
                                                        <option value="Zambia">Zambia</option>
                                                        <option value="Zimbabwe">Zimbabwe</option>
                                                    </select>
                                                    <span className='error-msg'>{errCountry}</span>

                                                </div>
                                                <div className="input-group-contact">
                                                    <label for="message"><Trans i18nKey="common.message"></Trans></label>
                                                    <textarea className='inputArea textareamessage' rows="4" cols="6" placeholder={i18n.t('common.phMessage')} id='message' onChange={handleChange}></textarea>
                                                    <span className='error-msg'>{errMessage}</span>

                                                </div>
                                                <CaptchaBlock callbackStatus={handleStatus} />
                                                <div className="input-group-contact-submit">
                                                    <button
                                                        className={`SecondaryButton ${buttonLoader}`}
                                                        disabled={buttonLoader}
                                                    >
                                                        {buttonLoader ? <span className='button-loader'></span> : <Trans i18nKey="common.submit"></Trans>}
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer
                            locationInfo={locationInfo}
                            categoryInfo={categoryInfo}
                            contactDataInfo={contactDataInfo}
                            selectedLanguageCode={selectedLanguageCode}
                        />
                    </div>
                </>}
        </>
    )
}

export const getServerSideProps = async ({ locale }) => {
    const selectedLanguageCode = locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';
    let slug = "contact-us";

    try {
        const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
        const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
        const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
        return {
            props: {
                selectedLanguageCode,
                locationInfo: locations.data,
                categoryInfo: categorys.data,
                contactDataInfo: contactData,
                populerTourInfo: populerTour,
                metaDataInfo: metaData,
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
                metaDataInfo: null,
            }
        };
    }
}


export default Index