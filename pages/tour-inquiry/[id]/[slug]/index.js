import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CalenderImg from "@/public/assets/images/icons_calender.svg";
import FlexibleDate from "@/common/modules/MakeTour/FlexibleDate";
import MonthPickerPopup from "@/common/modules/MakeTour/MonthPickerPopup";
import NewTestCalender from "@/common/modules/MakeTour/NewTestCalender";
import SelectedDate from "@/common/modules/MakeTour/SelectedDate";
import i18n from 'i18next';
import { Trans } from "react-i18next";
import FullScreenLoader from "@/common/modules/FullScreenLoader/FullScreenLoader";
import Head from "next/head";
import SubPageHeader from "@/common/modules/SubPageHeaders/SubPageHeader";
import Footer from "@/common/modules/Footer/Footer";
import { fetchCategory, fetchContactData, fetchLocations, fetchPopulerTours, fetchTourDetails, submitTourInquiryForm } from "@/pages/api";
import { useRouter } from "next/router";
import Image from "next/image";

function TourEnquiryMain({ selectedLanguageCode, locationInfo, categoryInfo, contactDataInfo, populerTourInfo }) {
  const [fixedDate, setFixedDate] = useState(false);
  const [tourTitle, setTourTitle] = useState("");
  const [tourDate, setTourDate] = useState('');
  const [makeTourData, setMakeTourData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [monthWeekData, setMonthWeekData] = useState(null);
  const [tourDetailsInfo, setTourDetailsInfo] = useState([]);
  const [anytimeData, setAnytimeData] = useState(i18n.t('makeATour.anytime'));
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dateState, setDateState] = useState(false);
  const [flexState, setFlexState] = useState(false);
  const [anytime, setAnytime] = useState(false);
  const [daysNo, setDaysNo] = useState(1);

  const [noOfTravelers, setNoOfTravelers] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [errName, setErrName] = useState()
  const [errEmail, setErrEmail] = useState(null);
  const [errPhone, setErrPhone] = useState(null);
  const [errNationality, setErrNationality] = useState(null);

  const [errDate, setErrDate] = useState(null);
  const [status, setStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const router = useRouter()
  let tourId = router.query.id
  let tourSlug = router.query.slug
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';



  useEffect(() => {
    setLoader(false);

    const fetchData = async () => {
        let id = tourId;
        let userDeviceId = deviceId;
        let userUserAgent = userAgent;

        try {
            const TourDetailsData = await fetchTourDetails({ selectedLanguageCode, userUserAgent, userDeviceId, id });
            setTourDetailsInfo(TourDetailsData);
            setTourTitle(TourDetailsData.title);
            setTourDate(TourDetailsData.date);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        }
    };

    fetchData();
}, [selectedLanguageCode, deviceId, tourId, userAgent]);


  const handlePhoneInputChange = (phone) => {
    setPhone(phone);
  }

  const handleMonthPicker = (selectedDateFlexible, flexibleDateState) => {
    setMonthWeekData(selectedDateFlexible);
    setFlexState(flexibleDateState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      phone,
      country,
      noOfTravelers,
    };

    const arrDestination = selectedCity;
    const stringDestination = arrDestination.join(",");
    let stringDate = "";

    if (monthWeekData) {
      const arrDate = monthWeekData;
      stringDate = ` ${arrDate.week}, ${arrDate.month}, ${arrDate.year}`;
    }

    const stateOfDate = formattedDate
      ? formattedDate
      : stringDate
        ? stringDate
        : anytimeData
          ? anytimeData
          : "";

    let allValues = {
      DestinationId: stringDestination,
      Dates: stateOfDate,
      Details: formData,
      noOfDays: daysNo,
    };

    // Name validation
    if (!name.trim()) {
      setErrEmail(i18n.t('common.validationFieldRequired'));
      return;
    } else {
      setErrEmail('');
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Email validation
    if (!email.trim()) {
      setErrEmail(i18n.t('common.validationFieldRequired'));
      return;
    } else if (!emailPattern.test(email)) {
      setErrEmail(i18n.t('common.validationInvalidEmailFormat'));
      return;
    } else {
      setErrEmail('');
    }

    // Phone validation
    if (!phone.trim()) {
      setErrPhone(i18n.t('common.validationFieldRequired'));
      return;
    } else {
      setErrPhone('');
    }

    // Country validation
    if (!country.trim() || country === 'Select Your Country') {
      setErrNationality(i18n.t('common.validationFieldRequired'));
      return;
    } else {
      setErrNationality('');
    }

    // Reset any previously set error messages
    setErrName(null);
    setErrEmail(null);
    setErrPhone(null);
    setErrNationality(null);
    // setErrNoOfTravelers(null);

    setIntoApi(allValues);
  };

  const setIntoApi = async (allValues) => {
    let Date = allValues.Dates;
    let Nationality = allValues.Details.country;
    let Name = allValues.Details.name;
    let Email = allValues.Details.email;
    let PhoneNumber = allValues.Details.phone;
    let Days = allValues.noOfDays;
    let tourName = tourTitle;

    setButtonLoader(true);

    try {
      const handleTourInquiryApi = await submitTourInquiryForm({
        selectedLanguageCode,
        userAgent,
        deviceId,
        tourId,
        Date,
        Nationality,
        Name,
        Email,
        PhoneNumber,
        Days,
        noOfTravelers,
        tourName,
      });


      if (handleTourInquiryApi.status) {
        setButtonLoader(false);
        router.push('/tour-inquiry/thank-you')
      } else {
        setButtonLoader(false);
      }

      // Handle the response data here
    } catch (error) {
      console.error("Error submitting tour inquiry:", error);
      // Handle the error here
    }

  };

  const handleCount = (daysNo) => {
    setDaysNo(daysNo);
  };

  const incrementCount = () => {
    setNoOfTravelers(prevNoOfTravelers => prevNoOfTravelers + 1);
  };

  const decrementCount = () => {
    if (noOfTravelers <= 0) {
      setNoOfTravelers(0);
    } else {
      setNoOfTravelers(prevNoOfTravelers => prevNoOfTravelers - 1);
    }
  };

  const handleSelectDate = (selectedDate, dateState, formattedDates) => {
    setSelectedDate(selectedDate);
    setDateState(dateState);
    setFormattedDate(formattedDates);
  };

  const handleAnytime = () => {
    setAnytime(true);
  };

  const handleCountChange = (newCount) => {
    setDaysNo(newCount);
  };

  const handleStateFalse = () => {
    setDateState(false);
    setFlexState(false);
    setAnytime(false);
    setDaysNo(1);
    setFormattedDate(null);
  };

  const setTrueDate = () => {
    setDateState(true);
  };

  const inputDate = tourDate ?? "10-13-2029";
  const dateParts = inputDate.split('-');
  const month = parseInt(dateParts[0], 10);
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);
  const formattedDatetoLoc = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  console.log("inputDate", inputDate);

  return (
    <>
      {loader ? <FullScreenLoader /> :
        <>
          <Head>
            <title>{i18n.t('makeATour.metaTitle')}</title>
            <meta
              name="description"
              content={i18n.t('makeATour.metaDescription')}
            />
          </Head>

          <div className="make-tour-wrapper">
            <SubPageHeader
              TitleSub={i18n.t('tourInquiry.header')}
              TitleMain={`${tourTitle}`}

              categoryData={categoryInfo}
              populerTourData={populerTourInfo}
            />

            <div className="make-tour-contain">
              <div className="container">
                <div className="make-tour-form-wrapper">
                  <div className="tour-steps pt-5">
                    <div className="row">
                      <div className="col-4 padding-x">
                        <div className="block-title steps">
                          <h6><Trans i18nKey="makeATour.steps.step1"></Trans></h6>
                          <p>
                            <Trans i18nKey="makeATour.steps.step1Desc"></Trans>
                          </p>
                        </div>
                      </div>
                      <div className="col-4 padding-x">
                        <div className="block-title steps">
                          <h6><Trans i18nKey="makeATour.steps.step2"></Trans></h6>
                          <p>
                            <Trans i18nKey="makeATour.steps.step2Desc"></Trans>
                          </p>
                        </div>
                      </div>
                      <div className="col-4 padding-x">
                        <div className="block-title steps">
                          <h6><Trans i18nKey="makeATour.steps.step3"></Trans></h6>
                          <p>
                            <Trans i18nKey="makeATour.steps.step3Desc"></Trans>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="travel-dates">
                    <>
                      {dateState ||
                        flexState ||
                        anytime ? null : (
                        <div className="block-title">
                          <h6><Trans i18nKey="makeATour.traveldate"></Trans></h6>
                        </div>
                      )}

                      {tourDate ?
                        <div className="travel-dates-btns travel-dates-from-api">
                          <div className="selectedDataWrapperFlexible">
                            <div className="img-txt d-flex align-items-center">
                              <Image src={CalenderImg.src} alt="img" width={100} height={100} />
                              <p className="selectedDataShowFlexible">
                                {formattedDatetoLoc}
                              </p>
                            </div>
                          </div>
                        </div>
                        :
                        <div className="travel-dates-btns">
                          <div className="row">
                            {flexState || anytime ? null : (
                              <div
                                className={
                                  dateState
                                    ? "col-xl-8 col-lg-8 col-md-10 col-sm-12 pb-3"
                                    : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                }
                              >
                                <NewTestCalender
                                  onSelectDate={handleSelectDate}
                                  setTrueDate={setTrueDate}
                                  onCountChange={handleCount}
                                  statesNew={handleStateFalse}
                                />
                              </div>
                            )}
                            {dateState ? null : (
                              <>
                                {anytime ? null : (
                                  <div
                                    className={
                                      flexState
                                        ? "col-xl-8 col-lg-8 col-md-12 col-sm-12 pb-3"
                                        : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                    }
                                  >
                                    {flexState ? (
                                      <FlexibleDate
                                        sendData={monthWeekData}
                                        updateCount={handleCountChange}
                                        updateStates={handleStateFalse}
                                      />
                                    ) : (
                                      <MonthPickerPopup
                                        onSelectMonth={handleMonthPicker}
                                      />
                                    )}
                                  </div>
                                )}
                                {flexState ? null : (
                                  <div
                                    className={
                                      anytime
                                        ? "col-xl-8 col-lg-8 col-md-12 col-sm-12 pb-3"
                                        : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                    }
                                  >
                                    {anytime === false ? (
                                      <button
                                        className="TertiaryButton"
                                        onClick={handleAnytime}
                                      >
                                        <Trans i18nKey="makeATour.anytime"></Trans>
                                      </button>
                                    ) : (
                                      <SelectedDate
                                        heyData={anytimeData}
                                        sendInputValue={handleCountChange}
                                        updateStates={handleStateFalse}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      }
                    </>
                  </div>

                  <div className="travel-dates">
                    <>
                      <div className="block-title">
                        <h6><Trans i18nKey="common.NoOfTravelers"></Trans></h6>
                      </div>
                      <div className="travel-dates-btns">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 pb-3">
                            <div className="daysSelector">
                              <div className="counter-input-wrapper d-flex align-items-center ">
                                <button
                                  className="counter-btn"
                                  onClick={decrementCount}
                                  disabled={noOfTravelers === 1}
                                >
                                  <i class="fa-solid fa-minus"></i>
                                </button>
                                <input
                                  type="number"
                                  value={noOfTravelers}
                                  min="1"
                                  className="number-counter-input"
                                />
                                <button
                                  className="counter-btn"
                                  onClick={incrementCount}
                                >
                                  <i class="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <span className={
                                noOfTravelers < 0
                                  ? "d-block error-msg pt-2"
                                  : `d-none`
                              }>
                                this
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>

                  <div className="traveler-details">
                    <form className="contact-form-data">
                      <div className="input-group-contact">
                        <label className="title-style" for="name">
                          <Trans i18nKey="common.name"></Trans>
                        </label>
                        <input
                          type="name"
                          className="inputArea"
                          id="name"
                          placeholder={i18n.t('common.phName')}
                          value={name}
                          onChange={(event) =>
                            setName(event.target.value)
                          }
                        />
                        <span
                          className={
                            !name
                              ? "d-block error-msg pt-2"
                              : `d-none`
                          }
                        >
                          {errName}
                        </span>
                      </div>
                      <div className="input-group-contact">
                        <label className="title-style" for="email">
                          <Trans i18nKey="common.email"></Trans>
                        </label>
                        <input
                          type="email"
                          className="inputArea"
                          id="email"
                          placeholder={i18n.t('common.phEmail')}
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                        />
                        <span
                          className={
                            errEmail
                              ? "d-block error-msg pt-2"
                              : `d-none`
                          }
                        >
                          {errEmail}
                        </span>
                      </div>
                      <div className="input-group-contact">
                        <label className="title-style" for="phone">
                          <Trans i18nKey="common.phoneNumber"></Trans>
                        </label>
                        <PhoneInput
                          international
                          countryCallingCodeEditable={false}
                          defaultCountry="SA"
                          value={phone}
                          onChange={handlePhoneInputChange}
                        />
                        <span className={
                          !phone ? "d-block error-msg pt-2" : `d-none`
                        }>
                          {errPhone}
                        </span>

                      </div>
                      <div className="input-group-contact">
                        <label className="title-style" for="country">
                          <Trans i18nKey="common.country"></Trans>
                        </label>
                        <select
                          name="country"
                          className="inputArea dropdown-contact maketour-dropdown"
                          id="country"
                          value={country}
                          onChange={(event) =>
                            setCountry(event.target.value)
                          }
                        >
                          <option value="Select Your Country">
                            <Trans i18nKey="common.phCountrySelect"></Trans>
                          </option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">
                            Antigua and Barbuda
                          </option>
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
                          <option value="Bosnia and Herzegovina">
                            Bosnia and Herzegovina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">
                            British Indian Ocean Territory
                          </option>
                          <option value="Brunei Darussalam">
                            Brunei Darussalam
                          </option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos (Keeling) Islands">
                            Cocos (Keeling) Islands
                          </option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">
                            Congo, The Democratic Republic of The
                          </option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D&apos;ivoire">Cote D&apos;ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Territories">
                            French Southern Territories
                          </option>
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
                          <option value="Heard Island and Mcdonald Islands">
                            Heard Island and Mcdonald Islands
                          </option>
                          <option value="Holy See (Vatican City State)">
                            Holy See (Vatican City State)
                          </option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">
                            Iran, Islamic Republic of
                          </option>
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
                          <option value="Korea, Democratic People&apos;s Republic of">
                            Korea, Democratic People&apos;s Republic of
                          </option>
                          <option value="Korea, Republic of">
                            Korea, Republic of
                          </option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao People&apos;s Democratic Republic">
                            Lao People&apos;s Democratic Republic
                          </option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">
                            Libyan Arab Jamahiriya
                          </option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">
                            Macedonia, The Former Yugoslav Republic of
                          </option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">
                            Micronesia, Federated States of
                          </option>
                          <option value="Moldova, Republic of">
                            Moldova, Republic of
                          </option>
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
                          <option value="Netherlands Antilles">
                            Netherlands Antilles
                          </option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">
                            Northern Mariana Islands
                          </option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
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
                          <option value="Russian Federation">
                            Russian Federation
                          </option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">
                            Saint Kitts and Nevis
                          </option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">
                            Saint Pierre and Miquelon
                          </option>
                          <option value="Saint Vincent and The Grenadines">
                            Saint Vincent and The Grenadines
                          </option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">
                            Sao Tome and Principe
                          </option>
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
                          <option value="South Georgia and The South Sandwich Islands">
                            South Georgia and The South Sandwich Islands
                          </option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">
                            Svalbard and Jan Mayen
                          </option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">
                            Syrian Arab Republic
                          </option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">
                            Tanzania, United Republic of
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">
                            Trinidad and Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">
                            Turks and Caicos Islands
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">
                            United States Minor Outlying Islands
                          </option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">
                            Virgin Islands, British
                          </option>
                          <option value="Virgin Islands, U.S.">
                            Virgin Islands, U.S.
                          </option>
                          <option value="Wallis and Futuna">
                            Wallis and Futuna
                          </option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <span
                          className={
                            !country
                              ? "d-block error-msg pt-2"
                              : `d-none`
                          }
                        >
                          {errNationality}
                        </span>
                      </div>


                      <div className="btn-submit">
                        <button
                          className="SecondaryButton"
                          onClick={handleSubmit}
                          disabled={buttonLoader}
                        >
                          {buttonLoader ? (
                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                          ) : (
                            <Trans i18nKey="common.submit"></Trans>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
        </>}
    </>
  );
}


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



export default TourEnquiryMain;
