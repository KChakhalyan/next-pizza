'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import Image from 'next/image';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';


interface SearchInputProps {
    className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {


    const [searchQuery, setSearchQuery] = useState('')
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = useState<Product[]>([])
    const ref = React.useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useEffect(() => {
        Api.products.search(searchQuery).then(items => {
            setProducts(items)
        })
    }, [searchQuery])
    return (

        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

            <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Search for products ..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', focused && 'visible opacity-100 top-12')}>
                    {
                        products.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className='flex w-full items-center gap-3 hover:bg-primary/10 px-2 py-2 mb-2'>
                                <Image src={product.imageUrl} alt={product.name} width={32} height={32} />
                                <span>
                                    {product.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div >
        </>
    );
};