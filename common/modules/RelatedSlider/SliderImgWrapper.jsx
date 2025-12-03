import config from '@/common/config/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';



// import { SwiperSlide } from "swiper/react";

function SliderImgWrapper(props) {
    const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    border-radius: 4px 4px 0 0;
`;
    const ImgSlider = styled.img`
    position: relative;
    border-radius: 4px 4px 0 0;
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
    // const router = useRouter()
    // const handleNavigate = () => {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 800);

    // };


    return (
        <>
            <Link href={`/tours/${props.tourId}/${props.tourSlug}`} className="nounderline">
                <div className='sliderData' >
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

export default SliderImgWrapper