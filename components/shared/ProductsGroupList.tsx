import { cn } from '@/lib/utils';
import { Title } from './Title';
import React from 'react';
import { ProductCard } from './ProductCard';

interface ProductsGroupListProps {
    title: string;
    products: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
    title,
    products,
    listClassName,
    categoryId,
    className
}) => {
    return (
        <div className={cn('', className)}>
            <Title className='font-extrabold mb-5' size='lg' text={title} />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}

                    />
                ))}
            </div>
        </div >
    );
};