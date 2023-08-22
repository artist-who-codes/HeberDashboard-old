export interface TaskType {
    name: string,
    desc: string,
    creation: Date,
    deadline: Date,
    comments: string[],
    milestones: { [key: string]: boolean; }
    reminder: boolean
}
