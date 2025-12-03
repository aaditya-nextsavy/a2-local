import React, { useState } from 'react';
import { useEffect } from 'react';
import { Trans } from 'react-i18next';
import config from '@/common/config/config';
import FullScreenGallery from './FullScreenGallery';
import Image from 'next/image';

export default function FullScreenGalleryMain({ tourId, tourGalleryInfo }) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setPhotoIndex(0);
        setIsOpen(false);
    };

    useEffect(() => {
        if (!tourGalleryInfo) {
            return;
        }

        GallerApiCall()

    }, [tourGalleryInfo]);

    const GallerApiCall = () => {

        setImages(tourGalleryInfo.map((image) => ({
            original: config.imageBaseURL + image.image_name,
            thumbnail: config.imageBaseURL + image.image_name
        })));
    };

    const displayImages = images.slice(0, 5);

    return (
        <div className="details-gallery-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                        <div
                            className="image-container galleryImgLeft"
                            onClick={() => openLightbox(0)}
                        >
                            {images?.[0] && (
                                <Image className="image-border-round"
                                    src={images[0].thumbnail}
                                    alt={images[0].original}
                                    width={600}
                                    height={400}
                                    // quality={60}
                                    onClick={() => openLightbox(0)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="row ">
                            {displayImages.slice(1).map((image, index) => (
                                <div
                                    key={index}
                                    className="col-6 mb-4 image-container-right"
                                    onClick={() => openLightbox(index + 1)}
                                >
                                    <div className="image-container galleryImgRight position-relative">
                                        <Image className="image-border-round"
                                            width={300}
                                            height={200}
                                            // quality={75}
                                            src={image.thumbnail}
                                            alt={image.original} />
                                        {index + 1 === 4 ? (
                                            <div className="view-more-img-gallery">
                                                <button className="view-more-button TertiaryButton" onClick={() => openLightbox()}>
                                                    <Trans i18nKey="common.view"></Trans>  {images.length - 4} <Trans i18nKey="common.more"></Trans>{''}
                                                </button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenGallery
                images={images}
                isOpen={isOpen}
                onClose={closeLightbox}
            />
        </div>
    );
}
