import React, { useState } from 'react';
import Calendar from 'react-calendar';
import MakeTour from '../MakeTour';

function TestCalender() {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDateFixed, setselectedDateFixed] = useState(null);
    const [SelectedData, setSelectedData] = useState();


    const reload = () => window.location.reload();

    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    const handleDateChange = (date) => {

        console.log(date)


        setselectedDateFixed(date);
        setCalendarVisible(false);
        localStorage.setItem('dates', date)
    };

    const handleSubmit = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const dateSelected = `${selectedDateFixed.getDate()}`
        const monthSelected = `${months[selectedDateFixed.getMonth()]}`
        const yearSelected = `${selectedDateFixed.getFullYear()}`

        const formattedDate = { date: dateSelected, month: monthSelected, year: yearSelected }

        localStorage.setItem('selectedDateFixed', JSON.stringify(formattedDate));
        localStorage.setItem('dateIsSelected', true)

        // console.log(this.state.data);

        reload()
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);


    return (
        <>
            <Calendar
                onChange={handleDateChange}
                maxDate={maxDate}
                minDate={minDate}
                showNeighboringMonth={true}
                locale={"en-US"}
            />
            <div className="MakeTourCalenderBtns selectDateBtn d-flex align-items-center ">
                <button className="SecondaryButton" onClick={handleSubmit}>Select Date</button>
            </div>
        </>
    );
}

export default TestCalender
