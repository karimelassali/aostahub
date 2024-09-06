import React from 'react'

function ProfileSkeleton() {
  return (
    <div class="container mx-auto p-4">
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
            {/* <!-- Profile Section --> */}
            <div class="md:w-1/3 flex flex-col items-center">
                <div class="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                <div class="h-6 bg-gray-300 w-24 mb-2"></div>
                <div class="h-4 bg-gray-300 w-16 mb-1"></div>
                <div class="h-4 bg-gray-300 w-16"></div>
            </div>
            {/* <!-- About Section --> */}
            <div class="md:w-2/3 mt-6 md:mt-0 md:ml-6">
                <div class="h-6 bg-gray-300 w-32 mb-2"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full mb-1"></div>
                <div class="h-4 bg-gray-300 w-full"></div>
                {/* <!-- Social Media Links --> */}
                <div class="mt-4">
                    <div class="h-6 bg-gray-300 w-32 mb-2"></div>
                    <div class="flex space-x-4">
                        <div class="h-4 bg-gray-300 w-16"></div>
                        <div class="h-4 bg-gray-300 w-16"></div>
                        <div class="h-4 bg-gray-300 w-16"></div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Similar Users Section --> */}
        <div class="bg-white shadow-md rounded-lg p-6 mt-6">
            <div class="h-6 bg-gray-300 w-32 mb-4"></div>
            <ul>
                <li class="mb-2">
                    <div class="h-4 bg-gray-300 w-24 mb-1"></div>
                    <div class="h-4 bg-gray-300 w-16"></div>
                </li>
                <li class="mb-2">
                    <div class="h-4 bg-gray-300 w-24 mb-1"></div>
                    <div class="h-4 bg-gray-300 w-16"></div>
                </li>
                <li>
                    <div class="h-4 bg-gray-300 w-24 mb-1"></div>
                    <div class="h-4 bg-gray-300 w-16"></div>
                </li>
            </ul>
        </div>
    </div>
)
}

export default ProfileSkeleton