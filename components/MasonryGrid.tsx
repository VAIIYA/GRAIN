import PinCard from './PinCard';

export default function MasonryGrid({ pins }: { pins: any[] }) {
    return (
        <div className="max-w-[2000px] mx-auto px-4 py-8">
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
                {pins.map((pin) => (
                    <PinCard key={pin.id} pin={pin} />
                ))}
            </div>
        </div>
    );
}
