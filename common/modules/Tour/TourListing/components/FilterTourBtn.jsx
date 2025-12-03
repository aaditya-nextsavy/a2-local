import React, { useState } from "react";
import { FilterTourContentMobile } from "./FilterTourContentMobile";
import { Trans } from "react-i18next";



const FilterTourBtn = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerToggleClickHandler = () => {
        setDrawerOpen(!drawerOpen);
    };
    const backDropClickHandler = () => {
        setDrawerOpen(false);
    };

    let backdrop;
    if (drawerOpen) {
        backdrop = <div className="backdrop" onClick={backDropClickHandler}></div>;
    }
    return (
        <div>
            <FilterTourContentMobile show={drawerOpen} clickedClose={backDropClickHandler}/>
            {backdrop}
            <button className="ButtonSmall" onClick={drawerToggleClickHandler}><Trans i18nKey="common.filter"></Trans></button>
        </div>
    );
};

export default FilterTourBtn