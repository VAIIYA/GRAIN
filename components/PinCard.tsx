import Image from 'next/image';
import { Heart, MessageSquare, Download } from 'lucide-react';

interface Pin {
    id: string;
    image_url: string;
    title: string;
    owner_name: string;
    owner_image?: string;
}

export default function PinCard({ pin }: { pin: Pin }) {
    return (
        <div className="pin-card group relative">
            <div className="relative overflow-hidden rounded-2xl">
                <Image
                    src={pin.image_url}
                    alt={pin.title}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                        <button className="btn-primary py-2 px-4 text-sm">Save</button>
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
            </div>

            <div className="mt-2 px-1">
                <h3 className="font-semibold text-sm truncate">{pin.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    {pin.owner_image ? (
                        <Image src={pin.owner_image} alt={pin.owner_name} width={24} height={24} className="rounded-full" />
                    ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    )}
                    <span className="text-xs text-gray-600 hover:underline cursor-pointer">{pin.owner_name}</span>
                </div>
            </div>
        </div>
    );
}
