import { cn } from '@/lib/utils';
import React from 'react';

interface ProductsGroupListProps {
    title: string;
    products: CategoryProducts['products'];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({ className }) => {
    return (
        <div className={cn('', className)}>

        </div>
    );
};