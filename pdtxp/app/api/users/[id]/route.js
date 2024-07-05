import connect from "../../../../libs/mongodb";
import Users from "../../../../models/users";
import { NextResponse } from "next/server";

// for getting all the users
export async function GET(request, {params}){
    const {id} = params;
    await connect();
    const users = await Users.findOne({_id:id});
    return NextResponse.json({users}, {status:200});
}