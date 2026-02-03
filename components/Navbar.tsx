"use client";

import Link from 'next/link';
import { Search, Bell, MessageCircle, MoreVertical } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="glass-header px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tighter text-white">COMMON PEOPLE</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="btn-ghost md:hidden">
                    <Search className="w-6 h-6" />
                </button>
                <button className="btn-ghost hidden md:block">
                    <Bell className="w-6 h-6" />
                </button>
                <div className="scale-75 md:scale-90 origin-right">
                    <WalletMultiButton className="!bg-white !text-black !rounded-full !h-10 !px-4 !text-xs !font-bold !border-0 hover:!opacity-90" />
                </div>
                <button className="btn-ghost">
                    <MoreVertical className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
