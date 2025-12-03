import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom'



function TestMonthYear(props) {
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // Set initial state for selected month and year
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [weeks, setWeeks] = useState([]);
    const [showWeeks, setShowWeeks] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [activeButtonYear, setActiveButtonYear] = useState(null);
    const [activeButtonWeek, setActiveButtonWeek] = useState(null);
    
    const reload=()=>window.location.reload();
    
    const navigate = useNavigate()

    // Function to handle month selection
    const handleMonthChange = (event) => {
        event.preventDefault();


        setSelectedMonth(event.target.value);

        const buttonValue = event.target.value;
        // Set the "activeButton" state variable to the value of the button that was clicked
        setActiveButton(buttonValue);
    }
    // Function to handle year selection
    const handleYearChange = (event) => {
        event.preventDefault();
        setSelectedYear(event.target.value);

        const buttonValue = event.target.value;
        // Set the "activeButton" state variable to the value of the button that was clicked
        setActiveButtonYear(buttonValue);
    }
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Store selected month and year in a variable
        const selectedDateFlexible = { month: selectedMonth, year: selectedYear, week: weeks };
        const flexibleDateState = true
        // Store selected month and year in local storage
        console.log(selectedDateFlexible)
        // localStorage.setItem('selectedDateFlexible', JSON.stringify(selectedDateFlexible));
        // localStorage.setItem('ValueIsSelected', true)
        props.theDataMonth(selectedDateFlexible, flexibleDateState)
        

        
        // reload()
    }
    // Function to get months
    const getMonths = () => {
        const months = [
            { value: 0, label: 'Jan', fullLabel: 'January' },
            { value: 1, label: 'Feb', fullLabel: 'February' },
            { value: 2, label: 'Mar', fullLabel: 'March' },
            { value: 3, label: 'Apr', fullLabel: 'April' },
            { value: 4, label: 'May', fullLabel: 'May' },
            { value: 5, label: 'Jun', fullLabel: 'June' },
            { value: 6, label: 'Jul', fullLabel: 'July' },
            { value: 7, label: 'Aug', fullLabel: 'August' },
            { value: 8, label: 'Sep', fullLabel: 'September' },
            { value: 9, label: 'Oct', fullLabel: 'October' },
            { value: 10, label: 'Nov', fullLabel: 'November' },
            { value: 11, label: 'Dec', fullLabel: 'December' },
        ];
        return months.map(month => {
            return (

                <button
                    key={month.fullLabel}
                    value={month.fullLabel}
                    onClick={handleMonthChange}
                    style={{ border: month.value === selectedMonth ? '1px solid #5C0F87' : '1px solid #111111', color: month.value === selectedMonth ? '#5C0F87' : '#111111', outline: month.value === selectedMonth ? '1px solid #5C0F87' : '' }}
                    className={activeButton === month.fullLabel ? 'selectorBtnMonthYear month Selected' : 'selectorBtnMonthYear month'}
                >
                    {month.label}
                </button>
            );
        });
    }
    // Function to get years
    const getYears = () => {
        const startYear = currentYear - 0;
        const endYear = currentYear + 1;
        const years = [];
        for (let i = startYear; i <= endYear; i++) {
            years.push(i);
        }
        return years.map((year, i) => {
            return (
                <button
                    key={year}
                    value={`${year}`}
                    onClick={handleYearChange}
                    style={{ border: year === selectedYear ? '1px solid #5C0F87' : '1px solid #111111', color: year === selectedYear ? '#5C0F87' : '#111111', outline: year === selectedYear ? '1px solid #5C0F87' : '' }}
                    className={activeButtonYear === `${year}` ? 'selectorBtnMonthYear year Selected' : 'selectorBtnMonthYear year'}
                >
                    {year}
                </button>
            );
        });
    }

    const handleWeeksChange = (event) => {
        event.preventDefault();
        setWeeks(event.target.value);

        const buttonValue = event.target.value;
        // Set the "activeButton" state variable to the value of the button that was clicked
        setActiveButtonWeek(buttonValue);
    };
    const handleNextClick = (event) => {
        event.preventDefault();
        setShowWeeks(true);
    };

    const getWeeks = () => {

        return (
            <div>
                <label className='block-label'><Trans i18nKey="common.selectweeks"></Trans>:</label><br />
                <button className={activeButtonWeek === "week 1" ? 'selectorBtnMonthYear week Selected' : 'selectorBtnMonthYear week'} type='button' onClick={handleWeeksChange} value="week 1">Week 1</button>
                <button className={activeButtonWeek === "week 2" ? 'selectorBtnMonthYear week Selected' : 'selectorBtnMonthYear week'} type='button' onClick={handleWeeksChange} value="week 2">Week 2</button>
                <button className={activeButtonWeek === "week 3" ? 'selectorBtnMonthYear week Selected' : 'selectorBtnMonthYear week'} type='button' onClick={handleWeeksChange} value="week 3">Week 3</button>
                <button className={activeButtonWeek === "week 4" ? 'selectorBtnMonthYear week Selected' : 'selectorBtnMonthYear week'} type='button' onClick={handleWeeksChange} value="week 4">Week 4</button>
            </div>
        )
    }


    // const getWeeks = () => {
    //     const firstOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    //     const lastOfMonth = new Date(selectedYear, selectedMonth, 0);
    //     const used = firstOfMonth.getDay() + lastOfMonth.getDate();
    //     return Math.ceil(used / 7);
    // }
    // if (showWeeks) {
    //     return <WeekSelector />;
    // }



    return (
        <form>
            {
                showWeeks ? getWeeks() : <> <div className='yearWrapper'>
                    <label className='block-label'><Trans i18nKey="common.selectYear"></Trans>:</label><br />
                    {showWeeks ? getWeeks() : getYears()}
                </div>
                    <br />
                    <div className='monthsWrapper'>
                        <label className='block-label'><Trans i18nKey="common.selectMonth"></Trans>:</label><br />
                        {getMonths()}
                    </div> </>
            }

            <br />
            <div className="MakeTourCalenderBtns submitBtnForm d-flex align-items-center">
                {/* <button className="TertiaryButton" onClick={props.handle}>Close</button> */}

                {showWeeks === true ? <button className="SecondaryButton" type="submit" onClick={handleSubmit}><Trans i18nKey="common.selectweeks"></Trans></button> : <button className="SecondaryButton" onClick={handleNextClick}><Trans i18nKey="common.selectMonth"></Trans></button>}

            </div>
            {/* <button onClose={this.close}>Submit</button> */}
        </form>
    );
}

export default TestMonthYear