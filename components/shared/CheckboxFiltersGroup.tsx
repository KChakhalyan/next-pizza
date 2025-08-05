'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
    title?: string;
    items: Item[];
    defaultItems?: Item[]
    limit?: number;
    loading?: Boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    slectedIds?: Set<string>;
    name?: string

}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
    title,
    items,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    loading,
    className,
    onClickCheckbox,
    slectedIds,
    name
}) => {
    const [showAll, setshowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');



    const itemsList = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : items.slice(0, limit);

    const onChangeSerchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {...Array(limit).fill(0).map((_, index) => (<Skeleton key={index} className='h-6 mb-4 rounded-sm' />))}
            <Skeleton className='w-28 h-6 mb-4 rounded-sm' />
        </div>
    }

    return (
        <div className={cn('', className)}>
            <p className='font-bold mb-3'>{title}</p>

            {
                showAll && (
                    <div className='mb-5'>
                        <Input
                            onChange={onChangeSerchInput}
                            placeholder={searchInputPlaceholder}
                            className='bg-gray-50 border-none' />
                    </div>
                )
            }

            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {itemsList.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={slectedIds?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setshowAll(!showAll)} className="text-primary mt-3 cursor-pointer">
                        {showAll ? 'Show Less' : '+ Show All'}
                    </button>
                </div>
            )}

        </div>
    );
};