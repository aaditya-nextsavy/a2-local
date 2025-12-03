import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useRouter } from "next/router";

const MegaMenuPopulerTours = ({ populerTourData }) => {
  const router = useRouter();
  let populerTourDataSliced = populerTourData?.slice(0, 12);
  const handletourClick = async ({ tour, e }) => {
    // alert("working alert");
    // e.preventDefault();
    e.preventDefault();

    console.log("header click button ", tour, e);
    await router.push(`/tours/${tour.id}/${tour.slug}`);
    router.replace(router.asPath);
    // await router.push(`/tours/${tour.id}/${tour.slug}`);
    // window.location.reload();
    // setTimeout(() => {

    //     window.location.reload()
    // }, 100);
  };

  return (
    <div className="col-8 locationBorder">
      <h6>
        <Trans i18nKey="Popular.SubTitle"></Trans>
      </h6>
      <div className="mega-menu-populer-tours">
        {populerTourData ? (
          <ul>
            {populerTourDataSliced.map((tour, index) => (
              <li key={index}>
                <Link
                  href={`/tours/${tour.id}/${tour.slug}`}
                  className="nounderline"
                  // onClick={(e) => handletourClick({ tour, e })}
                >
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default MegaMenuPopulerTours;
