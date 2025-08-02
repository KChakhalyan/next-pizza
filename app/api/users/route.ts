import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const users = await prisma.user.findMany()
    return NextResponse.json({ users })
}
export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.create({
        data
    });
    return NextResponse.json({ user });
}