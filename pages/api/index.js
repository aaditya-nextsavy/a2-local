const API_BASE_URL = 'https://manage.athaararabia.com/api';

export const fetchLocations = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/locations`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchCategory = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/categories`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchPopulerTours = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/popular-tours`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchContactData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/general-settings`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchtestimonialData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/testimonial`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchBlogsData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/blogs`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchFaqsData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/faqs`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchPrivacyPolicyData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/privacypolicy`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchTermsUseData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/termsofuse`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchBlogsPageData = async ({ selectedLanguageCode, userAgent, deviceId, selectedCategoryId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/blogs`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('category_id', selectedCategoryId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchBlogsDetailsData = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/blogs/details`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchSimilerBlogsData = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/blogs/similar`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchRecommendedBlogsData = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/blogs/recommended`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchBannersData = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/banners`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchTourDetails = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/details`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchItineraryDetails = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/itinerary`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchGalleryDetails = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/gallery`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchInclutionDetails = async ({ userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/inclusions/details/${id}`);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchExclusionsDetails = async ({ userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/exclusions/details/${id}`);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchRelatedTourDetails = async ({ selectedLanguageCode, userAgent, deviceId, id }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour/related-tour`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchUserProfileDetails = async ({ selectedLanguageCode, userAgent, deviceId, token }) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/get-profile`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');

        // }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchOtpSendReqDetails = async ({ selectedLanguageCode, userAgent, deviceId, mailId, token }) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/verification/email/otp/send`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('email', mailId);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchTourListDetails = async ({ categoryIds, locationIds, selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        if (categoryIds) {
            url.searchParams.append('category_id', categoryIds);
        }
        if (locationIds) {
            url.searchParams.append('location_id', locationIds);
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response

        return data;
    } catch (error) {
        console.error('Error fetching tour list:', error);
        throw error;
    }
};

export const fetchMetaInfoDetails = async ({ selectedLanguageCode, userAgent, deviceId, slug }) => {
    try {
        const url = new URL(`${API_BASE_URL}/page/details`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('slug', slug);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const submitOtpSendVerifyDetails = async ({ selectedLanguageCode, userAgent, deviceId, mailId, otp, token }) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/verification/email/otp/verify`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('email', mailId);
        url.searchParams.append('otp', otp);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchTermsOfUseDetails = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/termsofuse?`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchPrivacyPolicyDetails = async ({ selectedLanguageCode, userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/privacypolicy?`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchfaqsDetails = async ({ userAgent, deviceId }) => {
    try {
        const url = new URL(`${API_BASE_URL}/faqs?`);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const fetchCaptchStatus = async ({ selectedLanguageCode, userAgent, deviceId, token, ipAddress }) => {
    try {
        const url = `${API_BASE_URL}/auth/get-verify`;

        const requestBody = new URLSearchParams();
        requestBody.append('language_code', selectedLanguageCode);
        requestBody.append('user_agent', userAgent);
        requestBody.append('device_id', deviceId);
        requestBody.append('token', token);
        requestBody.append('user_ip', ipAddress);

        const response = await fetch(url, {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("fetchBlogsPageData api call response", data);

        return data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

export const submitUpdateUserDetailsForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    token,
    id,
    userName,
    userEmail,
    userMobile,
    userCountry,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/update-profile/${id}`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            id: id,
            language_code: selectedLanguageCode,
            user_agent: userAgent,
            device_id: deviceId,
            name: userName,
            email: userEmail,
            mobile: userMobile,
            country: userCountry,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitMakeTourForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitMakeTourForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    Destination,
    Date,
    Nationality,
    Name,
    Email,
    PhoneNumber,
    Days,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/contact/submit-create-tour-query-form`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            location_id: Destination,
            travel_data_type: 1,
            no_of_days: Days,
            travel_date: Date,
            name: Name,
            email: Email,
            phone_number: PhoneNumber,
            country: Nationality,


        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitMakeTourForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitTourInquiryForm = async ({
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
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/tour-inquiry`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            tour_id: tourId,
            travel_data_type: 1,
            no_of_days: Days,
            tour_date: Date,
            name: Name,
            email: Email,
            phone_number: PhoneNumber,
            nationality: Nationality,
            no_of_travelers: noOfTravelers,
            tour_name: tourName,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitMakeTourForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitContactForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    Name,
    Email,
    PhoneNumber,
    Country,
    Message,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/contact/submit-contact-form`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            name: Name,
            email: Email,
            phone_number: PhoneNumber,
            country: Country,
            message: Message
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitLoginForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    Email,
    Password,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/auth/login`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            email: Email,
            password: Password,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitPasswordChangeForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    token,
    password,
    newPassword,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/change-password`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            current_password: password,
            new_password: newPassword,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitRegistrationForm = async ({
    selectedLanguageCode,
    deviceId,
    userAgent,
    name,
    mobile,
    password,
    email
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/auth/register`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const submitResetPasswordForm = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    forgotPassEmail,
}) => {
    try {
        const url = new URL(`${API_BASE_URL}/auth/reset-password`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);

        const requestBody = JSON.stringify({
            email: forgotPassEmail,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const deleteUserAccount = async ({ selectedLanguageCode, userAgent, deviceId, id, token, password }) => {
    try {
        const url = new URL(`${API_BASE_URL}/user/delete-profile`);
        url.searchParams.append('language_code', selectedLanguageCode);
        url.searchParams.append('user_agent', userAgent);
        url.searchParams.append('device_id', deviceId);
        url.searchParams.append('id', id);
        url.searchParams.append('password', password);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response
        return data;
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error;
    }
};

export const submitAuthResetPasswordToken = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    email,
    token
}) => {
    try {
        const url = `${API_BASE_URL}/auth/forgot-password/verify-reset-token`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({
                language_code: selectedLanguageCode,
                user_agent: userAgent,
                device_id: deviceId,
                email,
                token,
            }),
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response    
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};


export const submitResetPasswordExternalLink = async ({
    selectedLanguageCode,
    userAgent,
    deviceId,
    password,
    email,
    token
}) => {
    try {
        const url = `${API_BASE_URL}/auth/reset-password-submit`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({
                language_code: selectedLanguageCode,
                user_agent: userAgent,
                device_id: deviceId,
                email,
                token,
                password,
            }),
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON data from the response    
        // console.log("response submitContactForm", data)
        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};
