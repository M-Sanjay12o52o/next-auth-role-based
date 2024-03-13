import { db } from "@/prismadb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password, role } = (await req.json()) as {
            username: string;
            password: string;
            role: string;
        };

        console.log("username: ", username, "password: ", password, "role: ", role)

        // const hashed_password = await hash(password, 12);

        // console.log("hashed_password: ", hashed_password)

        const user = await db.user.create({
            data: {
                name: username,
                // password: hashed_password,
                password: password,
                role: role
            },
        });

        return NextResponse.json({
            user
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
