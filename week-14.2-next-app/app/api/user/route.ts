import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        await client.user.create({
            data: {
                username: body.username,
                password: body.password
            }
        });
        return NextResponse.json({
            body
        })
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message: "error while signing up",
        }, {
            status: 411
        })
    }
}