
import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { MilestoneType } from '@/types/MilestoneType';

const uri = "mongodb://localhost:27017"

export async function GET(
    request: NextRequest,
    { params }: { params: { user: string } }
) {
    const user = params.user
    const client = new MongoClient(uri);
    await client.connect();
    try {

        console.log('Connected to MongoDB');
        const database = client.db('Task-1');
        const Taskies = database.collection('Taskies');
        const data = await Taskies.find({ user: `${user}` }).toArray();
        let response = {
            data
        }

        return NextResponse.json(response);
    }
    catch (error) {
        console.log("error")
        return (error)
    }
    finally {
        await client.close()
    }
}
export async function POST(request: NextRequest,
    { params }: { params: { user: string } }) {
    const data = await request.json();
    const newMilestones = data.milestones
    console.log(newMilestones)
    const Name = data.name
    const User = params.user
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('Task-1');
    const Taskies = database.collection('Taskies');
    const path = request.nextUrl.href
    console.log(path)
    try {
        const result = await Taskies.updateOne(
            { "user": User, "tasks.name": Name }, // Filter condition to find the task
            { $set: { "tasks.$.milestones": newMilestones } } // Update the milestones
        );
        revalidatePath(path)
        return NextResponse.json(result)
    }
    catch (error) {
        console.log(error)
    }

}
export async function DELETE(request: NextRequest,
    { params }: { params: { user: string } }) {
    const data = await request.json();
    const taskName = data
    const User = params.user
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('Task-1');
    const Taskies = database.collection('Taskies');
    try {
        const result = await Taskies.updateOne(
            { "user": User }, // Filter condition to find the task
            { $pull: { "tasks": { "name": taskName } } }  // Update the milestones
        );

        return NextResponse.json(result)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        await client.close();
    }

}
export async function PUT(request: NextRequest,
    { params }: { params: { user: string } }) {
    const data = await request.json();
    console.log(data)
    const milestones = data.milestones.split(',')
    const Milestones: MilestoneType = {};
    for (const key of milestones) {
        Milestones[key] = false;
    }
    const Comments = data.comments.split(',')
    const combinedDateTime = `${data.deadlineDate}T${data.deadlineTime}:00`;
    const Deadline = new Date(combinedDateTime);
    const Creation = new Date()
    const onetask = {
        name: data.name,
        desc: data.desc,
        creation: Creation,
        completion: '',
        deadline: Deadline,
        comments: Comments,
        milestones: Milestones,
        reminder: false
    }
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('Task-1');
    const Taskies = database.collection('Taskies');
    try {
        const result = await Taskies.updateOne(
            { "user": data.user }, // Filter condition to find the task
            { $push: { "tasks": onetask } } // Update the milestones
        );
        return NextResponse.json(result)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        await client.close();
    }

}