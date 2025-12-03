import React, { useEffect, useState } from 'react'
import Turnstile from 'react-turnstile';
import { fetchCaptchStatus } from '@/pages/api';

const TEST_SITEKEY = "1x00000000000000000000AA";

const CaptchaBlock = ({ callbackStatus }) => {
    const [ipAddress, setIpAddress] = useState('');
    var selectedLanguageCode = localStorage.getItem('language_code')
    let userAgent = "userAgent"
    let deviceId = "deviceId"
    const [secondToken, setSecondToken] = useState();


    useEffect(() => {
        fetch('https://api.ipify.org/?format=json')
            .then((response) => response.json())
            .then((data) => setIpAddress(data.ip))
            .catch((error) => {
                // Handle the error.
            });
    }, []);

    useEffect(() => {

        if (secondToken && ipAddress) {
            getCaptchaValidation()
        } else {
            callbackStatus(false)
        }

    }, [secondToken, ipAddress])

    const getCaptchaValidation = async () => {
        let token = secondToken
        try {
            const captchaData = await fetchCaptchStatus({ selectedLanguageCode, userAgent, deviceId, token, ipAddress });
            console.log("captchaData", captchaData)
            if (captchaData.status) {
                callbackStatus(captchaData.status);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return (
        <>
            {/* <Helmet>
                <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_turnstileCb" />
               
            </Helmet> */}
            {/* <div class="cf-turnstile" data-sitekey="0x4AAAAAAAMIBRH2dKxA4RfZ" data-callback="_turnstileCb"></div> */}
            {/* <div id='myWidget'></div> */}
            <Turnstile
                onVerify={setSecondToken}
                sitekey={"0x4AAAAAAAMIBRH2dKxA4RfZ"}
                theme="light"
                language={selectedLanguageCode}
            />
        </>
    )
}

export default CaptchaBlock