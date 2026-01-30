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
    // Initial fetch for server-side load
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
      <div className="max-w-[2000px] mx-auto pt-4 text-center">
        {search && (
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            Results for <span className="text-black font-bold">"{search}"</span>
          </h2>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Make sure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are set in your environment variables.</p>
          </div>
        )}
      </div>
      <MasonryGrid initialPins={initialPins} searchQuery={search} />
    </main>
  );
}
