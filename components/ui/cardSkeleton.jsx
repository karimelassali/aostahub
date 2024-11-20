export default function CardSkeleton() {
    return (
      <div class="flex w-full lg:max-w-[80%] items-center  min-h-screen animate-pulse justify-center p-4">   
      <div class="w-full  h-full rounded-xl overflow-hidden flex flex-col">
          <div class="relative border border-gray-800 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-56">
            <div class="w-full h-full bg-gray-200 "></div>
            <div class="imgProfile absolute inset-0 bg-black bg-opacity-50" />
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200"></div>
          </div>
          <div class="flex-grow flex flex-col justify-between p-4 sm:p-6 pt-12 sm:pt-16">
            <div>
              <div class="text-xl flex justify-center items-center gap-x-1 sm:text-2xl font-bold text-center mb-2">
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div class="navigate flex w-full justify-between max-h-[100px] overflow-hidden items-center gap-x-2">
                <button id='next' class='p-2 rounded-full bg-secondary hover:scale-150 text-white'>
                  <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
                </button>
                <button id='prev' class='p-2 rounded-full bg-secondary hover:scale-150 text-white'>
                  <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
                </button>
              </div>
              <p class="location text-gray-600 text-center mb-2 sm:mb-4">
                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              </p>
              <p class="desc text-gray-800 text-center text-sm sm:text-base mb-4 sm:mb-6">
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </p>
            </div>
            <div class="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              <div class="social flex justify-center space-x-4 mt-4">
                <div class="hover:scale-110 text-muted-foreground hover:text-primary">
                  <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
                </div>
                <div class="hover:scale-110 text-muted-foreground hover:text-primary">
                  <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
                </div>
                <div class="hover:scale-110 text-muted-foreground hover:text-primary">
                  <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 bg-secondary flex justify-around">
              <button class="dislike w-12 h-12 rounded-full bg-gray-200 shadow-md flex items-center justify-center"></button>
              <button>
                <div class="text-accent h-5 w-5 bg-gray-200 rounded-full"></div>
              </button>
              <button>
                <div class="text-accent h-5 w-5 bg-gray-200 rounded-full"></div>
              </button>
          </div>
      </div>
  </div>
    );
  }
  