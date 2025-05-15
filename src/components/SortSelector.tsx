'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from "@/components/ideasList.module.css";
import Link from "next/link";

const options = [
    { value: 'createdAt', label: 'Fecha de publicación' },
    { value: 'title', label: 'Alfabético (título)' },
    { value: 'votes', label: 'Número de votos' },
];

export default function SortSelector({ selected }: { selected: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("orderBy", e.target.value);
        router.push(`/ideas?${newParams.toString()}`);
    };

    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <Link href="/ideas/new" className={styles.createButton}>
                    Crear nueva idea
                </Link>
            </div>

            <div className={styles.headerBottom}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Lista de ideas</h1>
                </div>

                <div className={styles.sortSection}>
                    <label htmlFor="sort" className={styles.sortLabel}>Ordenar por:</label>
                    <select id="sort" value={selected} onChange={handleChange} className={styles.sortSelect}>
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
