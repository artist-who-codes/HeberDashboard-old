import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';
import { ToLocalTime } from '@/utils/utillities';
import { headers } from 'next/headers';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
const uri = "mongodb://localhost:27017"

export async function POST(request: Request) {
    if (request.method == "POST") {
        const res = await request.json()
        var Creation = new Date()
        var Name = res.name;
        var Desc = res.desc;
        Creation = ToLocalTime(Creation)
        const year = res.deadlineDate.slice(0, 4) as number
        const month = res.deadlineDate.slice(5, 7) as number
        const date = res.deadlineDate.slice(8,) as number
        const hours = res.deadlineTime.slice(0, 2) as number
        const mins = res.deadlineTime.slice(3,) as number
        var Deadline = new Date(year, month - 1, date, hours, mins)
        Deadline = ToLocalTime(Deadline)
        var Comments = res.comments.split(",")
        var milestones = res.milestones.split(",") as string[]
        var Milestones = milestones.reduce((a, v) => ({ ...a, [String(v)]: false }), {})
        var User = res.user
        const Reminder = false;
        const Taskie = {
            name: Name,
            desc: Desc,
            creation: Creation,
            deadline: Deadline,
            comments: Comments,
            milestones: Milestones,
            reminder: Reminder
        }
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const database = client.db('Task-1');
            const Taskies = database.collection('Taskies');
            const result = await Taskies.updateOne(
                { user: User },
                { $push: { tasks: Taskie } }
            );
            return NextResponse.json(result)
        }
        catch {
            console.log("error")
        }
    }
    else if (request.method == "PUT") {

    }
}
