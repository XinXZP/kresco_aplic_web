"use client";

import Link from "next/link";
import styles from "./ideasList.module.css";
import { useRouter } from 'next/navigation';

type Idea = {
    id: number;
    title: string;
    content: string | null;
    votes: number;
    createdAt: Date;
};

export default function IdeaListClient({ ideas }: { ideas: Idea[] }) {
    const router = useRouter();
    async function handleVote(ideaId: number) {
        try {
            const response = await fetch('/api/ideas/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ideaId }),
            });

            if (!response.ok) throw new Error('Error al votar');
            else {
                router.push('/ideas');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <main className={styles.container}>

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
