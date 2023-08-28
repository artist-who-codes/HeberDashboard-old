import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

const uri = "mongodb://localhost:27017"

export async function GET(request: Request) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('Task-1');
        const Taskies = database.collection('TaskiesUsers');
        const data = await Taskies.find().toArray();
        let response = {
            users: data
        }
        return NextResponse.json(response);
    }
    catch (error) {
        console.log("error")
        return (error)
    }
}
export async function PUT(request: Request,) {
    const data = await request.json();
    const User = data.user
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('Task-1');
    const TaskiesUsers = database.collection('TaskiesUsers');
    const Taskies = database.collection('Taskies');
    const task = { user: User, tasks: [] }
    try {
        const result = await TaskiesUsers.insertOne(data);
        await Taskies.insertOne(task)
        return NextResponse.json(result)
    }
    catch (error) {
        console.log(error)
    }
}


