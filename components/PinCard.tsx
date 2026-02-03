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
        <article className="post-card animate-fade-in bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5C16] to-[#3D065F] rounded-full p-[2px]">
                            <div className="bg-white rounded-full h-full w-full flex items-center justify-center overflow-hidden border-[2px] border-white">
                                {pin.owner_image ? (
                                    <Image src={pin.owner_image} alt={pin.owner_name} width={40} height={40} className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center text-[10px] font-bold text-[#3D065F]">
                                        {pin.owner_name?.slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF5C16] cursor-pointer transition-colors">{pin.owner_name || 'Anonymous'}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5C16] fill-[#FF5C16]/10" />
                        </div>
                        <p className="text-[10px] text-muted font-medium uppercase tracking-wider">Solana Network</p>
                    </div>
                </div>
                <button className="btn-ghost p-1.5 hover:bg-[#F7F9FC]">
                    <MoreHorizontal className="w-5 h-5 text-[#3D065F]/40" />
                </button>
            </div>

            {/* Content (Image) */}
            <div className="post-image-container group border-y border-[#F7F9FC]">
                <div className={isLocked ? 'blur-3xl scale-110 grayscale transition-all duration-1000' : 'transition-all duration-700'}>
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-white/10 backdrop-blur-sm">
                        <div className="bg-white/90 backdrop-blur-md p-8 rounded-[32px] shadow-2xl flex flex-col items-center gap-4 max-w-[260px] border border-white">
                            <div className="w-16 h-16 bg-[#FF5C16]/10 rounded-full flex items-center justify-center text-[#FF5C16]">
                                <Lock className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-serif text-[#3D065F]">Exclusive Post</h4>
                                <p className="text-xs text-muted mt-1 leading-relaxed">Join the community to unlock this unique creator content.</p>
                            </div>
                            <button
                                onClick={handleUnlock}
                                disabled={unlocking}
                                className="w-full btn-premium py-4 text-sm font-bold"
                            >
                                {unlocking ? 'Verifying...' : `Unlock for ${pin.price} USDC`}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-5">
                        <button onClick={() => setLiked(!liked)} className={`${liked ? 'text-[#FF5C16]' : 'text-[#3D065F]'} transition-all hover:scale-110 active:scale-95`}>
                            <Heart className={`w-7 h-7 ${liked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="text-[#3D065F] hover:text-[#FF5C16] transition-all hover:scale-110">
                            <MessageCircle className="w-7 h-7" />
                        </button>
                        <button className="text-[#3D065F] hover:text-[#FF5C16] transition-all hover:scale-110">
                            <Send className="w-7 h-7" />
                        </button>
                    </div>
                    <button className="text-[#3D065F] hover:text-[#FF5C16] transition-all hover:scale-110">
                        <Bookmark className="w-7 h-7" />
                    </button>
                </div>

                {/* Likes/Status */}
                <p className="text-sm font-bold text-[#0A0A0A] mb-2.5">1,240 people like this</p>

                {/* Caption */}
                <div className="space-y-1.5">
                    <h3 className="text-sm font-serif text-[#3D065F] italic mb-1">{pin.title}</h3>
                    <p className="text-sm leading-relaxed text-[#0A0A0A]">
                        <span className="font-bold mr-2 text-[#3D065F]">{pin.owner_name || 'Anonymous'}</span>
                        {pin.description || "The future belongs to those who believe in the beauty of their dreams."}
                    </p>
                </div>

                {/* Date */}
                <p className="text-[10px] text-muted uppercase mt-4 tracking-widest font-bold">February 3, 2026</p>
            </div>
        </article>
    );
}
