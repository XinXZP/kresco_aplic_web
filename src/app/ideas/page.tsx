import Link from "next/link";
import styles from "../../components/ideasList.module.css";
import {PrismaClient} from "@/generated/prisma";

const prisma = new PrismaClient();

async function handleVote(ideaId: number) {
    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ideaId }),
        });

        if (!response.ok) throw new Error('Error al votar');
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

export default async function IdeaListPage() {
    const ideas = await prisma.idea.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Lista de ideas</h1>
                <Link href="/ideas/new" className={styles.createButton}>
                    Crear nueva idea
                </Link>
            </div>

            {ideas.length === 0 ? (
                <p className={styles.emptyMessage}>No hay ideas aún.</p>
            ) : (
                <ul className={styles.ideaList}>
                    {ideas.map((idea) => (
                        <li key={idea.id} className={styles.ideaCard}>
                            <h2 className={styles.ideaTitle}>{idea.title}</h2>
                            {idea.content && <p className={styles.ideaContent}>{idea.content}</p>}

                            <div className={styles.voteSection}>
                                <button
                                    onClick={() => handleVote(idea.id)}
                                    className={styles.voteButton}
                                >
                                    👍
                                </button>
                                <span className={styles.voteCount}>{idea.votes}</span>
                            </div>

                            <p className={styles.ideaDate}>
                                {new Date(idea.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}