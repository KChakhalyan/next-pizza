import { cn } from '@/lib/utils';
import React from 'react';

interface CategoriesProps {
    className?: string;
}

const categories = ['Pizza', 'Salads', 'Drinks', 'Desserts', 'Sauces'];
const activeIndex = 0; // This can be dynamic based on the selected category


export const Categories: React.FC<CategoriesProps> = ({ className }) => {
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-xl', className)}>
            {
                categories.map((category, index) => (
                    <a key={index} className={cn('flex items-center font-bold h-11 px-5 rounded-2xl', activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary')}>
                        <button className='cursor-pointer'>
                            {category}
                        </button>
                    </a>
                ))
            }
        </div>
    )
}