'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { upload } from '@vercel/blob/client';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { savePin } from '@/lib/actions';

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
                .filter(t => t.startsWith('#'))
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
            alert('failed to create pin');
        } finally {
            setUploading(false);
        }
    };

    if (!publicKey) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                    <h1 className="text-2xl font-bold">Please connect your wallet to create a Pin</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="glass p-8 rounded-[32px] flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div className="aspect-[2/3] bg-gray-100 rounded-[24px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden relative">
                            {file ? (
                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-[20px]" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Click to upload</p>
                                </>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Title</label>
                            <input
                                type="text"
                                placeholder="Add a title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-3xl font-bold border-b-2 border-gray-200 focus:border-[#f6851b] outline-none py-2 transition-colors bg-transparent"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Description</label>
                            <textarea
                                placeholder="Tell everyone what your Pin is about"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-lg border-b-2 border-gray-200 focus:border-[#f6851b] outline-none py-2 transition-colors bg-transparent resize-none h-24"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Hashtags (Max 5, space separated, start with #)</label>
                            <input
                                type="text"
                                placeholder="#art #design #future"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                                className="text-lg border-b-2 border-gray-200 focus:border-[#f6851b] outline-none py-2 transition-colors bg-transparent"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Price (USDC)</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="text-xl font-semibold border-b-2 border-gray-200 focus:border-[#f6851b] outline-none py-2 transition-colors bg-transparent w-32"
                                />
                                <span className="text-gray-500 font-bold">USDC</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Set to 0.00 for public/free posts.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || !file}
                            className="btn-primary w-full py-4 text-lg mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? 'Uploading...' : 'Create Pin'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
