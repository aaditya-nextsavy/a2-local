import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalenderImg from '../../../assets/images/icons_calender.svg'

const FlexibleDate = (props) => {
    const dateFix = localStorage.getItem('selectedDateFixed')
    var Data = JSON.parse(dateFix)

    const dataFlexible = props.sendData
    var DataFlexible = JSON.parse(dataFlexible)

    let [count, setCount] = useState(1);
    const [value, setValue] = useState()
    const reload = () => window.location.reload();

console.log(dataFlexible)
    const dateSelected = localStorage.getItem('dateIsSelected')
    const flexibleValue = localStorage.getItem('ValueIsSelected')

    function incrementCount() {
        count = count + 1;
        setCount(count);


    }
    function decrementCount() {
        if (count <= 0) {
            count = 0;
        } else {
            count = count - 1;
        }

        setCount(count);

    }
    const closePopup = () => {
        localStorage.setItem('ValueIsSelected', false)
        localStorage.setItem('dateIsSelected', false)
        reload()
    }



    return (
        <>
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 pb-3">
                    <div className="dateShowAndDaySelectorWrapper">
                        <div className="daatShowSelected">
                            <div className="block-title">
                                <h6>Travel Date</h6>
                            </div>

                            <div className="selectedDataWrapperFlexible">
                                <div className="img-txt d-flex align-items-center">
                                    <img src={CalenderImg} alt="" />

                                    <p className='selectedDataShowFlexible'>{`${DataFlexible.Week}, ${DataFlexible.month}, ${DataFlexible.year}`}</p>

                                </div>
                                <Link to='/maketour' onClick={closePopup}> <i class="fa-solid fa-xmark"></i></Link>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 pb-3">
                    <div className="daysSelector">
                        <div className="block-title">
                            <h6>No. of Days</h6>
                        </div>
                        <div className="counter-input-wrapper d-flex align-items-center ">
                            <button className="counter-btn" onClick={decrementCount}><i class="fa-solid fa-minus"></i></button>
                            <input
                                type="number"
                                value={count}
                                min="1"
                                className="number-counter-input"
                            />
                            <button className="counter-btn" onClick={incrementCount}><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlexibleDate
