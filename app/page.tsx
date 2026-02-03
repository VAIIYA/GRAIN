import Navbar from "@/components/Navbar";
import MasonryGrid from "@/components/MasonryGrid";
import { getPins } from "@/lib/actions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  let initialPins: any[] = [];
  let error: string | null = null;

  try {
    initialPins = await getPins({
      search,
      limit: 20,
      offset: 0
    });
  } catch (e) {
    console.error('Failed to load pins:', e);
    error = 'Failed to load pins. Please check your database connection.';
  }

  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />

      {/* Search Bar for Mobile (Subtle) */}
      {search && (
        <div className="px-6 py-6 hero-strip">
          <p className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-[0.24em] mb-1">Search Spectrum</p>
          <h2 className="text-2xl font-serif text-[#213453] italic leading-none">
            Exploring "{search}"
          </h2>
        </div>
      )}

      {!search && (
        <div className="px-6 py-10 hero-strip">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full badge-glow text-[10px] uppercase tracking-[0.28em] font-semibold">
              Curated daily
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#213453] leading-tight">
                A visual commons for the people
              </h1>
              <p className="text-sm text-muted mt-3 max-w-md">
                Discover local moments, creator highlights, and community-funded stories — all backed by Solana.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="#feed" className="btn-premium text-sm">Explore the feed</Link>
              <Link href="/create" className="btn-secondary text-sm">Upload a moment</Link>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="px-6 pt-6">
          <div className="bg-[#FF6A3D]/5 border border-[#FF6A3D]/20 text-[#FF6A3D] px-5 py-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6A3D] rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-bold">!</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider leading-none mb-1">Action Required</p>
              <p className="text-xs opacity-80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Feed Section */}
      <section id="feed" className="pb-24 pt-4">
        {initialPins.length > 0 ? (
          <MasonryGrid initialPins={initialPins} searchQuery={search} />
        ) : (
          <div className="flex flex-col items-center justify-center pt-32 px-12 text-center">
            <div className="w-20 h-20 bg-[#FFF7F1] rounded-[32px] flex items-center justify-center mb-8 border border-[#EADDD2] shadow-inner">
              <span className="text-3xl grayscale opacity-50">🖼️</span>
            </div>
            <h3 className="text-xl font-serif text-[#213453] mb-3 italic">The canvas is currently blank</h3>
            <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
              Be the pioneer who shares the first vision with the Common People community.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
