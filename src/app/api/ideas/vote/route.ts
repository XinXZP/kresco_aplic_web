import { NextResponse } from "next/server";
import {PrismaClient} from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { ideaId } = await request.json();

    try {
        const updatedIdea = await prisma.idea.update({
            where: { id: Number(ideaId) },
            data: { votes: { increment: 1 } }
        });

        return NextResponse.json(updatedIdea);
    } catch (error) {
        return NextResponse.json(
            { error: "Error al votar" },
            { status: 500 }
        );
    }
}