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
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* MetaMask-style Hero Section */}
      {!search && (
        <section className="relative pt-20 pb-16 px-4 overflow-hidden">
          {/* Gradient backgrounds */}
          <div className="absolute inset-0 gradient-bg opacity-50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f6851b] rounded-full blur-[128px] opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#037dd6] rounded-full blur-[128px] opacity-10" />
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="section-title mb-6">
              The <span className="gradient-text">Everything</span> Canvas
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover, create, and share visual ideas on the decentralized Pinterest. 
              Own your content. Connect with creators.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create" className="btn-primary inline-flex items-center gap-2">
                Create Pin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
              <button className="btn-secondary">
                Explore
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Search Results Header */}
      {search && (
        <div className="max-w-[2000px] mx-auto pt-8 pb-4 px-4">
          <h2 className="text-2xl font-medium text-gray-300">
            Results for <span className="text-[#f6851b] font-bold">"{search}"</span>
          </h2>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-[2000px] mx-auto px-4 pt-4">
          <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1 text-red-400/70">Make sure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are set in your environment variables.</p>
          </div>
        </div>
      )}

      {/* Masonry Grid */}
      <section className="px-4 pb-16">
        <MasonryGrid initialPins={initialPins} searchQuery={search} />
      </section>
    </main>
  );
}
