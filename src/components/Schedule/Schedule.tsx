import { useState } from 'react';
import styles from './Schedule.module.scss';

import RightArrow from '../../assets/icons/circle-right.svg';
import LeftArrow from '../../assets/icons/circle-left.svg';
import DownArrow from '../../assets/icons/chevron-down.svg';
import UpArrow from '../../assets/icons/chevron-up.svg';

import summaryData from '../../mockData/summaryData.json';
import taskData from '../..//mockData/taskData.json'
import leaveData from '../../mockData/leaveData.json'

// import { SummaryInfo, ProjectInfo, LeaveInfo } from '../../interfaces/ScheduleInterface'; //importing interface for future purposes

interface OwnProps {
    selectedDay: number;
    onDayChange: (newDay: number) => void,
}

const Schedule = ({
    selectedDay,
    onDayChange }: OwnProps) => {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Tasks' | 'Leaves'>('Summary');
    const [taskVisibility, setTaskVisibility] = useState<boolean[]>(new Array(taskData.length).fill(false));

    const handleTaskClick = (index: number) => {
        const newTaskVisibility = [...taskVisibility];
        newTaskVisibility[index] = !newTaskVisibility[index];
        setTaskVisibility(newTaskVisibility);
    }

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
                            <span>Summary for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.contentDetails}>
                            {summaryData.map((summary, index) => (
                                <>
                                    <div key={index} className={styles.detailsHolder}>
                                        <div className={styles.time}>{summary.time}</div>
                                        <div className={styles.details}>
                                            {summary.details.map((detail, detailIndex) => (
                                                <li key={detailIndex}>{detail}</li>
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
                            <span>Tasks for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.tasksHolder}>
                            {taskData.map((task, index) => (
                                <>
                                    <div key={index} className={styles.task}>
                                        <div className={styles.employeeDetails} onClick={() => handleTaskClick(index)}>
                                            <span>Employee: {task.employeeDetails.employeeName}</span>
                                            <span>Task: {task.employeeDetails.taskAssigned}</span>
                                            <div className={styles.taskStatus}>
                                                <span>{task.taskStatus}</span>
                                            </div>
                                            <img
                                                src={taskVisibility[index] ? UpArrow : DownArrow}
                                                alt=""
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTaskClick(index);
                                                }}
                                            />
                                        </div>
                                        {taskVisibility[index] ? (
                                            <div className={styles.taskDetails}>
                                                <div className={styles.dividerSmall}></div>
                                                <span>Client: {task.taskDetails.client}</span>
                                                <span>Project: {task.taskDetails.project}</span>
                                                <span>Details: {task.taskDetails.additionalDetails}</span>
                                            </div>
                                        ) : ''}
                                    </div>
                                    <div className={styles.dividerSmall}></div>
                                </>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === 'Leaves' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Leaves for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.leaveContainer}>
                            {leaveData.map((leave, index) => (
                                <div key={index} className={styles.leave}>
                                    <div className={styles.leaveType}>
                                        <span>{leave.employee}</span>
                                        <span>{leave.leaveType}</span>
                                    </div>
                                    <div className={styles.leaveDetails}>
                                        <span>Start Date: <span>{leave.startDate}</span></span>
                                        <span>End Date: <span>{leave.endDate}</span></span>
                                    </div>
                                    <div className={styles.dividerSmall}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Schedule;
