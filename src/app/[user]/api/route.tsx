import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";
import { headers } from "next/headers"

const uri = "mongodb://localhost:27017"

export async function GET(
    request: Request,
    { params }: { params: { user: string } }
) {
    const user = params.user
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('Task-1');
        const Taskies = database.collection('Taskies');
        const data = await Taskies.find({ user: `${user}` }).toArray();
        let response = {
            tasks: data
        }
        return NextResponse.json(response);
    }
    catch (error) {
        console.log("error")
        return (error)
    }
}