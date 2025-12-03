import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import config from '../../config';

// import { SwiperSlide } from "swiper/react";

function SwiperSlide(props) {
    const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    // border-radius: 4px;
`;
    const ImgSlider = styled.img`
    position: relative;
    border-radius: 4px;
    max-width: 480px;
    max-height: 240px;
    object-fit: cover;
    object-position: center;
`;
    const ImgTitle = styled.div`
    position: absolute;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    padding-bottom: 11px;

    p{
        margin: 0;
        line-height: 22px;
    }
`;

    const imagebasepath = "https://phpstack-876914-3037838.cloudwaysapps.com/"

    return (
        <>
            <Link to={`/tours?&location-id=${props.id}&location-title=${props.name}`}>
                <div className='sliderData exploreslider' >
                    <ImgSlider src={config.imageBaseURL + props.image} />
                    <Overlay />
                    <ImgTitle>
                        <p>{props.name}</p>
                    </ImgTitle>
                </div>
            </Link>
        </>
    )
}

export default SwiperSlide