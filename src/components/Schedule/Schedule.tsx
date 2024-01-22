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
                            <div className={styles.detailsHolder}>
                                <div className={styles.time}>8 AM</div>
                                <div className={styles.details}>
                                    <li>Employee 1 Checked in at 8:04AM</li>
                                    <li>Employee 3 is in meeting with Client 1 starting at 8:30 AM</li>
                                    <li>Employee 2 Checked out at 8:35AM</li>
                                </div>
                            </div>
                            <div className={styles.dividerSmall}></div>
                            <div className={styles.detailsHolder}>
                                <div className={styles.time}>9 AM</div>
                                <div className={styles.details}>
                                    <li>Employee 2 Checked in at 9:41AM</li>
                                    <li>Employee 1 Checked out at 9:44AM</li>
                                    <li>Employee 4 is in meeting with Client 2 starting at 9:45 AM</li>
                                </div>
                            </div>
                            <div className={styles.dividerSmall}></div>
                            <div className={styles.detailsHolder}>
                                <div className={styles.time}>10 AM</div>
                                <div className={styles.details}>
                                    <li>Employee 3 is in meeting with Client 1 starting at 10:15 AM</li>
                                    <li>Employee 4 Checked out</li>
                                    <li>Employee 5 Checked-in at 10:28AM</li>
                                </div>
                            </div>
                            <div className={styles.dividerSmall}></div>
                            <div className={styles.detailsHolder}>
                                <div className={styles.time}>11 AM</div>
                                <div className={styles.details}>
                                    <li>Employee 3 is in meeting with Client 1 starting at 10:15 AM</li>
                                    <li>Employee 4 Checked out</li>
                                    <li>Employee 5 Checked-in at 10:28AM</li>
                                </div>
                            </div>
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
