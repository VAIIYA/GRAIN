'use client';

import Image from 'next/image';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Lock, CheckCircle2 } from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createUSDCPaymentTransaction, PLATFORM_WALLET } from '@/lib/solana-pay';
import { unlockPin } from '@/lib/actions';
import { useState } from 'react';

interface Pin {
    id: string;
    image_url: string;
    title: string;
    description?: string;
    owner_name: string;
    owner_image?: string;
    owner_id: string;
    price?: number;
    isUnlocked?: boolean;
    created_at?: string;
}

export default function PinCard({ pin }: { pin: Pin }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [unlocking, setUnlocking] = useState(false);
    const [localUnlocked, setLocalUnlocked] = useState(pin.isUnlocked);
    const [liked, setLiked] = useState(false);

    const isLocked = (pin.price ?? 0) > 0 && !localUnlocked;

    const handleUnlock = async () => {
        if (!publicKey) {
            alert('Please connect your wallet first');
            return;
        }

        setUnlocking(true);
        try {
            const transaction = await createUSDCPaymentTransaction(
                connection,
                publicKey,
                PLATFORM_WALLET,
                pin.price || 0
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');

            await unlockPin(publicKey.toBase58(), pin.id);
            setLocalUnlocked(true);
        } catch (error) {
            console.error('Unlock failed:', error);
            alert('Unlock failed. Please make sure you have enough USDC.');
        } finally {
            setUnlocking(false);
        }
    };

    return (
        <article className="post-card animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] to-[#bc1888] rounded-full p-[1.5px]">
                            <div className="bg-black rounded-full h-full w-full flex items-center justify-center overflow-hidden border-[1.5px] border-black">
                                {pin.owner_image ? (
                                    <Image src={pin.owner_image} alt={pin.owner_name} width={36} height={36} className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted">
                                        {pin.owner_name?.slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-white hover:underline cursor-pointer">{pin.owner_name || 'Anonymous'}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                        </div>
                        <p className="text-[10px] text-muted">Solana Chain • 2h ago</p>
                    </div>
                </div>
                <button className="btn-ghost p-1">
                    <MoreHorizontal className="w-5 h-5 text-muted" />
                </button>
            </div>

            {/* Content (Image) */}
            <div className="post-image-container group">
                <div className={isLocked ? 'blur-2xl scale-110 grayscale transition-all duration-700' : 'transition-all duration-700'}>
                    <Image
                        src={pin.image_url}
                        alt={pin.title}
                        width={500}
                        height={500}
                        className="post-image"
                        priority={false}
                    />
                </div>

                {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                        <div className="glass p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 max-w-[240px] border border-white/10">
                            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                                <Lock className="w-7 h-7" />
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-bold text-white">Exclusive Post</h4>
                                <p className="text-xs text-muted mt-1 px-2">Support the creator to unlock this content</p>
                            </div>
                            <button
                                onClick={handleUnlock}
                                disabled={unlocking}
                                className="w-full btn-premium leading-none text-sm py-3 disabled:opacity-50"
                            >
                                {unlocking ? 'Verifying...' : `Unlock for ${pin.price} USDC`}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setLiked(!liked)} className={`${liked ? 'text-red-500' : 'text-white'} transition-colors`}>
                            <Heart className={`w-7 h-7 ${liked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="text-white hover:text-muted">
                            <MessageCircle className="w-7 h-7" />
                        </button>
                        <button className="text-white hover:text-muted">
                            <Send className="w-7 h-7" />
                        </button>
                    </div>
                    <button className="text-white hover:text-muted">
                        <Bookmark className="w-7 h-7" />
                    </button>
                </div>

                {/* Likes/Status */}
                <p className="text-sm font-bold text-white mb-2">1,240 likes</p>

                {/* Caption */}
                <div className="space-y-1">
                    <p className="text-sm leading-relaxed">
                        <span className="font-bold mr-2">{pin.owner_name || 'Anonymous'}</span>
                        {pin.title}
                    </p>
                    {pin.description && (
                        <p className="text-sm text-muted line-clamp-2">{pin.description}</p>
                    )}
                </div>

                {/* Date */}
                <p className="text-[10px] text-muted uppercase mt-3 tracking-wider font-medium">February 3</p>
            </div>
        </article>
    );
}
