import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Skeleton className="mx-auto h-12 w-3/4" />
        <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
        <div className="mt-8 flex justify-center gap-4">
          <Skeleton className="h-11 w-40 rounded-md" />
          <Skeleton className="h-11 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
