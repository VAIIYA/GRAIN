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
    <main className="min-h-screen">
      <Navbar />

      {/* Search Bar for Mobile (Subtle) */}
      {search && (
        <div className="px-4 py-4 border-bottom border-secondary">
          <h2 className="text-sm font-bold text-muted uppercase tracking-wider italic">
            Searching for "{search}"
          </h2>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="px-4 pt-4">
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl">
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Feed Section */}
      <section className="pb-24">
        {initialPins.length > 0 ? (
          <MasonryGrid initialPins={initialPins} searchQuery={search} />
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 px-8 text-center text-muted">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <p className="font-medium">No posts found.</p>
            <p className="text-sm mt-1">Be the first to share something with the world.</p>
          </div>
        )}
      </section>
    </main>
  );
}
