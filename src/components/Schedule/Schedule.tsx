import { useState } from 'react';
import styles from './Schedule.module.scss';

import RightArrow from '../../assets/icons/circle-right.svg';
import LeftArrow from '../../assets/icons/circle-left.svg';

import summaryData from '../../mockData/summaryData.json';
import projectData from '../../mockData/projectData.json';
import leaveData from '../../mockData/leaveData.json'

// import { SummaryInfo, ProjectInfo, LeaveInfo } from '../../interfaces/ScheduleInterface';

interface ScheduleProps {
    selectedDay: number;
    onDayChange: (newDay: number) => void,
}

const Schedule = ({
    selectedDay,
    onDayChange }: ScheduleProps) => {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Tasks' | 'Leaves'>('Summary');

    const statusClassMap: Record<string, string> = {
        OnTrack: styles.onTrack,
        Risk: styles.risk,
        Archived: styles.archived,
    };

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
                            {projectData.map((project, index) => (
                                <div key={index} className={styles.project}>
                                    <div className={styles.projectHeader}>
                                        <div className={styles.projectName}>
                                            <span>{project.projectName}</span>
                                            <span>{project.clientName}</span>
                                        </div>
                                        <div className={`${styles.projectStatus} ${statusClassMap[project.status]}`}>
                                            {project.status}
                                        </div>
                                    </div>
                                    {project.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex} className={styles.projectDetails}>
                                            <span>{task.taskName}:</span>
                                            <span>{task.assignedTo}</span>
                                        </li>
                                    ))}
                                    <div className={styles.dividerSmall}></div>
                                </div>
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
