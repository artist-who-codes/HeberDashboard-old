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
