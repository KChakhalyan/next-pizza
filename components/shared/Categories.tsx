'use client';
import { cn } from '@/lib/utils';
import { useCatrygoryStore } from '@/store/category';
import React, { use } from 'react';

interface CategoriesProps {
    className?: string;
}

const categories = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Breakfast' },
    { id: 3, name: 'Drinks' },
    { id: 4, name: 'Desserts' },
    { id: 5, name: 'Sauces' },
];


export const Categories: React.FC<CategoriesProps> = ({ className }) => {
    const categoryActivId = useCatrygoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-xl', className)}>
            {
                categories.map(({ name, id }, index) => (
                    <a
                        key={index}
                        className={cn('flex items-center font-bold h-11 px-5 rounded-2xl', categoryActivId === id && 'bg-white shadow-md shadow-gray-200 text-primary')}
                        href={`/#${name}`}>
                        <button className='cursor-pointer'>
                            {name}
                        </button>
                    </a>
                ))
            }
        </div>
    )
}