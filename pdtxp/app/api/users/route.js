import connect from "../../../libs/mongodb";
import Users from "../../../models/users";
import { NextResponse } from "next/server";

// for getting all the users
export async function GET(){
    await connect();
    const users = await Users.find();
    return NextResponse.json({users}, {status:200});
}