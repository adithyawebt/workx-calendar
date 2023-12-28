import React, { useState } from 'react';
import styles from './Calendar.module.scss';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export const Calendar = () => {
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

    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 15 }, (_, index) => currentYear + index);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(e.target.value, 10);
        setCurrentMonth(selectedMonth);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = parseInt(e.target.value, 10);
        setCurrentYear(selectedYear);
    };

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <select value={currentMonth.toString()} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index.toString()}>{month}</option>
                    ))}
                </select>
                <select value={currentYear.toString()} onChange={handleYearChange}>
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
                {getDaysArray(currentYear, currentMonth).map((day, index) => (
                    <div
                        key={index}
                        className={`${styles.day} ${day === selectedDay ? styles.active : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day !== '' && <span>{day}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};
