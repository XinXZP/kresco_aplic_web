"use client";

import styles from "./ideasList.module.css";
import { useRouter } from 'next/navigation';
import { ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import {useState} from "react";

type Idea = {
    id: number;
    title: string;
    content: string | null;
    votes: number;
    createdAt: Date;
};

export default function IdeaListClient({ ideas }: { ideas: Idea[] }) {
    const router = useRouter();
    const [animateId, setAnimateId] = useState<number | null>(null);

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
                setAnimateId(ideaId);

                setTimeout(() => {
                    setAnimateId(null);
                }, 500);
                router.refresh();
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
                                <motion.button
                                    onClick={() => handleVote(idea.id)}
                                    className={styles.voteButton}
                                    whileTap={{ scale: 1.3 }}
                                    animate={animateId === idea.id ? { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.4, 1] } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ThumbsUp size={24} />
                                </motion.button>
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
