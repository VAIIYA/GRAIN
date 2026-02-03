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
        <nav className="glass-nav flex items-center justify-around py-3 px-4">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'text-[#FF6A3D]' : 'text-[#213453]/40 hover:text-[#213453]'
                            }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-[#FF6A3D]/10' : ''}`}>
                            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                        </div>
                        <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
