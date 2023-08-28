import { MilestoneType } from "./MilestoneType";
export interface DataType {
    _id: string,
    user: string,
    tasks: {
        name: string,
        desc: string,
        creation: Date,
        completion: string | Date,
        deadline: Date,
        comments: string[],
        milestones: MilestoneType,
        reminder: boolean
    }[]
}