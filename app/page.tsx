import Navbar from "@/components/Navbar";
import MasonryGrid from "@/components/MasonryGrid";
import { getPins } from "@/lib/actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  // Initial fetch for server-side load
  const initialPins = await getPins({
    search,
    limit: 20,
    offset: 0
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-[2000px] mx-auto pt-4 text-center">
        {search && (
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            Results for <span className="text-black font-bold">"{search}"</span>
          </h2>
        )}
      </div>
      <MasonryGrid initialPins={initialPins} searchQuery={search} />
    </main>
  );
}
