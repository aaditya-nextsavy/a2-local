import React from 'react'
import journeyImg from '@/public/assets/images/comfort.png'
import hotelImg from '@/public/assets/images/accomodation-icon.png'
import visaImg from '@/public/assets/images/Visa_icon.png'
import flightsImg from '@/public/assets/images/Flight_icon.png'
import FeatureImgRight from '@/public/assets/images/FeatureImgRight.png'
import { Trans } from 'react-i18next';
import Image from 'next/image'


const FeatureSection = () => {

    return (
        <>
            <div className='FeatureSectionWrapper'>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
                            <div className="withwhitebg">
                                <div className='SectionTitle'>
                                    <h5><Trans i18nKey="Feature.SubTitle"></Trans></h5>
                                    <h2><Trans i18nKey="Feature.MainTitle"></Trans></h2>
                                </div>
                            </div>
                            <div className='SectionDescription'>
                                <p><Trans i18nKey="Feature.Description1"></Trans></p>
                                <p><Trans i18nKey="Feature.Description2"></Trans></p>
                            </div>
                            <div className='row'>
                                <div className="col-2 text-end feature-vector-img">
                                    <Image width={100} height={100} 
                                    // quality={20} 
                                    src={hotelImg.src} alt="hotelImg" className='accomodation-image' />
                                </div>
                                <div className="col-10 feature-details">
                                    <h4><Trans i18nKey="Feature.Feature1"></Trans></h4>
                                    <p><Trans i18nKey="Feature.Feature1Desc"></Trans></p>
                                </div>

                                <div className="col-2 text-end feature-vector-img">
                                    <Image width={100} height={100} 
                                    // quality={20} 
                                    src={flightsImg.src} alt="flightsImg" className='accomodation-image' />
                                </div>
                                <div className="col-10 feature-details">
                                    <h4><Trans i18nKey="Feature.Feature2"></Trans></h4>
                                    <p><Trans i18nKey="Feature.Feature2Desc"></Trans></p>
                                </div>

                                <div className="col-2 text-end feature-vector-img">
                                    <Image width={100} height={100} 
                                    // quality={20}
                                     src={visaImg.src} alt="visaImg" className='accomodation-image' />
                                </div>
                                <div className="col-10 feature-details">
                                    <h4><Trans i18nKey="Feature.Feature3"></Trans></h4>
                                    <p><Trans i18nKey="Feature.Feature3Desc"></Trans></p>
                                </div>

                                <div className="col-2 text-end feature-vector-img">
                                    <Image width={100} height={100}
                                    //  quality={20} 
                                     src={journeyImg.src} alt="journeyImg" className='accomodation-image' />
                                </div>
                                <div className="col-10 feature-details">
                                    <h4><Trans i18nKey="Feature.Feature4"></Trans></h4>
                                    <p><Trans i18nKey="Feature.Feature4Desc"></Trans></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 ImgDivRight">
                            <Image width={630} height={1385}
                            //  quality={50} 
                             src={FeatureImgRight.src} alt={FeatureImgRight.src} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureSection

