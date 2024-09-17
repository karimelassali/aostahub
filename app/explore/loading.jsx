import CardSkeleton from "@/components/ui/cardSkeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="grid p-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                <CardSkeleton key={index} />
                ))}
            </div>
  }