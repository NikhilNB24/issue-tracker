import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/app/validationSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = userSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation!.error!.format(), { status: 400 });

    const user = await prisma.user.findUnique({
        where: {
            email: body!.email,
        },
    });

    if (user)
        return NextResponse.json(
            { error: "User with the provided email already exists" },
            { status: 400 }
        );

    const hashedPassword = await bcrypt.hash(body!.password, 10);
    await prisma.user.create({
        data: {
            email: body!.email,
            hashedPassword,
        },
    });

    return NextResponse.json(
        { message: "New user successfully registered" },
        { status: 200 }
    );
}
