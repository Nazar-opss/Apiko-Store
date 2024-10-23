import React, { Suspense } from 'react'
import styles from './Catalog.module.css'
import dynamic from 'next/dynamic';

const Content = dynamic(
    () => import('../content/Content'),
    { ssr: false }
)
const Filter = dynamic(
    () => import('../filter/Filter'),
    { ssr: false }
    
)

export default async function Catalog() {

    function Skeleton({ className }) {
        return <div className={`bg-orange_main/70 motion-safe:animate-pulse ${className}`} />;
    }

    return (
        <div className={styles.container}>
            <Filter />
            <Suspense fallback={<Skeleton  className="w-[209px] h-[212px] "/>}>
                <Content />
            </Suspense>
        </div>
    );
}
