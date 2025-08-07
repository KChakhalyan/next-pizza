'use client'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Title } from './Title';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface FiltersProps {
    className?: string;
}

interface PriceRangeProps {
    priceFrom: number
    priceTo: number
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients()
    const [priceRange, setPriceRange] = useState<PriceRangeProps>({ priceFrom: 0, priceTo: 1000 })

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [pizzaType, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));




    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name
    }))

    const updatePrice = (name: keyof PriceRangeProps, value: number) => {
        setPriceRange({
            ...priceRange,
            [name]: value
        })
    }

    useEffect(() => {
        console.log({
            ingredients, priceRange, pizzaType, sizes

        })
    }, [ingredients, priceRange, pizzaType, sizes])
    return (
        <div className={cn('', className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />
            {/* Upper Checkboxes */}
            <CheckboxFiltersGroup
                title='Sizes'
                name='sizes'
                className='mt-5'
                selected={sizes}
                onClickCheckbox={toggleSizes}
                items={[
                    { text: '20', value: '20' },
                    { text: '30', value: '30' },
                    { text: '40', value: '40' }
                ]}
            />
            <CheckboxFiltersGroup
                title='PizzaType'
                name='pizzaType'
                className='mt-5'
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaType}
                items={[
                    { text: 'Thin', value: '1' },
                    { text: 'Traditional', value: '2' }
                ]}
            />


            {/* Filters with RangeSlidr */}
            <div className='mt-5 border-y border-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Price</p>
                <div className='flex gap-3 mb-5'>
                    <Input
                        type='number'
                        placeholder='0'
                        min={0}
                        max={1000}
                        value={String(priceRange.priceFrom)}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type='number' min={100} max={1000} placeholder='1000' value={String(priceRange.priceTo)} onChange={(e) => updatePrice('priceTo', Number(e.target.value))} />
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[
                    priceRange.priceFrom, priceRange.priceTo
                ]} onValueChange={([priceFrom, priceTo]) => setPriceRange({ priceFrom, priceTo })} />
            </div>
            {/* Checkbox Filters Group */}

            <CheckboxFiltersGroup
                title='Ingredients'
                name='ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />

        </div>
    );
};