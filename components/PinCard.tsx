'use client';

import Image from 'next/image';
import { Heart, MessageSquare, Download, Lock } from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { createUSDCPaymentTransaction, PLATFORM_WALLET } from '@/lib/solana-pay';
import { unlockPin } from '@/lib/actions';
import { useState } from 'react';

interface Pin {
    id: string;
    image_url: string;
    title: string;
    owner_name: string;
    owner_image?: string;
    price?: number;
    isUnlocked?: boolean;
}

export default function PinCard({ pin }: { pin: Pin }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [unlocking, setUnlocking] = useState(false);
    const [localUnlocked, setLocalUnlocked] = useState(pin.isUnlocked);

    const isLocked = (pin.price ?? 0) > 0 && !localUnlocked;

    const handleUnlock = async () => {
        if (!publicKey) {
            alert('Please connect your wallet first');
            return;
        }

        setUnlocking(true);
        try {
            // In a real app, recipient would be the pin owner
            // For now, we use a platform wallet for testing
            const transaction = await createUSDCPaymentTransaction(
                connection,
                publicKey,
                PLATFORM_WALLET,
                pin.price || 0
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');

            // Save unlock to database
            await unlockPin(publicKey.toBase58(), pin.id);
            setLocalUnlocked(true);
            alert('Content unlocked!');
        } catch (error) {
            console.error('Unlock failed:', error);
            alert('Unlock failed. Please make sure you have enough USDC.');
        } finally {
            setUnlocking(false);
        }
    };

    return (
        <div className="pin-card group relative">
            <div className="relative overflow-hidden rounded-2xl">
                <div className={isLocked ? 'blur-2xl scale-110 grayscale transition-all duration-500' : 'transition-all duration-500'}>
                    <Image
                        src={pin.image_url}
                        alt={pin.title}
                        width={400}
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Lock Overlay */}
                {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 p-4 text-center">
                        <div className="glass p-6 rounded-[32px] shadow-2xl flex flex-col items-center gap-3 max-w-[200px]">
                            <div className="w-12 h-12 bg-[#f6851b] rounded-full flex items-center justify-center text-white">
                                <Lock className="w-6 h-6" />
                            </div>
                            <p className="font-bold text-gray-900 text-sm">Exclusive Content</p>
                            <button
                                onClick={handleUnlock}
                                disabled={unlocking}
                                className="btn-primary w-full py-2.5 text-xs font-bold leading-none disabled:opacity-50"
                            >
                                {unlocking ? 'Unlocking...' : `Unlock for ${pin.price} USDC`}
                            </button>
                        </div>
                    </div>
                )}

                {/* Hover Overlay (for unlocked/free pins) */}
                {!isLocked && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-0">
                        <div className="flex justify-end">
                            <button className="btn-primary py-2 px-4 text-sm font-bold">Save</button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                                    <Heart className="w-4 h-4 text-gray-800" />
                                </button>
                                <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                                    <MessageSquare className="w-4 h-4 text-gray-800" />
                                </button>
                            </div>
                            <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                                <Download className="w-4 h-4 text-gray-800" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-3 px-2">
                <h3 className="font-semibold text-white text-sm truncate">{pin.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    {pin.owner_image ? (
                        <Image src={pin.owner_image} alt={pin.owner_name} width={28} height={28} className="rounded-full border border-white/10" />
                    ) : (
                        <div className="w-7 h-7 bg-gradient-to-br from-[#f6851b]/20 to-[#e2761b]/20 rounded-full border border-white/10" />
                    )}
                    <span className="text-xs text-gray-400 hover:text-[#f6851b] cursor-pointer font-medium transition-colors">{pin.owner_name}</span>
                </div>
            </div>
        </div>
    );
}
