import Navbar from "@/components/Navbar";
import MasonryGrid from "@/components/MasonryGrid";

// Temporary mock data until DB is populated
const mockPins = [
  {
    id: '1',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Majestic Mountains',
    owner_name: 'Visual Explorer',
  },
  {
    id: '2',
    image_url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    title: 'Serene Lake Reflection',
    owner_name: 'Nature Daily',
  },
  {
    id: '3',
    image_url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
    title: 'Foggy Forest path',
    owner_name: 'Wild Wanderer',
  },
  {
    id: '4',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    title: 'Sunlight through Trees',
    owner_name: 'Forest Lover',
  },
  {
    id: '5',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    title: 'Modern Minimalist Office',
    owner_name: 'Design Trends',
  },
  {
    id: '6',
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
    title: 'Cozy Interior Design',
    owner_name: 'Home Haven',
  },
  {
    id: '7',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    title: 'Collaboration Space',
    owner_name: 'Startup Life',
  },
  {
    id: '8',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    title: 'Coastal Sunset',
    owner_name: 'Sea & Sky',
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <MasonryGrid pins={mockPins} />
    </main>
  );
}
