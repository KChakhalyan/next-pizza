import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from './Title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ className, id, name, price, imageUrl, }) => {
    return (
        <div className={cn('', className)}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                    <Image src={imageUrl ?? '/placeholder.png'} alt={name} width={215} height={215} />
                </div>
                <Title className='font-bold mb-1 mt-3' size='sm' text={name} />
                <p className='text-sm text-gray-400'>
                    Chicken, mozzarella, cheddar and parmesan cheese, cheese sauce, tomatoes, alfredo sauce, garlic
                </p>
                <div className='flex items-center justify-between mt-4'>
                    <span className='text-[20px]'>
                        from <b>{price} $</b>
                    </span>
                    <Button variant='secondary' className='text-base font-bold cursor-pointer'>
                        <Plus size={20} className='mr-1' />
                        Add to cart
                    </Button>
                </div>
            </Link >
        </div >
    );
};