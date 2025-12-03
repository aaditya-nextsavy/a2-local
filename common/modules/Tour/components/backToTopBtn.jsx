import React, { useState } from 'react';
// import { FaArrowCircleUp } from 'react-icons/fa';
// import { Button } from './Styles';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 600) {
            setVisible(true)
        }
        else if (scrolled <= 700) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="back-top-btn" style={{position: 'relative'}}>
            <button className='ButtonSmall' onClick={scrollToTop}
                style={{ top: visible ? '300px' : '' , position: visible ? 'fixed' : 'relative'}} >Back To Top</button>
        </div>

    );
}

export default ScrollButton;