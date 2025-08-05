'use client'
import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './Title';
import { FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface FiltersProps {
    className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()

    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name
    }))
    return (
        <div className={cn('', className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />
            {/* Upper Checkboxes */}
            <div className='flex flex-col gap-4'>
                <FilterCheckbox text="Can Takeaway" value="1" />
                <FilterCheckbox text="New" value="2" />
            </div>
            {/* Filters with RangeSlidr */}
            <div className='mt-5 border-y border-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Price</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
                    <Input type='number' min={100} max={1000} placeholder='1000' />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
            {/* Checkbox Filters Group */}

            <CheckboxFiltersGroup
                title='Ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                slectedIds={selectedIds}
            />

        </div>
    );
};