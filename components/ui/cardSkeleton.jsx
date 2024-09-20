export default function CardSkeleton() {
    return (
      <div className="flex flex-col space-y-3 animate-pulse rounded ">
        <div className="h-[200px] w-[250px]  rounded  bg-gray-300"></div>
        <div className="space-y-2">
          <div className="h-4 w-[250px] bg-gray-300 rounded "></div>
          <div className="h-4 w-[200px] bg-gray-300 rounded "></div>
        </div>
      </div>
    );
  }
  