import { useState } from 'react';
import styles from './Schedule.module.scss';

import RightArrow from '../../assets/icons/circle-right.svg';
import LeftArrow from '../../assets/icons/circle-left.svg';

interface ScheduleProps {
    events: Record<number, string[]>;
    selectedDay: number;
    onDayChange: (newDay: number) => void,
}

const Schedule = ({ events, selectedDay, onDayChange }: ScheduleProps) => {
    const dayEvents = events[selectedDay] || [];
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Leaves'>('Summary');

    return (
        <div className={styles.schedule}>
            <div className={styles.tabsHolder}>
                <div
                    className={`${styles.tab} ${selectedTab === 'Summary' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Summary')}>
                    Summary
                </div>
                <div className={styles.divider}></div>
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
                    </div>
                )}
                {selectedTab === 'Leaves' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Leaves for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;
