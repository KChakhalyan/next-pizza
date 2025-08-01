'use client';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { Title } from './Title';
import React, { useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { useCatrygoryStore } from '@/store/category';


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
    const setActiveCategoryId = useCatrygoryStore((state) => state.setActivId);
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.1
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, title, categoryId]);

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
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