import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

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