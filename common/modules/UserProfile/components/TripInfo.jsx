import React, { useState } from 'react'
import { Trans } from 'next-i18next'
import Link from 'next/link'
import TripIconImg from '@/public/assets/images/bx_trip.svg'
import GlobImg from '@/public/assets/images/travel-explore.svg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import i18n from 'i18next';

const TripInfo = () => {
    const [key, setKey] = useState('Upcoming');
    return (
        <>
            <div className="user-profile-info-header d-flex align-items-center justify-content-between">
                <div className="drop-item-wrapper d-flex align-items-center">
                    <img src={TripIconImg.src} alt="" />
                    <p><Trans i18nKey="common.trips"></Trans></p>
                </div>
            </div>

            <div className="user-trip-data">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="Upcoming" title={i18n.t('common.upcoming')}>
                        <div className="no-trip-found d-flex align-items-center">
                            <img src={GlobImg.src} alt="" />
                            <div className="no-trip-data">
                                <h6><Trans i18nKey="common.NoUpcomingTripsTitle"></Trans></h6>
                                <p><Trans i18nKey="common.NoUpcomingTripsDesc"></Trans></p>
                                <div className="trip-btn">
                                    <Link href="/tours?all-tours" className='nounderline'>
                                        <button className='TertiaryButton'><Trans i18nKey="common.exploreTours"></Trans></button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* <div className="upcoming-trip-box d-flex align-items-center">
                                                    <div className="img-wrapper">

                                                    </div>
                                                    <div className="trip-data">
                                                        <h6>MORNING CITY TOUR OF RIYADH HISTORY</h6>
                                                        <p>25/12/22</p>

                                                        <div className="trips-btns">
                                                            <button className='SecondaryButton'>View Details</button>
                                                            <button className='TertiaryButton'>Download Receipt</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="upcoming-trip-box d-flex align-items-center">
                                                    <div className="img-wrapper">

                                                    </div>
                                                    <div className="trip-data">
                                                        <h6>SHAQRA & USHAIQER EXCURSIONY</h6>
                                                        <p>25/12/22</p>

                                                        <div className="trips-btns">
                                                            <button className='SecondaryButton'>View Details</button>
                                                            <button className='TertiaryButton'>Download Receipt</button>
                                                        </div>
                                                    </div>
                                                </div> */}

                    </Tab>
                    <Tab eventKey="Completed" title={i18n.t('common.completed')}>
                        {/* <div className="upcoming-trip-box d-flex align-items-center">
                                                    <div className="img-wrapper">

                                                    </div>
                                                    <div className="trip-data">
                                                        <h6>MORNING CITY TOUR OF RIYADH HISTORY</h6>
                                                        <p>25/12/22</p>

                                                        <div className="trips-btns">
                                                            
                                                            <button className='TertiaryButton'>Download Receipt</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                        <div className="no-trip-found d-flex align-items-center">
                            <img src={GlobImg.src} alt="" />
                            <div className="no-trip-data">
                                <h6><Trans i18nKey="common.NoCompletedTripsTitle"></Trans></h6>
                                <p><Trans i18nKey="common.NoCompletedTripsDesc"></Trans></p>
                                <div className="trip-btn">
                                    <Link href="/tours?all-tours" className='nounderline'>
                                        <button className='TertiaryButton'><Trans i18nKey="common.exploreTours"></Trans></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>



            </div>
        </>
    )
}

export default TripInfo