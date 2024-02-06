import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import Schedule from '../Schedule/Schedule';
import { EmployeeData } from '../../interfaces/ScheduleInterface';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {

    const getDaysArray = (year: number, month: number) => {
        const daysArray = [];
        const firstDayOfMonth = new Date(year, month, 1);
        const startingDay = firstDayOfMonth.getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= totalDays + startingDay; i++) {
            if (i <= startingDay) {
                daysArray.push('');
            } else {
                daysArray.push(i - startingDay);
            }
        }

        return daysArray;
    };

    const CHECK_IN_OUT_URL = 'https://workx.webtrigon.com/api/v1/check-in-out/';
    const BEARER_TOKEN = 'ad3fca0e1940fa2a53f899e59c704e41f075da12';

    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(e.target.value, 10);
        setCurrentMonth(selectedMonth);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = parseInt(e.target.value, 10);
        setCurrentYear(selectedYear);
    };

    const handleDayClick = (day: string | number) => {
        const numericDay = typeof day === 'number' ? day : parseInt(day, 10);
        setSelectedDay(numericDay);
        setCurrentMonth(currentMonth);
        setCurrentYear(currentYear);
    };

    const handleDayChange = (newDay: number) => {
        if (newDay > 0 && newDay <= getDaysArray(currentYear, currentMonth).length) {
            setSelectedDay(newDay);
            setCurrentMonth(currentMonth);
            setCurrentYear(currentYear);
        }
    };

    const fetchDayData = (formattedDate: string) => {
        const dayURL = `${CHECK_IN_OUT_URL}?date=${formattedDate}`;
        fetch(dayURL, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: { results: EmployeeData[] }) => {
                setEmployeeData(data.results);
            })
            .catch((error) => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    useEffect(() => {
        const formattedDate = `${currentYear}-${currentMonth + 1}-${selectedDay}`;
        fetchDayData(formattedDate);
    }, [currentYear, currentMonth, selectedDay]);


    return (
        <div className={styles.calendar}>
            <span className={styles.logo}>Work-<span>x</span><span>Calendar</span></span>
            <div className={styles.header}>
                <select className={styles.monthSelector} value={currentMonth.toString()} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index.toString()}>{month}</option>
                    ))}
                </select>
                <select className={styles.yearSelector} value={currentYear.toString()} onChange={handleYearChange}>
                    {years.map((year) => (
                        <option key={year} value={year.toString()}>{year}</option>
                    ))}
                </select>
            </div>
            <div className={styles.days}>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={styles.dayName}>{day}</div>
                ))}
            </div>
            <div className={styles.grid}>
                {getDaysArray(currentYear, currentMonth).map((day: string | number, index) => (
                    <div
                        key={index}
                        className={`${styles.day} ${day === selectedDay ? styles.active : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day !== '' && <span>{day}</span>}
                    </div>
                ))}
            </div>
            <Schedule
                selectedDay={selectedDay}
                selectedMonth={currentMonth}
                selectedYear={currentYear}
                onDayChange={handleDayChange}
                employeeData={employeeData} />
        </div>
    );
};

export default Calendar;
