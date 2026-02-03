'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { upload } from '@vercel/blob/client';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { ImagePlus, X, Hash, DollarSign, Type, AlignLeft, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function CreatePin() {
    const { publicKey } = useWallet();
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('0');
    const [hashtags, setHashtags] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !publicKey) return;

        setUploading(true);
        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                addRandomSuffix: true,
            });

            const tagList = hashtags.split(' ')
                .filter(t => t.startsWith('#') || t.length > 0)
                .map(t => t.startsWith('#') ? t : `#${t}`)
                .slice(0, 5);

            const response = await fetch('/api/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    owner_id: publicKey.toBase58(),
                    image_url: newBlob.url,
                    title,
                    description,
                    price: parseFloat(price),
                    hashtags: tagList,
                }),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => ({}));
                const message = payload?.error || 'Failed to save post.';
                throw new Error(message);
            }

            router.push('/');
        } catch (error) {
            console.error('Upload failed:', error);
            alert(error instanceof Error ? error.message : 'Failed to create post');
        } finally {
            setUploading(false);
        }
    };

    if (!publicKey) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center pt-32 px-10 text-center">
                    <div className="w-24 h-24 bg-[#FF6A3D]/10 rounded-full flex items-center justify-center mb-8">
                        <Sparkles className="w-12 h-12 text-[#FF6A3D]" />
                    </div>
                    <h1 className="text-2xl font-serif text-[#213453] mb-3">Join the movement</h1>
                    <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto mb-8">
                        Connect your Solana wallet to start sharing and earning on the decentralized canvas.
                    </p>
                    <div className="scale-110">
                        {/* The Wallet Button is in the Navbar, but we can guide them */}
                        <p className="text-xs font-bold text-[#FF6A3D] uppercase tracking-widest">Connect at the top right</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pb-32 bg-transparent">
            <Navbar />

            <div className="px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif text-[#213453] mb-2">Create Post</h1>
                    <p className="text-sm text-muted">Share your vision with the Common People community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 pb-6">
                    {/* Image Upload Area */}
                    <div className="relative">
                        {file ? (
                            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-[#FFF7F1] shadow-xl border border-[#EADDD2]">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-[#213453] hover:text-[#FF6A3D] transition-all shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-square w-full rounded-[32px] border-2 border-dashed border-[#EADDD2] bg-[#FFF7F1] hover:bg-white hover:border-[#FF6A3D]/30 transition-all cursor-pointer group shadow-inner">
                                <div className="p-5 bg-white rounded-full mb-5 group-hover:scale-110 transition-transform shadow-md border border-[#EADDD2]">
                                    <ImagePlus className="w-8 h-8 text-[#FF6A3D]" />
                                </div>
                                <span className="text-sm font-bold text-[#213453]">Select media from device</span>
                                <span className="text-xs text-muted mt-2">JPG, PNG or WEBP (Standard 1:1)</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    accept="image/*"
                                />
                            </label>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213453]/30">
                                <Type className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Give it a title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-premium pl-12 font-serif placeholder:font-sans italic text-lg"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-4 text-[#213453]/30">
                                <AlignLeft className="w-5 h-5" />
                            </div>
                            <textarea
                                placeholder="Describe the story behind this..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input-premium pl-12 min-h-[140px] py-4 leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213453]/30">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Hashtags"
                                    value={hashtags}
                                    onChange={(e) => setHashtags(e.target.value)}
                                    className="input-premium pl-12 text-sm"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213453]/30">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="input-premium pl-12 text-sm"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#FF6A3D] bg-[#FF6A3D]/5 px-2 py-1 rounded-full uppercase tracking-tighter">
                                    USDC
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className="w-full btn-premium py-5 text-sm font-bold uppercase tracking-widest mt-4 shadow-xl shadow-[#FF6A3D]/20 disabled:opacity-30 active:scale-95"
                    >
                        {uploading ? 'Publishing to Chain...' : 'Publish Now'}
                    </button>

                    <p className="text-[10px] text-center text-muted px-10 leading-relaxed uppercase tracking-tighter font-bold">
                        By sharing, you agree to our <span className="text-[#FF6A3D]">Decentralized Terms of Use</span>.
                    </p>
                </form>
            </div>
        </main>
    );
}
