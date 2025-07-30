'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui';

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
    title?: string;
    items: Item[];
    defaultItems?: Item[]
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;

}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    onChange,
    defaultValue,
    className,
}) => {
    const [showAll, setshowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const itemsList = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : items.slice(0, limit);

    const onChangeSerchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

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
                        checked={false}
                        onCheckedChange={(ids) => console.log(ids)}
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