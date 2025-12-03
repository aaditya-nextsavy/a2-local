import config from '@/common/config/config';
import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';


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
    @media (max-width: 475px) {
    font-size: 12px;
    }
    }
`;
    

    return (
        <>
            
        </> 
    )
}

export default SwiperSlide
