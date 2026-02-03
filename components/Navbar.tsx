"use client";

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    return (
        <header className="glass-header px-6 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#213453] text-white flex items-center justify-center text-sm font-semibold tracking-[0.2em]">
                    CP
                </div>
                <div className="leading-tight">
                    <span className="text-lg font-serif text-[#213453] tracking-tight">Common People</span>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted font-semibold">Visual commons</p>
                </div>
            </Link>

            <form
                className="hidden md:flex items-center gap-2 flex-1 max-w-md"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (searchQuery.trim()) {
                        router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
                    } else {
                        router.push('/');
                    }
                }}
            >
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#213453]/40" />
                    <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search creators, themes, or cities"
                        className="input-premium w-full pl-11 text-sm"
                    />
                </div>
            </form>

            <div className="flex items-center gap-3">
                <button className="btn-ghost md:hidden">
                    <Search className="w-5 h-5" />
                </button>
                <div className="scale-90 origin-right">
                    <WalletMultiButton className="!bg-[#FF6A3D] !text-white !rounded-full !h-11 !px-6 !text-sm !font-bold !border-0 hover:!opacity-90 transition-all !shadow-lg !shadow-[#FF6A3D]/30" />
                </div>
                <button className="btn-ghost">
                    <Menu className="w-5 h-5 text-[#213453]" />
                </button>
            </div>
        </header>
    );
}
