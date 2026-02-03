"use client";

import Link from 'next/link';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Search, label: 'Explore', href: '/?search=' },
        { icon: PlusSquare, label: 'Create', href: '/create' },
        { icon: Heart, label: 'Activity', href: '#' },
        { icon: User, label: 'Profile', href: '#' },
    ];

    return (
        <nav className="glass-nav flex items-center justify-around py-2 px-2">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? 'text-white' : 'text-muted hover:text-white'
                            }`}
                    >
                        <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
