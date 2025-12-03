import Link from "next/link";
import React from "react";

import { Trans } from "react-i18next";

function MegaMenuCategories({ categoryData }) {
  const isLoading = !categoryData || categoryData.length === 0;

  return (
    <div className="col-4">
      <div className="categoriesWrapper">
        <h6>
          <Trans i18nKey="common.categories"></Trans>
        </h6>
        <ul>
          {isLoading ? (
            <p>
              <Trans i18nKey="common.categories"></Trans>{" "}
              loading...
            </p>
          ) : (
            categoryData.slice(0, 6).map((data) => (
              <li key={data.id}>
                <Link
                  href={`/tours?categories=${data.slug}`}
                  id={data.id}
                  className="nounderline"
                >
                  {data.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default MegaMenuCategories;
