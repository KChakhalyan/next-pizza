import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { Container } from './Container';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';


interface HeaderProps {
    className?: string;
}
export const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Left side | Logo */}
                <div className='flex items-center gap-4'>
                    <Image src="/logo.png" alt="logo" width={35} height={35} />
                    <div>
                        <h1 className='text-2xl uppercase font-black'>NEXT PIZZA</h1>
                        <p className='text-sm text-gray-400 leading-3'>It couldn&apos;t be any tastier.</p>
                    </div>
                </div>
                {/* Right side | Login */}
                <div className='flex items-center gap-3'>
                    <Button variant="outline" className='cursor-pointer flex items-center gap-1'><User size={16} />Log In</Button>
                    <div>
                        <Button className='group relative cursor-pointer'>
                            <b>53 $</b>
                            <span className='h-full w-[1px] bg-white/30 mx-3' />
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                                <b>3</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    )
}