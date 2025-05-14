import { PrismaClient } from "@/generated/prisma";
import IdeaListClient from "@/components/IdeaListClient";
import SortSelector from "@/components/SortSelector";
import { Suspense } from "react";

const prisma = new PrismaClient();

export default async function IdeaListPage({ searchParams }: { searchParams: { orderBy?: string } }) {
    const orderBy = searchParams.orderBy || "createdAt";

    const validFields = ["title", "createdAt", "votes"];
    const sortField = validFields.includes(orderBy) ? orderBy : "createdAt";

    const ideas = await prisma.idea.findMany({
        orderBy: { [sortField]: sortField === "title" ? "asc" : "desc" }
    });

    return (
        <main>
            <SortSelector selected={sortField} />
            <Suspense fallback={<p>Cargando ideas...</p>}>
                <IdeaListClient ideas={ideas} />
            </Suspense>
        </main>
    );
}
