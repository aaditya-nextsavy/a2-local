import React from 'react'

import { Trans } from 'react-i18next';
import Testimonials from '../../SliderTestimonial/testimonials';


const TestimonialMap = ({ testimonialsInfo }) => {
    return (
        <section className='TestimonialMapWrapper'>
            <div className="container">
                <div className="withwhitebg">
                    <div className='SectionTitle'>
                        <h5><Trans i18nKey="Testimonials.SubTitle"></Trans></h5>
                        <h2><Trans i18nKey="Testimonials.MainTitle"></Trans></h2>
                    </div>
                </div>
            </div>
            <div className='mapbgwrapper'>
                <Testimonials testimonialsInfo={testimonialsInfo} />
            </div>
        </section>
    )
}

export default TestimonialMap
