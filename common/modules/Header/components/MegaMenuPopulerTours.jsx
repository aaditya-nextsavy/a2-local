import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useTranslation, Trans } from "react-i18next";


const MegaMenuPopulerTours = ({ populerTourData }) => {

    let populerTourDataSliced = populerTourData?.slice(0, 12)
    const handletourClick = (e) => {
        setTimeout(() => {
            window.location.reload()
        }, 800);
    };

    return (
        <>
            
                {populerTourDataSliced.map((tour) => (
                    <li key={tour.id}>
                        <Link href={`/tours/${tour.id}/${tour.slug}`} className='nounderline' onClick={(e) => handletourClick(e)}>
                            {tour.title}
                        </Link>
                    </li>
                ))}
            
        </>
    );
}

export default MegaMenuPopulerTours;
