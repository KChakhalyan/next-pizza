'use client';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { Title } from './Title';
import React, { useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { useCatrygoryStore } from '@/store/category';

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    items: { price: number }[];
}

interface ProductsGroupListProps {
    title: string;
    products: Product[];
    listClassName?: string;
    categoryId: number;
    className?: string;

}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
    title,
    products,
    listClassName,
    categoryId,
    className,

}) => {
    const setActiveCategoryId = useCatrygoryStore((state) => state.setActivId);
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.1
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
            console.log(title, `Category ${categoryId} is in view`);
        }
    }, [intersection?.isIntersecting, title, categoryId, setActiveCategoryId]);

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
            <Title className='font-extrabold mb-5' size='lg' text={title} />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product) => (
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