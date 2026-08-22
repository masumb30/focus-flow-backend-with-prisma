export declare const ProjectType: {
    readonly PERSONAL: 'PERSONAL';
    readonly TEAM: 'TEAM';
};
export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];
export declare const TaskStatus: {
    readonly IDEAL: 'IDEAL';
    readonly PENDING: 'PENDING';
    readonly RUNNING: 'RUNNING';
    readonly COMPLETE: 'COMPLETE';
    readonly PAUSED: 'PAUSED';
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
//# sourceMappingURL=enums.d.ts.map