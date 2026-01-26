import Link from 'next/link';
import { Search, Bell, MessageCircle, User, Plus } from 'lucide-react';

export default function Navbar() {
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

            <div className="flex-1 max-w-4xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for ideas..."
                    className="w-full bg-[#e6ebf1] border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#f6851b] transition-all outline-none"
                />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <Bell className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                </button>
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <User className="w-6 h-6" />
                </Link>
                <Link href="/create" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Create</span>
                </Link>
            </div>
        </nav>
    );
}
