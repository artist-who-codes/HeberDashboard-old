import { MilestoneType } from "@/types/MilestoneType";
import { TaskType } from "@/types/TaskType";


export function ToLocalTime(date: Date) {
    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);
    return date
}
export function TimeDifference(date1: Date, date2: Date) {
    const ms = (date1.getTime() - date2.getTime())
    var hoursleft = Math.floor(ms / 1000 / 60 / 60);
    return hoursleft
}

export function FormatDate(Date1: Date) {
    const now = new Date();
    const date1 = new Date(Date1)
    const nowYear = now.getUTCFullYear()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = date1.getUTCDate()
    const month = monthNames[date1.getMonth()]
    const day = days[date1.getDay()]
    const year = date1.getUTCFullYear()
    var formattedDate: string
    if (nowYear === year) {
        formattedDate = date + " " + month + ", " + day
    }
    else {
        formattedDate = date + " " + month + ", " + year
    }
    return formattedDate
}

export function GetDay(date: Date) {
    const now = new Date();
    const deadline = new Date(date)
    const Now = ToLocalTime(now)
    const hoursleft = TimeDifference(deadline, Now)
    const daysLeft = Math.abs(hoursleft / 24)
    var DString: string

    if (hoursleft < 0) {
        DString = "Crossed Deadline"
    }
    else if (daysLeft < 1) {
        DString = "Today";
    }
    else if (daysLeft === 1) {
        DString = "Tomorrow"
    }
    else {
        DString = FormatDate(deadline)
    }
    return DString
}
export function getProgress(Milestones: MilestoneType) {
    const totalValues = Object.keys(Milestones).length;
    const trueValues = Object.values(Milestones).filter((value) => (value)).length;
    const percentage = trueValues * 100 / totalValues;
    return percentage
}
export function getPreviousDate(daysAgo: number) {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - daysAgo);
    return previousDate;
}

export function getNextDate(daysAfter: number) {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() + daysAfter);
    return previousDate;
}
export function getThisWeek() {
    const day1 = getPreviousDate(2)
    const day2 = getPreviousDate(1)
    const day3 = new Date()
    const day4 = getNextDate(1)
    const day5 = getNextDate(2)
    const day6 = getNextDate(3)
    const day7 = getNextDate(4)
    const thisweek = [day1, day2, day3, day4, day5, day6, day7]
    return thisweek
}

export function getLeastDeadline(Tasks: TaskType[]) {
    var deadlines = []
    for (var i = 0; i < Tasks.length; i++) {
        deadlines.push(Tasks[i].deadline)
    }
    const currentDate = new Date();
    var nearestDate
    var minDifference = Infinity

    for (const date of deadlines) {
        const dateObject = new Date(date);
        const difference = TimeDifference(dateObject, currentDate)

        if (difference < minDifference) {
            minDifference = difference;
            nearestDate = dateObject;
        }
    }

    return nearestDate;
}