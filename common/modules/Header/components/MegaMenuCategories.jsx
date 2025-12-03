import React from 'react';
import Link from 'next/link';

function MegaMenuCategories({ categoryData }) {
  return (
    <>
      {categoryData.map((data) => (
        <li key={data.id}>
          <Link href={`/tours/?categories=${data.slug}`} className="nounderline">
            {data.title}
          </Link>
        </li>
      ))}
    </>
  );
}

export default MegaMenuCategories;  
