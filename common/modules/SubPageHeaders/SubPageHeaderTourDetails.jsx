import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Trans } from 'react-i18next';
import HeaderBlack from '../Header/HeaderBlack';
import Link from 'next/link';



const SubPageHeaderTourDetails = (props) => {
    const PageWrap = styled.div`
  padding-top: 6.3rem;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  @media (max-width: 1600px) {
    padding-top: 6rem;
    position: absolute;
    /* z-index: 1; */
  }
  @media (max-width:580px) {
    padding-top: 12%;
  }
  @media (max-width:475px) {
    padding-top: 15%;
  }
  @media (max-width:375px) {
    padding-top: 17%;
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
         background-image: url('/assets/images/roundlines.png');
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

    // const [sticky, setSticky] = useState("");

    // // on render, set listener
    // useEffect(() => {
    //     console.log("hello");
    //     window.addEventListener("scroll", isSticky);
    //     return () => {
    //         window.removeEventListener("scroll", isSticky);
    //     };
    // }, []);

    // const isSticky = () => {
    //     /* Method that will fix header after a specific scrollable */
    //     const scrollTop = window.scrollY;
    //     const stickyClass = scrollTop >= 30 ? "is-sticky" : "";
    //     setSticky(stickyClass);
    //     console.log(stickyClass);
    // };

    // const classes = `pageHeader  ${sticky}`;

    return (
        <>
            <PageWrap className={`${props.addClassName} SubPageHeaderTourDetails`} >
                <HeaderBlack populerTourData={props.populerTourData} categoryData={props.categoryData}/>
                <div className='page-header'>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <div className='SectionTitle'>
                                    <Breadcrumb>
                                        <Breadcrumb.Item href="/">{props.BreadcrumbHome}</Breadcrumb.Item>
                                        {props.BreadcrumMiddle ? <Breadcrumb.Item href={props.BreadcrumMiddleLink}>{props.BreadcrumMiddle}</Breadcrumb.Item> : ''}
                                        <Breadcrumb.Item active>{props.BreadcrumbActive}</Breadcrumb.Item>
                                    </Breadcrumb>
                                    {/* <h5>{props.TitleSub} {props.BtnLinkTo}</h5> */}
                                    <h3>{props.TitleMain}</h3>

                                    <div className="tour-details-btns">
                                        <div className="tour-card-tags-wrapper d-flex align-items-center">
                                            {props.Location ? <div className="card-tags d-flex align-items-center location"> <img src="/assets/images/location.png" alt="" /><p>{props.Location}</p></div> : ""}
                                            {props.Days ? <div className="card-tags d-flex align-items-center days"><img src="/assets/images/time-outlined.png" alt="" /><p>{props.Days} <Trans i18nKey="common.day"></Trans></p></div> : ""}
                                            <div className="card-tags d-flex align-items-center date"><img src="/assets/images/calendar.png" alt="" /><p>{props.Date ? props.Date : <Trans i18nKey="common.datesMayVary"></Trans>}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-end">
                                <div className='CustomTours'>

                                    <div className="CustomTours-content-box1">
                                        <div className="tour-price">
                                            <div className='top-bar-data d-flex align-items-center justify-content-end'>
                                                {/* <div className="share d-flex align-items-center justify-content-between">
                                                    <img src='/assets/images/share.png' alt="" />
                                                    <p>Share</p>
                                                </div> */}
                                            </div>

                                            <div className="current-price d-flex ">
                                                {props.Price ? <><p>{props.Price} SAR</p><span> / <Trans i18nKey="common.person"></Trans></span></> : <p><Trans i18nKey="common.priceOnRequest"></Trans></p>}
                                            </div>
                                        </div>
                                        <Link href={props.BtnLinkTo} className='nounderline button-wrapper-page-header'>
                                            <button className='PrimaryButton'>{props.CustomToursBtn}</button>
                                        </Link>

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

export default SubPageHeaderTourDetails