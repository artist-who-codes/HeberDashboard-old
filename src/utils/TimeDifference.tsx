import { MilestoneType } from "@/types/MilestoneType";

export function ToObject(keys: string[], values: boolean[]) {
    const keyValuePairs: MilestoneType = {};
    keys.forEach((key, index) => {
        keyValuePairs[key] = values[index];
    });
    return (keyValuePairs)
}