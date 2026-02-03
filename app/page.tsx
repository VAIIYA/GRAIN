import Navbar from "@/components/Navbar";
import MasonryGrid from "@/components/MasonryGrid";
import { getPins } from "@/lib/actions";

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
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Search Bar for Mobile (Subtle) */}
      {search && (
        <div className="px-6 py-6 bg-[#F7F9FC] border-b border-[#E9EDF6]">
          <p className="text-[10px] font-bold text-[#FF5C16] uppercase tracking-[0.2em] mb-1">Search Spectrum</p>
          <h2 className="text-2xl font-serif text-[#3D065F] italic leading-none">
            Exploring "{search}"
          </h2>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="px-6 pt-6">
          <div className="bg-[#FF5C16]/5 border border-[#FF5C16]/20 text-[#FF5C16] px-5 py-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5C16] rounded-full flex items-center justify-center shrink-0">
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
      <section className="pb-24">
        {initialPins.length > 0 ? (
          <MasonryGrid initialPins={initialPins} searchQuery={search} />
        ) : (
          <div className="flex flex-col items-center justify-center pt-32 px-12 text-center">
            <div className="w-20 h-20 bg-[#F7F9FC] rounded-[32px] flex items-center justify-center mb-8 border border-[#E9EDF6] shadow-inner">
              <span className="text-3xl grayscale opacity-50">🖼️</span>
            </div>
            <h3 className="text-xl font-serif text-[#3D065F] mb-3 italic">The canvas is currently blank</h3>
            <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
              Be the pioneer who shares the first vision with the Common People community.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
