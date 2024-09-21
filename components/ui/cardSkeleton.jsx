export default function CardSkeleton() {
    return (
      <div className="flex flex-col w-full p-2 space-y-3 animate-pulse rounded ">
        <div className="h-[200px] w-[250px] max-sm:w-full max-[280px]:w-full  rounded  bg-gray-300"></div>
        <div className="space-y-2">
          <div className="h-4 w-[250px]  max-[280px]:w-[50%] bg-gray-300 rounded "></div>
          <div className="h-4 w-[200px] max-[280px]:w-[50%] bg-gray-300 rounded "></div>
        </div>
      </div>
    );
  }
  