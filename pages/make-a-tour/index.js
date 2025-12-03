import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import i18n from "i18next";
import { Trans } from "react-i18next";
import Head from "next/head";
import FullScreenLoader from "@/common/modules/FullScreenLoader/FullScreenLoader";
import CityDestinations from "@/common/modules/MakeTour/cityDestinations";
import NewTestCalender from "@/common/modules/MakeTour/NewTestCalender";
import MonthPickerPopup from "@/common/modules/MakeTour/MonthPickerPopup";
import SelectedDate from "@/common/modules/MakeTour/SelectedDate";
import FlexibleDate from "@/common/modules/MakeTour/FlexibleDate";
import { useRouter } from "next/router";
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, submitMakeTourForm } from "../api";
import SubPageHeader from "@/common/modules/SubPageHeaders/SubPageHeader";
import Footer from "@/common/modules/Footer/Footer";
import ThankyouBlock from "@/common/modules/Thankyou/ThankyouBlock";
import HeaderBlack from "@/common/modules/Header/HeaderBlack";
import MetaInfo from "@/common/modules/MetaInfo/MetaInfo";


function MakeTourMain({ selectedLanguageCode, locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) {
    const router = useRouter();
    // const selectedLanguageCode = router.query.lang || 'en';

    const [state, setState] = useState({
        selectedCity: [],
        monthWeekData: null,
        anytimeData: i18n.t('makeATour.anytime'),
        selectedDate: null,
        formattedDate: null,
        dateState: false,
        flexState: false,
        anytime: false,
        daysNo: 1,

        name: "",
        email: "",
        phone: "",
        country: "",
        buttonLoader: false,
    });

    const [fullFormatedDate, setFullFormatedDate] = useState(null)

    const [errorState, setErrorState] = useState({
        name: null,
        email: null,
        phone: null,
        nationality: null,
        destination: null,
        date: null,
    });


    const [loader, setLoader] = useState(true);
    const [apiSuccess, setApiSuccess] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])


    const handlePhoneInputChange = (phone) => {
        setState({ ...state, phone });
    };

    const handleMonthPicker = (selectedDateFlexible, flexibleDateState) => {
        setState({ ...state, monthWeekData: selectedDateFlexible, flexState: flexibleDateState });
    };

    const handleSelectDate = (selectedDate, dateState, formattedDates) => {
        console.log("selectedDate, dateState, formattedDate: formattedDates", formattedDates)
        setState({ ...state, selectedDate, dateState, formattedDate: formattedDates });
        setFullFormatedDate(formattedDates)
    };

    const handleAnytime = () => {
        setState({ ...state, anytime: true });
    };

    const handleCountChange = (newCount) => {
        setState({ ...state, daysNo: newCount });
    };
    const handleCitySelected = (selectedCity) => {
        setState({ ...state, selectedCity });
    };
    const handleCount = (daysNo) => {
        setState({ ...state, daysNo });
    };

    const handleStateFalse = () => {
        setState({
            ...state,
            dateState: false,
            flexState: false,
            anytime: false,
            daysNo: 1,
            formattedDate: null,
        });
    };

    const setTrueDate = () => {
        setState({ ...state, dateState: true });
    };

    // const fetchData = async () => {
    //     const selectedLanguageCode = router.query.lang || 'en';
    //     let userAgent = 'userAgent';
    //     let deviceId = 'deviceId';

    //     try {
    //         const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
    //         const categories = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
    //         const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });

    //         setLocationInfo(locations.data);
    //         setCategoryInfo(categories.data);
    //         setContactDataInfo(contactData);
    //         setLoader(false);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [selectedLanguageCode]); // Empty dependency array to run only once on mount

    const validateForm = () => {
        const { name, email, phone, country, selectedCity, monthWeekData } = state;
        const errors = {};

        if (!name) errors.name = i18n.t("common.validationFieldRequired");
        if (!email) errors.email = i18n.t("common.validationFieldRequired");
        if (!country) errors.nationality = i18n.t("common.validationFieldRequired");
        if (selectedCity.length === 0) errors.destination = i18n.t("common.validationFieldRequired");
        // if (!monthWeekData && !state.formattedDate && !state.anytime) errors.date = i18n.t("common.validationFieldRequired");
        if (phone.trim() === "") errors.phone = i18n.t("common.validationFieldRequired");
        else if (!isValidPhoneNumber(phone)) errors.phone = i18n.t("common.validationInvalidPhoneNumber");
        console.log("validations error", errors)
        setErrorState(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const { name, email, phone, country, selectedCity } = state;
        const formData = { name, email, phone, country };
        const stringDestination = selectedCity.join(",");
        const stringDate = fullFormatedDate || (state.monthWeekData ? ` ${state.monthWeekData.week}, ${state.monthWeekData.month}, ${state.monthWeekData.year}` : "Anytime");

        const allValues = {
            DestinationId: stringDestination,
            Dates: stringDate,
            Details: formData,
            noOfDays: state.daysNo,
        };
        console.log("allValues", allValues)
        setState({ ...state, buttonLoader: true });

        try {
            const MakeTourResponse = await submitMakeTourForm({
                selectedLanguageCode,
                userAgent: 'userAgent',
                deviceId: 'deviceId',
                Destination: allValues.DestinationId,
                Date: allValues.Dates,
                Nationality: allValues.Details.country,
                Name: allValues.Details.name,
                Email: allValues.Details.email,
                PhoneNumber: allValues.Details.phone,
                Days: allValues.noOfDays,
            });

            console.log("data from api call MakeTourResponse", MakeTourResponse);

            if (MakeTourResponse.status === true) {
                setApiSuccess(true); // Set apiSuccess to true if the status is true
                router.push("/make-a-tour/thank-you");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        } finally {
            setState({ ...state, buttonLoader: false });
        }
    };
    return (
        <>
            {loader ? <FullScreenLoader /> :
                <>
                  <MetaInfo metainfo={metaDataInfo} />
                    <div className="make-tour-wrapper">
                        <SubPageHeader
                            TitleSub={i18n.t("makeATour.header")}
                            TitleMain={i18n.t("makeATour.title")}
                            locationData={locationInfo}
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
                                                    <h6>
                                                        <Trans i18nKey="makeATour.steps.step1"></Trans>
                                                    </h6>
                                                    <p>
                                                        <Trans i18nKey="makeATour.steps.step1Desc"></Trans>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-4 padding-x">
                                                <div className="block-title steps">
                                                    <h6>
                                                        <Trans i18nKey="makeATour.steps.step2"></Trans>
                                                    </h6>
                                                    <p>
                                                        <Trans i18nKey="makeATour.steps.step2Desc"></Trans>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-4 padding-x">
                                                <div className="block-title steps">
                                                    <h6>
                                                        <Trans i18nKey="makeATour.steps.step3"></Trans>
                                                    </h6>
                                                    <p>
                                                        <Trans i18nKey="makeATour.steps.step3Desc"></Trans>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tour-destination">
                                        <div className="block-title">
                                            <h6>
                                                <Trans i18nKey="makeATour.destination"></Trans>
                                            </h6>
                                            <p>
                                                <Trans i18nKey="makeATour.multipleCities"></Trans>
                                            </p>
                                        </div>
                                        <span
                                            className={
                                                errorState.destination
                                                    ? "d-block error-msg pt-2"
                                                    : `d-none`
                                            }
                                        >
                                            {errorState.destination}
                                        </span>
                                        <CityDestinations onselectCity={handleCitySelected} locationsData={locationInfo} />
                                    </div>

                                    <div className="travel-dates">
                                        <>
                                            {state.dateState ||
                                                state.flexState ||
                                                state.anytime ? null : (
                                                <div className="block-title">
                                                    <h6>
                                                        <Trans i18nKey="makeATour.traveldate"></Trans>
                                                    </h6>
                                                </div>
                                            )}

                                            <div className="travel-dates-btns">
                                                <div className="row">
                                                    {state.flexState || state.anytime ? null : (
                                                        <div
                                                            className={
                                                                state.dateState
                                                                    ? "col-xl-8 col-lg-8 col-md-10 col-sm-12 pb-3"
                                                                    : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                                            }
                                                        >
                                                            {/* <input className='TertiaryButton' type='date' id="datetype" placeholder='Fixed' /> */}
                                                            {/* <CalenderBtnContent handleClick={this.handleClick} /> */}
                                                            <NewTestCalender
                                                                onSelectDate={handleSelectDate}
                                                                setTrueDate={setTrueDate}
                                                                onCountChange={handleCount}
                                                                statesNew={handleStateFalse}
                                                            />
                                                        </div>
                                                    )}
                                                    {state.dateState ? null : (
                                                        <>
                                                            {state.anytime ? null : (
                                                                <div
                                                                    className={
                                                                        state.flexState
                                                                            ? "col-xl-8 col-lg-8 col-md-12 col-sm-12 pb-3"
                                                                            : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                                                    }
                                                                >
                                                                    {/* <MonthPickerPopup onSelectMonth={this.handleMonthPicker} /> */}
                                                                    {state.flexState ? (
                                                                        <FlexibleDate
                                                                            sendData={state.monthWeekData}
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
                                                            {state.flexState ? null : (
                                                                <div
                                                                    className={
                                                                        state.anytime
                                                                            ? "col-xl-8 col-lg-8 col-md-12 col-sm-12 pb-3"
                                                                            : "col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-3"
                                                                    }
                                                                >

                                                                    {state.anytime === false ? (
                                                                        <button
                                                                            className="TertiaryButton"
                                                                            onClick={handleAnytime}
                                                                        >
                                                                            <Trans i18nKey="makeATour.anytime"></Trans>
                                                                        </button>
                                                                    ) : (
                                                                        <SelectedDate
                                                                            heyData={state.anytimeData}
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
                                                    placeholder={i18n.t("common.phName")}
                                                    value={state.name}
                                                    onChange={(event) =>
                                                        setState({ ...state, name: event.target.value })
                                                    }
                                                />
                                                <span
                                                    className={
                                                        errorState.name
                                                            ? "d-block error-msg pt-2"
                                                            : `d-none`
                                                    }
                                                >
                                                    {errorState.name}
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
                                                    placeholder={i18n.t("common.phEmail")}
                                                    value={state.email}
                                                    onChange={(event) =>
                                                        setState({ ...state, email: event.target.value })
                                                    }
                                                />
                                                <span
                                                    className={
                                                        errorState.email
                                                            ? "d-block error-msg pt-2"
                                                            : `d-none`
                                                    }
                                                >
                                                    {errorState.email}
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
                                                    value={state.phone}
                                                    onChange={handlePhoneInputChange}
                                                />

                                                {errorState.phone ? (
                                                    <span
                                                        className={
                                                            errorState.phone ? "d-block error-msg pt-2" : `d-none`
                                                        }
                                                    >
                                                        {errorState.phone}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="input-group-contact">
                                                <label className="title-style" for="country">
                                                    <Trans i18nKey="common.country"></Trans>
                                                </label>
                                                <select
                                                    name="country"
                                                    className="inputArea dropdown-contact maketour-dropdown"
                                                    id="country"
                                                    value={state.country}
                                                    onChange={(event) =>
                                                        setState({ ...state, country: event.target.value })
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
                                                        errorState.nationality
                                                            ? "d-block error-msg pt-2"
                                                            : `d-none`
                                                    }
                                                >
                                                    {errorState.nationality}
                                                </span>
                                            </div>
                                            <div className="input-group-contact-submit">
                                                <button
                                                    className={`SecondaryButton ${state.buttonLoader ? "buttonLoader" : ""
                                                        }`}
                                                    onClick={handleSubmit}
                                                    disabled={state.buttonLoader}
                                                >
                                                    {state.buttonLoader ? (
                                                        <span className="button-loader"></span>
                                                    ) : (
                                                        <Trans i18nKey="makeATour.requestProposal"></Trans>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
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
    );
}


export const getServerSideProps = async ({ locale }) => {
    const selectedLanguageCode = locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';
    let slug = "make-a-tour";

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


export default MakeTourMain;
