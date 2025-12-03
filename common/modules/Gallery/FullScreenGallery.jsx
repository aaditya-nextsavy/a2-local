import React from 'react';
import { Modal } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import imageClose from '@/public/assets/images/close-button.svg'

export default function FullScreenGallery(props) {
    const { images, isOpen, onClose } = props;
    // console.log("modal off plan", images)
    let alllImg = []
    images.forEach(imgData => {
        alllImg.push(imgData)
    });

    let newImage = alllImg.map(items => ({
        original: items.original,
        thumbnail: items.original, // You can adjust the thumbnail URL here if needed
    }))

    // console.log("newImage", newImage)

    return (
        <Modal show={isOpen} onHide={onClose} size="xl" fullscreen className='gallery-modal-wrapper'>
            {/* <Modal.Header className='gallery-modal-header-wrapper'>

            </Modal.Header> */}
            <Modal.Body className='gallery-modal-body-wrapper'>
                <div className='position-relative'>
                    <div className='close-btn-wrapper'>
                        <img src={imageClose.src} alt={imageClose.src} className='close-btn' onClick={onClose} />
                    </div>
                </div>

                <div className='gallery-content-wrapper'>


                    <div className="gallery-container">
                        <ImageGallery
                            items={newImage}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showThumbnails={false}
                            disableSwipe={false}
                        />
                    </div>

                </div>
            </Modal.Body>

        </Modal>
    );
}
