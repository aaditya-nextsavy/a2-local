import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { useEffect } from 'react';
import { fetchExclusionsDetails, fetchInclutionDetails } from '@/pages/api';

const IncExc = ({ TourId, inclution, exclution, selectedLanguageCode }) => {
    // console.log("TourId, inclution & exclution", TourId, inclution, exclution)

    const [exclutionVal, setExclutionVal] = useState([])
    const [inclutionVal, setInclutionVal] = useState([])

    const [gotDataInclution, setGotDataInclution] = useState(false)
    const [gotDataExclution, setGotDataExclution] = useState(false)

    useEffect(() => {
        if (exclution) {
            exclutionDatafetch(exclution)
            inclutionDatafetch(inclution)
        }

    }, [exclution])

    const exclutionDatafetch = (exclution) => {
        const exclutionsString = exclution
        const exclutionIds = exclutionsString.split(',');

        const fetchExclutions = async (exclutionIds) => {
            const exclutionResponses = [];
            let userAgent = 'userAgent';
            let deviceId = 'deviceId';

            for (const excId of exclutionIds) {
                try {
                    const theDataExclution = await fetchExclusionsDetails({ userAgent, deviceId, id: excId });
                    if (selectedLanguageCode === 'ar') {
                        exclutionResponses.push({ data: theDataExclution.name_ar });
                    } else {
                        exclutionResponses.push({ data: theDataExclution.name_en });
                    }
                    // console.log("theDataExclution theDataExclution theDataExclution", theDataExclution)
                } catch (error) {
                    console.error('Error fetching inclution:', error);
                    // Handle the error as needed, e.g., logging or storing it in another array.
                }
            }
            return exclutionResponses;
        };

        // Usage
        fetchExclutions(exclutionIds)
            .then(exclutionResponses => {
                // console.log('exclution Responses:', exclutionResponses);
                // Do something with exclutionResponses
                setExclutionVal(exclutionResponses)
            })
            .catch(error => {
                console.error('Error fetching exclutions:', error);
            });
    }

    const inclutionDatafetch = (inclution) => {
        const inclutionsString = inclution
        const inclutionIds = inclutionsString.split(',');

        // console.log("inclutionsString & inclutionIds", inclutionIds,)

        const fetchInclutions = async (inclutionIds) => {
            const inclutionResponses = [];
            let userAgent = 'userAgent';
            let deviceId = 'deviceId';

            for (const incId of inclutionIds) {
                try {
                    const theDataInclution = await fetchInclutionDetails({ userAgent, deviceId, id: incId });
                    if (selectedLanguageCode === 'ar') {
                        inclutionResponses.push({ data: theDataInclution.name_ar });
                    } else {
                        inclutionResponses.push({ data: theDataInclution.name_en });
                    }
                    // console.log("theDataInclution theDataInclution theDataInclution", theDataInclution)
                } catch (error) {
                    console.error('Error fetching inclution:', error);
                    // Handle the error as needed, e.g., logging or storing it in another array.
                }
            }

            return inclutionResponses;
        };

        // Usage
        fetchInclutions(inclutionIds)
            .then(inclutionResponses => {
                // console.log('inclution Responses:', inclutionResponses);
                // Do something with inclutionResponses
                setInclutionVal(inclutionResponses)
            })
            .catch(error => {
                console.error('Error fetching inclution:', error);
            });
    }

    return (
        <div className="inclusion-exclusion">
            <div className="row">
                {inclution !== '0' ?
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="SectionTitle">
                            <h5><Trans i18nKey="tourPage.inclusion"></Trans></h5>
                        </div>
                        <ul className="inclusion-list-menu">
                            {inclutionVal ? inclutionVal.map((data, index) => (
                                <li key={index}>{data.data}</li>
                            )) : ''}
                        </ul>
                    </div>
                    : ''}

                {exclution !== '0' ?
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="SectionTitle">
                            <h5><Trans i18nKey="tourPage.exclusion"></Trans></h5>
                        </div>
                        <ul className="exclusion-list-menu">

                            {exclutionVal ? exclutionVal.map((data, index) => (
                                <li key={index}>{data.data}</li>
                            )) : ''}
                        </ul>
                    </div>
                    : ''}
            </div>
        </div>
    )
};

export default IncExc;
