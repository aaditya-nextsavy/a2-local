import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import styled from 'styled-components';
import RoundLines from '@/public/assets/images/roundlines.png'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';




const SubPageHeader = (props) => {
  const PageWrap = styled.div`
  padding-top: 6.3rem;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  @media (max-width: 1600px) {
    padding-top: 6rem;
    position: relative;
    /* z-index: 1; */
  }
  @media (max-width:991px) {
    padding-top: 5rem;
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
         @media (min-width: 2000px) {
            display: none;
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
      <PageWrap className={`${props.addClassName} `} >
        <Header populerTourData={props.populerTourData} categoryData={props.categoryData} suppressHydrationWarning={true} />
        <div className='page-header'>
          <div className="container">
            <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                <div className='SectionTitle'>
                  <Breadcrumb>
                    <Breadcrumb.Item href="/">{props.BreadcrumbHome}</Breadcrumb.Item>
                    {/* <Breadcrumb.Item href="/">{props.BreadcrumbHome}</Breadcrumb.Item> */}
                    <Breadcrumb.Item active>{props.BreadcrumbActive}</Breadcrumb.Item>
                  </Breadcrumb>
                  <h5>{props.TitleSub}</h5>
                  <h3>{props.TitleMain}</h3>
                  <h6>{props.date}</h6>
                  <div className="tour-details-btns">
                    {props.DetailsBtns}
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-end">
                <div className='CustomTours'>
                  <div className="CustomTours-content-box2">
                    {props.tourPriceData}
                  </div>
                  <div className="CustomTours-content-box1">
                    <div className="tour-price">
                      {props.tourData}
                    </div>
                    <h5>{props.CustomToursTitleSub}</h5>
                    {/* <p>{props.CustomToursTitleDesc}</p> */}
                    {props.BtnLinkTo ? <Link href={props.BtnLinkTo} className='nounderline button-wrapper-page-header'>
                      <button className='PrimaryButton'>{props.CustomToursBtn}</button>
                    </Link>
                      : ''}
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

export default SubPageHeader