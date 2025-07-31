import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ className, id, name, price, imageUrl, }) => {
    return (
        <div className={cn('', className)}>
            <Link href="/product/1">
                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                    <Image src={imageUrl ?? '/placeholder.png'} alt="Product" width={215} height={215} />
                </div>
            </Link>
        </div>
    );
};