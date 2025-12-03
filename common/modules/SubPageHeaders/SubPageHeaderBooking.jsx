import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import styled from 'styled-components';
import RoundLines from '../../assets/images/roundlines.png'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import LocationIcon from '../../assets/images/location.png'
import TimeOutIcon from '../../assets/images/time-outlined.png'
import CalenderIcon from '../../assets/images/calendar.png'



const SubPageHeaderBooking = (props) => {
    const PageWrap = styled.div`
  padding-top: 6.3rem;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  @media (max-width: 1600px) {
    padding-top: 5rem;
    position: absolute;
    /* z-index: 1; */
  }
  @media (max-width:580px) {
    padding-top: 10%;
  }
  /* padding-bottom: 100px; */
    header{
      background-color: #000;
    }
    .page-header{
      position: relative;
      background: #FAFAFA;
      z-index: -1;
      /* padding-bottom: 27px; */
      &::before{
         content: "";
         background-image: url(${RoundLines});
         position: absolute;
         left: 0;
         top: 0;
         width: 115px;
         height: 110px;
         background-repeat: no-repeat;
         background-position: center;
         background-size: contain;
         z-index: -1;

         @media (max-width: 768px) {
            width: 85px;
            height: 75px;
         }
      }
    }
  `;

    const [theCount, setTheCount] = useState()

    useEffect(() => {
        let theCounting = localStorage.getItem("countings")

        setTheCount(theCounting)

    }, [theCount])

    return (
        <>
            <PageWrap className="book-tour-top-header SubPageHeaderBooking" >
                <Header />
                <div className='page-header'>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <div className='SectionTitle'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item href="/">{i18n.t('common.home')}</Breadcrumb.Item>
                                        <Breadcrumb.Item href="/">{props.BreadcrumbLocation}</Breadcrumb.Item>
                                        <Breadcrumb.Item href="/">{props.BreadcrumbTitle}</Breadcrumb.Item>
                                        <Breadcrumb.Item active>{props.BreadcrumbActive}</Breadcrumb.Item>
                                    </Breadcrumb>

                                    <h3>{props.title}</h3>

                                    <div className="tour-details-btns">
                                        <div className="tour-card-tags-wrapper d-flex align-items-center">
                                            <div className="card-tags d-flex align-items-center location"> <img src={LocationIcon} alt="" /><p>{props.location}</p></div>
                                            <div className="card-tags d-flex align-items-center days"><img src={TimeOutIcon} alt="" /><p>{props.noOfDays} Days</p></div>
                                            {/* <div className="card-tags d-flex align-items-center date"><img src={CalenderIcon} alt="" /><p>{props.date}</p></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-end">
                                <div className='CustomTours'>
                                    <div className="CustomTours-content-box2">
                                        <div className="base-price d-flex align-item-center justify-content-between">
                                            <p>{i18n.t('common.basePrice')}</p>
                                            <p className='price-data'>{props.tourAmount} SAR</p>
                                        </div>
                                        <div className="total-travelers d-flex align-item-center justify-content-between">
                                            <p>{i18n.t('common.travelers')}</p>
                                            <p className='Traveler-data'>x{props.totalTravelers}</p>
                                        </div>
                                        <div className="grand-total d-flex align-item-center justify-content-between">
                                            <p>{i18n.t('common.grandTotal')}</p>
                                            <p className='total-price-data'>{props.totalAmount} SAR</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrap>
        </>
    )
}

export default SubPageHeaderBooking


