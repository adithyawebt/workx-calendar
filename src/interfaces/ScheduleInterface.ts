interface SummaryInfo {
    time: string;
    details: string[];
}

interface ProjectInfo {
    projectName: string;
    clientName: string;
    status: 'OnTrack' | 'Risk' | 'Archived';
    tasks: { taskName: string; assignedTo: string }[];
}

interface LeaveInfo {
    employee: string;
    leaveType: string;
    startDate: string;
    endDate: string;
}

export type { SummaryInfo, ProjectInfo, LeaveInfo };
