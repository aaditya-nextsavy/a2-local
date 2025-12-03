import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MainBanner = ({ scrollToDown }) => {
    const { t } = useTranslation();
    const videoRef = useRef(null);
    const bannerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.25 } // Adjust as needed (e.g., 0.5 = 50% visible)
        );

        if (bannerRef.current) {
            observer.observe(bannerRef.current);
        }

        return () => {
            if (bannerRef.current) {
                observer.unobserve(bannerRef.current);
            }
        };
    }, []);

    return (
        <div className="main-banner" ref={bannerRef}>
            <div className="overlay"></div>
            <video
                ref={videoRef}
                src="/assets/Videos/ENG-30-SEC-720p.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="content">
                <h2>{t('bannerText.bannerSubTitle')}</h2>
                <h1>{t('bannerText.bannerMainTitle')}</h1>
                {scrollToDown}
            </div>
        </div>
    );
};

export default MainBanner;
