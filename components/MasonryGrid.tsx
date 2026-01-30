'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PinCard from './PinCard';
import { getPins } from '@/lib/actions';
import { useWallet } from '@solana/wallet-adapter-react';

export default function MasonryGrid({ initialPins, searchQuery }: { initialPins: any[], searchQuery?: string }) {
    const { publicKey } = useWallet();
    const [pins, setPins] = useState(initialPins);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialPins.length >= 20);
    const { ref, inView } = useInView();

    useEffect(() => {
        setPins(initialPins);
        setPage(1);
        setHasMore(initialPins.length >= 20);
    }, [initialPins]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            loadMore();
        }
    }, [inView]);

    const loadMore = async () => {
        setLoading(true);
        try {
            const nextPins = await getPins({
                search: searchQuery,
                offset: page * 20,
                limit: 20,
                walletAddress: publicKey?.toBase58()
            });

            if (nextPins.length < 20) {
                setHasMore(false);
            }

            setPins(prev => [...prev, ...nextPins]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Failed to load more pins:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[2000px] mx-auto px-4 py-8">
            {pins.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-xl font-medium text-gray-400">No pins found</p>
                    {searchQuery && <p className="text-gray-500 mt-2">Try adjusting your search terms</p>}
                </div>
            ) : (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
                    {pins.map((pin: any) => (
                        <PinCard key={pin.id} pin={pin} />
                    ))}
                </div>
            )}

            {(hasMore || loading) && (
                <div ref={ref} className="flex justify-center p-8">
                    {loading && (
                        <div className="w-8 h-8 border-4 border-[#f6851b] border-t-transparent rounded-full animate-spin" />
                    )}
                </div>
            )}
        </div>
    );
}
