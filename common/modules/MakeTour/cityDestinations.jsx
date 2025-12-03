import config from '@/common/config/config';
import { fetchLocations } from '@/pages/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const CityDestinations = ({ onselectCity, locationsData }) => {
    const [makeTourLocation, setMakeTourLocation] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

    const router = useRouter();
    const selectedLanguageCode = router.locale || 'en';

    useEffect(() => {
        // getMakeTourLocation();
        // setMakeTourLocation(locationsData)
        // setTimeout(() => {
        //     console.log("locationInfo", locationsData)
        // }, 1000);
        // console.log("Language code", router.locale);
        fetchData()
    }, []);

    const fetchData = async () => {
        let userAgent = 'userAgent';
        let deviceId = 'deviceId';
        try {
            const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
            // Update state with fetched data
            setMakeTourLocation(locations.data)
            // console.log("data from api call", locations)
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here, e.g., show an error message to the user.
        }
    };

    const handleCheckboxClick = (e) => {
        const { value } = e.target;
        let updatedSelectedCity = [...selectedCity];
        if (updatedSelectedCity.includes(value)) {
            updatedSelectedCity = updatedSelectedCity.filter(city => city !== value);
        } else {
            updatedSelectedCity.push(value);
        }
        setSelectedCity(updatedSelectedCity);
        onselectCity(updatedSelectedCity);
    };
    

    return (
        <>
            <div className="select-destination-options">
                <ul>
                    {makeTourLocation.map(locationData => (
                        <li id={locationData.id} key={locationData.id}>
                            <input
                                type="checkbox"
                                id={"destinationimg" + locationData.id}
                                className="destination-checkbox"
                                value={locationData.id}
                                onClick={handleCheckboxClick}
                            />
                            <label className="destination-label" htmlFor={"destinationimg" + locationData.id}>
                                <Image src={config.imageBaseURL + locationData.image} className="destination-image" 
                                // quality={10}
                                alt="img"
                                 width={140} height={100} />
                                <div className="overlay"></div>
                                <div className="destination-name">
                                    <p>{locationData.location}</p>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CityDestinations;
