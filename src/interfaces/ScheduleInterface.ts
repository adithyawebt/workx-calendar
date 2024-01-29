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

interface TaskInfo {
    employeeDetails: {
        employeeName: string;
        taskAssigned: string;
    };
    taskStatus: string;
    taskDetails: {
        client: string;
        project: string;
        additionalDetails: string;
    };
}

export type { SummaryInfo, LeaveInfo, TaskInfo };
