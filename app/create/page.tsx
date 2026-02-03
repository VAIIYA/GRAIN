'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { upload } from '@vercel/blob/client';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { savePin } from '@/lib/actions';
import { ImagePlus, X, Hash, DollarSign, Type, AlignLeft } from 'lucide-react';
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
            });

            const tagList = hashtags.split(' ')
                .filter(t => t.startsWith('#') || t.length > 0)
                .map(t => t.startsWith('#') ? t : `#${t}`)
                .slice(0, 5);

            await savePin({
                owner_id: publicKey.toBase58(),
                image_url: newBlob.url,
                title,
                description,
                price: parseFloat(price),
                hashtags: tagList
            });

            router.push('/');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to create post');
        } finally {
            setUploading(false);
        }
    };

    if (!publicKey) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center pt-32 px-8 text-center">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                        <DollarSign className="w-10 h-10 text-muted" />
                    </div>
                    <h1 className="text-xl font-bold mb-2">Connect Wallet</h1>
                    <p className="text-muted text-sm max-w-xs mx-auto">
                        Please connect your Solana wallet to share your thoughts with the world.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pb-24">
            <Navbar />

            <div className="px-4 py-6">
                <h1 className="text-2xl font-black mb-6">NEW POST</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload Area */}
                    <div className="relative">
                        {file ? (
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-square w-full rounded-2xl border-2 border-dashed border-border bg-secondary hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="p-4 bg-black rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <ImagePlus className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-sm font-bold">Select from device</span>
                                <span className="text-xs text-muted mt-1">High quality images recommended</span>
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
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                <Type className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Write a title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-premium pl-12"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-4 text-muted">
                                <AlignLeft className="w-5 h-5" />
                            </div>
                            <textarea
                                placeholder="Describe your post..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input-premium pl-12 min-h-[120px] py-4"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                <Hash className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="#art #solana #future"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                                className="input-premium pl-12"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="Price in USDC (0 for free)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input-premium pl-12"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted bg-white/5 px-2 py-1 rounded">
                                USDC
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className="w-full btn-premium py-4 text-sm font-bold mt-4 disabled:opacity-50"
                    >
                        {uploading ? 'SHARING...' : 'SHARE POST'}
                    </button>

                    <p className="text-[10px] text-center text-muted px-8">
                        By sharing, you agree to our Terms of Use and confirm you own the rights to this content.
                    </p>
                </form>
            </div>
        </main>
    );
}
