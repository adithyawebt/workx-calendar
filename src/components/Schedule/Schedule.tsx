import { useEffect, useState } from 'react';
import styles from './Schedule.module.scss';

import RightArrow from '../../assets/icons/circle-right.svg';
import LeftArrow from '../../assets/icons/circle-left.svg';
import DownArrow from '../../assets/icons/chevron-down.svg';
import UpArrow from '../../assets/icons/chevron-up.svg';

import taskData from '../../mockData/taskData.json'

import { EmployeeData } from '../../interfaces/ScheduleInterface';

interface OwnProps {
    selectedDay: number,
    selectedMonth: number,
    selectedYear: number,
    onDayChange: (newDay: number) => void,
    employeeData: EmployeeData[]
}

const Schedule = ({
    selectedDay,
    selectedMonth,
    selectedYear,
    onDayChange,
    employeeData }: OwnProps) => {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Tasks' | 'Leaves'>('Summary');
    const [taskVisibility, setTaskVisibility] = useState<boolean[]>(new Array(taskData.length).fill(false));

    const [leaveData, setLeaveData] = useState<Record<string, { employeeName: string; leaveDetails: string; date: string }[]> | null>(null);
    const [holidayData, setHolidayData] = useState<Record<string, { name: string; date: string; }[]> | null>(null);
    const [userDataMap, setUserDataMap] = useState<Record<string, { checkIn: string; checkOut: { label: string; taskProgressions: string } }>>({});
    const [currentDisplayedMonth, setCurrentDisplayedMonth] = useState<number>(selectedMonth);

    useEffect(() => {
        import('../../mockData/leaveData.json')
            .then((data) => {
                console.log('Leave Data:', data);
                setLeaveData(data.default.leaveData);
            })
            .catch((error) => {
                console.error('Error loading leave data:', error);
            });

        import('../../mockData/leaveData.json')
            .then((data) => {
                console.log('Holiday Data:', data);
                setHolidayData(data.default.holidayData);
            })
            .catch((error) => {
                console.error('Error loading holiday data:', error);
            });
    }, [selectedMonth]);

    useEffect(() => {
        const newUserMap: Record<string, { checkIn: string; checkOut: { label: string; taskProgressions: string } }> = {};
        employeeData.forEach((data) => {
            const userName = data.user.name;
            const checkInPlannedTasks = data.projectStatus.checkIn?.plannedTasks || 'No planned tasks';
            const checkOutLabel = data.projectStatus.checkOut?.label || 'No label';
            const checkOutTaskProgressions = data.projectStatus.checkOut?.tasksProgression || 'No task progressions';

            newUserMap[userName] = {
                checkIn: checkInPlannedTasks,
                checkOut: {
                    label: checkOutLabel,
                    taskProgressions: checkOutTaskProgressions
                }
            };
        });
        setUserDataMap(newUserMap);
    }, [employeeData]);

    useEffect(() => {
        console.log('Fetched employeeData:', employeeData);
    }, [employeeData]);

    const handleTaskClick = (index: number) => {
        const newTaskVisibility = [...taskVisibility];
        newTaskVisibility[index] = !newTaskVisibility[index];
        setTaskVisibility(newTaskVisibility);
    }

    const getLeavesForMonth = () => {
        const monthKey = months[currentDisplayedMonth];
        return leaveData?.[monthKey] || [];
    };

    const getHolidaysForMonth = () => {
        const monthKey = months[currentDisplayedMonth];
        return holidayData?.[monthKey] || [];
    };

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const handleNextMonthClick = () => {
        if (currentDisplayedMonth < 11) {
            setCurrentDisplayedMonth(currentDisplayedMonth + 1);
        }
    };

    const handlePrevMonthClick = () => {
        if (currentDisplayedMonth > 0) {
            setCurrentDisplayedMonth(currentDisplayedMonth - 1);
        }
    };

    type HourlyRecord = { time: string; event: string };
    type HourlyReport = Record<number, HourlyRecord[]>;


    const groupCheckInsCheckOutsByHour = () => {
        const hourlyReport: HourlyReport = {};

        employeeData.forEach((data) => {
            const checkInTime = data.projectStatus.checkIn?.time;
            const checkOutTime = data.projectStatus.checkOut?.time;

            if (checkInTime) {
                const hour = new Date(checkInTime).getHours();
                const formattedCheckInTime = new Date(checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const formattedCheckIn = `${data.user.name} checked in at ${formattedCheckInTime} ${getPeriod(checkInTime)}`;

                if (!hourlyReport[hour]) {
                    hourlyReport[hour] = [{ time: formattedCheckInTime, event: formattedCheckIn }];
                } else {
                    hourlyReport[hour].push({ time: formattedCheckInTime, event: formattedCheckIn });
                }
            }

            if (checkOutTime) {
                const hour = new Date(checkOutTime).getHours();
                const formattedCheckOutTime = new Date(checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const formattedCheckOut = `${data.user.name} checked out at ${formattedCheckOutTime} ${getPeriod(checkOutTime)}`;

                if (!hourlyReport[hour]) {
                    hourlyReport[hour] = [{ time: formattedCheckOutTime, event: formattedCheckOut }];
                } else {
                    hourlyReport[hour].push({ time: formattedCheckOutTime, event: formattedCheckOut });
                }
            }
        });

        return hourlyReport;
    };

    const getPeriod = (time: string) => {
        const hour = new Date(time).getHours();
        return hour >= 12 ? 'PM' : 'AM';
    };

    const hourlyReport = groupCheckInsCheckOutsByHour();


    return (
        <div className={styles.schedule}>
            <div className={styles.tabsHolder}>
                <div
                    className={`${styles.tab} ${selectedTab === 'Summary' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Summary')}>
                    Summary
                </div>
                <div className={`${styles.tab} ${selectedTab === 'Tasks' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Tasks')}>
                    Tasks
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'Leaves' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Leaves')}>
                    Leaves
                </div>
            </div>
            <div className={styles.contentHolder}>
                {selectedTab === 'Summary' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Summary for {`${selectedDay}/${selectedMonth}/${selectedYear}`}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.contentDetails}>
                            {Object.keys(hourlyReport).map((hour: string) => (
                                <>
                                    <div key={hour} className={styles.detailsHolder}>
                                        <div className={styles.time}>{`${hour} ${getPeriod(hourlyReport[hour][0].time)}`}</div>
                                        <div className={styles.details}>
                                            {hourlyReport[hour].map((record: HourlyRecord, index: number) => (
                                                <div key={index} className={styles.details}>{record.event}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.dividerSmall}></div>
                                </>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === 'Tasks' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Tasks for {`${selectedDay}/${selectedMonth}/${selectedYear}`}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.tasksHolder}>
                            <table className={styles.userDataTable}>
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeader}>Employee</th>
                                        <th className={styles.tableHeader}>Planned Tasks</th>
                                        <th className={styles.tableHeader}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(userDataMap).map((userName, index) => (
                                        <>
                                            <tr key={userName} className={styles.tableRow} onClick={() => handleTaskClick(index)}>
                                                <td className={styles.employeeColumn}>{userName}</td>
                                                <td className={styles.plannedTasksColumn}>
                                                    <div>{userDataMap[userName].checkIn}</div>
                                                </td>
                                                <td className={styles.statusColumn}>
                                                    <div>{userDataMap[userName].checkOut.label}</div>
                                                    <img
                                                        className={styles.toggleIcon}
                                                        src={taskVisibility[index] ? UpArrow : DownArrow}
                                                        alt="arrow"
                                                    />
                                                </td>
                                            </tr>
                                            {taskVisibility[index] && (
                                                <tr className={styles.taskProgressionRow}>
                                                    <td colSpan={3}>
                                                        Task Progression: {userDataMap[userName].checkOut.taskProgressions}
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {selectedTab === 'Leaves' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={handlePrevMonthClick} />
                            <span>Leaves for {months[currentDisplayedMonth]}</span>
                            <img src={RightArrow} onClick={handleNextMonthClick} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.leaveContainer}>
                            <div className={styles.leaves}>
                                <span className={styles.leaveHeading}>Leaves:</span>
                                {getLeavesForMonth().map((leave, index) => (
                                    <div className={styles.leave} key={index}>
                                        {leave.employeeName}: {leave.leaveDetails} ({leave.date})
                                    </div>
                                ))}
                            </div>
                            <div className={styles.holidays}>
                                <span className={styles.leaveHeading}>Holidays:</span>
                                {getHolidaysForMonth().map((holiday, index) => (
                                    <div className={styles.leave} key={index}>
                                        <span>{holiday.name}:</span>
                                        <span>{holiday.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;
