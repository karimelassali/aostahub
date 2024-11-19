import CardSkeleton from "@/components/ui/cardSkeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className=" w-full p-2 gap-6 justify-center items-center bg-skeleton  bg-no-repeat animate-skeleton rounded ">
                <CardSkeleton />
            </div>
  }