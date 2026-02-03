"use client";

import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    return (
        <header className="glass-header px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-serif text-[#3D065F] tracking-tight">VAIIYA</span>
            </Link>

            <div className="flex items-center gap-3">
                <button className="btn-ghost md:hidden">
                    <Search className="w-5 h-5" />
                </button>
                <div className="scale-90 origin-right">
                    <WalletMultiButton className="!bg-[#FF5C16] !text-white !rounded-full !h-11 !px-6 !text-sm !font-bold !border-0 hover:!opacity-90 transition-all !shadow-lg !shadow-[#FF5C16]/20" />
                </div>
                <button className="btn-ghost">
                    <Menu className="w-5 h-5 text-[#3D065F]" />
                </button>
            </div>
        </header>
    );
}
