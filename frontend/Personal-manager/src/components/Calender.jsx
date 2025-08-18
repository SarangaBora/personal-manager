import { useState } from "react";
import { useDate } from "../contexts/selectedDateContext";
function Calender() {

    const {selectedDate, setSelectedDate } = useDate()//Select date context values



    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const daysOfMonth = (month, year) => new Date(year, month + 1, 0).getDate()

    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay()


    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonth(prev => prev - 1);
        }
    };


    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prev => prev + 1);
        } else {
            setCurrentMonth(prev => prev + 1);
        }
    };
    const renderCalendar = () => {
        const totalDays = daysOfMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);//an int number so 0-6

        const days = [];

        // Add blank days for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        // Add actual days
        for (let d = 1; d <= totalDays; d++) {
            const isToday =
                d === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

            days.push(
                <div
                    key={d}
                    className={`day ${isToday ? 'today' : ''}`}
                    onClick={() => {
                        console.log(`Clicked on ${d}/${currentMonth + 1}/${currentYear}`)
                        setSelectedDate(new Date(currentYear, currentMonth, d))//WILL SELECT THE DATE AND CHANGE THE CONTEXT.
                        console.log(selectedDate)//TEST LINE
                        // console.log(new Date(currentYear, currentMonth, d))//TEST LINE
                    }}
                >
                    {d}
                </div>
            );
        }


        return days;
    };


    const months = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December']

    const handleChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };


    return (
        <div className="calendar-container">
            <div className="header">
                <button onClick={prevMonth}>←</button>
                {/* <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2> */}
                <select value={currentMonth} onChange={(e) => handleChange(e)}>

                    {months.map((month, index) => (

                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))
                    }
                </select>
                <button onClick={nextMonth}>→</button>
            </div>

            <div className="days-header">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div className="day-name" key={d}>{d}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {renderCalendar()}
            </div>
        </div >
    );

}

export default Calender;