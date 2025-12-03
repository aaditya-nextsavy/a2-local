import React, { useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next';
import partnersImgOn from '@/public/assets/images/partners-img-1.png'
import partnersImgtw from '@/public/assets/images/partners-img-2.png'
import partnersImgth from '@/public/assets/images/partners-img-3.png'
import partnersImgfo from '@/public/assets/images/partners-img-4.png'
import partnersImgfv from '@/public/assets/images/partners-img-5.png'
import partnersImgsi from '@/public/assets/images/partners-img-6.png'
import partnersImgsa from '@/public/assets/images/partners-img-7.png'
import partnersImgei from '@/public/assets/images/partners-img-8.png'
import partnersImgni from '@/public/assets/images/partners-img-9.png'
import partnersImgte from '@/public/assets/images/partners-img-10.png'
import partnersImgel from '@/public/assets/images/partners-img-11.png'
import Link from 'next/link';
import Image from 'next/image';

const OurPartners = () => {

    const partnersImages = [
        { id: 1, src: partnersImgOn.src, name: '', link: 'https://www.aramco.com/' },
        { id: 2, src: partnersImgfv.src, name: '', link: 'https://www.seera.sa/en/' },
        { id: 3, src: partnersImgth.src, name: '', link: 'https://www.sta.gov.sa/en/home' },
        { id: 4, src: partnersImgfo.src, name: '', link: 'https://mt.gov.sa/' },
        { id: 5, src: partnersImgtw.src, name: '', link: 'https://dgda.gov.sa/home.aspx' },
        { id: 6, src: partnersImgsi.src, name: '', link: 'https://www.maaden.com.sa/' },
        { id: 7, src: partnersImgsa.src, name: '', link: 'https://www.linkedin.com/company/jarir-investment' },
        { id: 8, src: partnersImgei.src, name: '', link: 'https://www.pif.gov.sa/' },
        { id: 9, src: partnersImgni.src, name: '', link: 'https://www.tcsworldtravel.com/' },
        { id: 10, src: partnersImgte.src, name: '', link: 'https://global.almosafer.com/' },
        { id: 11, src: partnersImgel.src, name: '', link: 'https://www.world-of-dmcs.com/' },
    ];

    return (
        <div className='our-parners-section-wrapper'>
            <div className="container">
                <div className="withwhitebg">
                    <div className='SectionTitle'>
                        <h5><Trans i18nKey="Ourpartners.SubTitle"></Trans></h5>
                        <h2><Trans i18nKey="Ourpartners.MainTitle"></Trans></h2>
                    </div>
                    <div className="our-partners-content-wrapper">  
                        <div className='row justify-content-center'>
                            {partnersImages.map((LogoData) => (
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-4" key={LogoData.id}>
                                    <Link href={LogoData.link} target="_blank" className="nounderline">
                                        <Image src={LogoData.src} alt={LogoData.src} className="our-partners-img" width={100} height={72} quality={80} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurPartners