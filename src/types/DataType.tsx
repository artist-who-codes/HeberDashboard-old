export interface DataType {
    user: string,
    tasks: {
        name: string,
        desc: string,
        creation: Date,
        deadline: Date,
        comments: string[],
        milestones: { [key: string]: boolean; }
        reminder: boolean
    }[]
}