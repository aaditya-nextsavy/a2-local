import React from "react";
import { Trans } from "react-i18next";


import Link from "next/link";
import config from "@/common/config/config";

function MegaMenuLocations({ locationData }) {
  const isLoading = !locationData || locationData.length === 0;

  return (
    <div className="col-8 locationBorder">
      <h6>
        <Trans i18nKey="common.location"></Trans>
      </h6>
      <div className="locationsWrapper">
        <div className="locationsBoxes d-flex align-items-center flex-wrap">
          {isLoading ? (
            <p>
              <Trans i18nKey="common.location"></Trans>{" "}
              loading...
            </p>
          ) : (
            locationData.slice(0,10).map((locationData) => (
              <div className="locationBoxWrapper" key={locationData.id}>
                <Link
                  href={`/tours/?locations=${locationData.slug}`}
                  className="nounderline d-block h-100"
                  id={locationData.id}
                >
                  <img
                    src={config.imageBaseURL + locationData.image}
                    className="locationImg"
                    alt={locationData.location}
                  />
                  <p className="locationTitle">{locationData.location}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MegaMenuLocations;
