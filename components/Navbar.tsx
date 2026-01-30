"use client";

import Link from 'next/link';
import { Search, Bell, MessageCircle, Plus } from 'lucide-react';
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
        <nav className="sticky top-0 z-50 nav-glass px-4 lg:px-8 py-4">
            <div className="max-w-[2000px] mx-auto flex items-center gap-6">
                {/* Logo - MetaMask style */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#f6851b] to-[#e2761b] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#f6851b]/20 logo-glow">
                        G
                    </div>
                    <span className="font-bold text-xl hidden md:block text-white">GRAIN</span>
                </Link>

                {/* Search - MetaMask style */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for ideas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-metamask py-3 pl-12 pr-4"
                    />
                </form>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="p-3 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all duration-300">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button className="p-3 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all duration-300">
                        <MessageCircle className="w-5 h-5" />
                    </button>

                    <div className="hidden sm:block">
                        <WalletMultiButton 
                            className="!bg-gradient-to-r !from-[#f6851b] !to-[#e2761b] !rounded-full !h-11 !px-6 !text-sm !font-semibold !border-0 !shadow-lg !shadow-[#f6851b]/20 hover:!shadow-[#f6851b]/40 transition-all duration-300" 
                        />
                    </div>

                    <Link 
                        href="/create" 
                        className="btn-primary flex items-center gap-2 h-11"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Create</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
