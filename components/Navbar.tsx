import Link from 'next/link';
import { Search, Bell, MessageCircle, User, Plus } from 'lucide-react';

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
        <nav className="sticky top-0 z-50 glass px-4 py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#f6851b] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    G
                </div>
                <span className="font-bold text-xl hidden md:block">GRAIN</span>
            </Link>

            <Link href="/" className="bg-black text-white px-4 py-2 rounded-full font-semibold hidden md:block">
                Home
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-4xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for ideas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#e6ebf1] border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#f6851b] transition-all outline-none"
                />
            </form>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <Bell className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                </button>

                <div className="hidden sm:block">
                    <WalletMultiButton className="!bg-[#f6851b] !rounded-full !h-10 !px-6 !text-sm !font-semibold hover:!bg-[#e2761b] transition-all" />
                </div>

                <Link href="/create" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Create</span>
                </Link>
            </div>
        </nav>
    );
}
