// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen container mx-auto flex flex-col gap-4 px-2 py-12 sm:py-24">
      {/* Header Skeleton */}
      <div className="flex gap-4 mb-8 justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" /> {/* Title */}
          <Skeleton className="h-4 w-64" /> {/* Subtitle */}
        </div>
        <Skeleton className="h-10 w-32 rounded-md" /> {/* Button */}
      </div>

      {/* Optional alert for limit reached */}
      <Skeleton className="h-16 w-full rounded-lg" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton
              className="h-64 w-full rounded-xl  "
            /></div>
        ))}
      </div>
    </main>
  );
}
