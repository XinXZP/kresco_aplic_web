import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { title, content } = body;

        const newIdea = await prisma.idea.create({
            data: {
                title,
                content,
            },
        });

        return NextResponse.json(newIdea, { status: 201 });
    } catch (error) {
        console.error('Error al crear idea:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
