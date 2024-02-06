interface SummaryInfo {
    time: string;
    details: string[];
}

interface LeaveInfo {
    employee: string;
    leaveType: string;
    startDate: string;
    endDate: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface ProjectStatus {
    checkIn: {
        label: string;
        status: number;
        time: string;
        plannedTasks: string;
    };
    checkOut: {
        taskProgression: string;
        label: string;
        status: number;
        time: string;
        reason: string;
        tasksProgression: string;
    };
}

interface EmployeeData {
    id: string;
    user: User;
    projectStatus: ProjectStatus;
    autoCheckedOut: boolean;
    userBlockers: null | string;
    projectAssignment: string;
}

export type { SummaryInfo, LeaveInfo, EmployeeData };
