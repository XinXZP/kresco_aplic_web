'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../components/ideaForm.module.css';

export default function NewIdeaPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('../../api/ideas/new', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push('/ideas');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Nueva Idea</h1>
                    <p className={styles.subtitle}>Comparte tu idea innovadora</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.inputField}
                            placeholder="Título"
                            required
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={styles.inputField}
                            placeholder="Descripción"
                            rows={4}
                        />
                        <button type="submit" className={styles.submitButton}>
                            Guardar Idea
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
