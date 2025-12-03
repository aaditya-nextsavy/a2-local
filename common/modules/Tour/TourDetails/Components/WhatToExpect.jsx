import React, { Component } from 'react'
import { Trans } from 'react-i18next';
import Image from 'next/image';

export default class WhatToExpect extends Component {
    render(props) {
        return (
            <>
                <div className="Features mt-5" id={this.props.TourId}>
                    <div className="container">
                        <div className="SectionTitle">
                            <h5><Trans i18nKey="common.Whattoexpect"></Trans></h5>
                        </div>

                        <div className='row pt-5'>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="col-2 text-end">
                                        <Image width={100} height={100} 
                                        // quality={50}
                                         src='/assets/images/accomodation-icon.png' alt="Accomodation-icon" className='accomodation-image' />
                                    </div>
                                    <div className="col-10 feature-details">
                                        <h4><Trans i18nKey="Feature.Feature1"></Trans></h4>
                                        <p><Trans i18nKey="Feature.Feature1Desc"></Trans></p>
                                    </div>

                                    <div className="col-2 text-end">
                                        <Image width={100} height={100} 
                                        // quality={50}
                                         src='/assets/images/Flight-icon.png' alt="Luxury Hotels" className='accomodation-image' />
                                    </div>
                                    <div className="col-10 feature-details">
                                        <h4><Trans i18nKey="Feature.Feature2"></Trans></h4>
                                        <p><Trans i18nKey="Feature.Feature2Desc"></Trans></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="col-2 text-end">
                                        <Image width={100} height={100} 
                                        // quality={50} 
                                        src='/assets/images/Visa-icon.png' alt="Free Cancellation" className='accomodation-image' />
                                    </div>
                                    <div className="col-10 feature-details">
                                        <h4><Trans i18nKey="Feature.Feature3"></Trans></h4>
                                        <p><Trans i18nKey="Feature.Feature3Desc"></Trans></p>
                                    </div>

                                    <div className="col-2 text-end">
                                        <Image width={100} height={100}
                                        //  quality={50}
                                         src='/assets/images/comfort.png' alt="Travel Guide" className='accomodation-image' />
                                    </div>
                                    <div className="col-10 feature-details">
                                        <h4><Trans i18nKey="Feature.Feature4"></Trans></h4>
                                        <p><Trans i18nKey="Feature.Feature4Desc"></Trans></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

