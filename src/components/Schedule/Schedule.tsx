import { useState } from 'react';
import styles from './Schedule.module.scss';

interface ScheduleProps {
    events: Record<number, string[]>;
    selectedDay: number;
}

const Schedule = ({ events, selectedDay }: ScheduleProps) => {
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
                        
                    </div>
                )}
                {selectedTab === 'Leaves' && (
                    <div className={styles.content}>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;
