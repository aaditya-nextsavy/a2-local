import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const MegaMenuLocations = ({ locationData }) => {

    return (
        <>
          {locationData.map((data) => (
            <li key={data.id}>
              <Link href={`/tours/?locations=${data.slug}`} className="nounderline">
                {data.location}
              </Link>
            </li>
          ))}
        </>
      );
    }
    


export default MegaMenuLocations;
