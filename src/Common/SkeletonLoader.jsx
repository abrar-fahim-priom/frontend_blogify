import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-[#1a1a2e] p-4 rounded-lg shadow-md animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-40 bg-gray-700 rounded-md"></div>

          {/* Title Skeleton */}
          <div className="mt-4 h-6 w-3/4 bg-gray-600 rounded"></div>

          {/* Description Skeleton */}
          <div className="mt-2 h-4 w-5/6 bg-gray-700 rounded"></div>
          <div className="mt-2 h-4 w-2/3 bg-gray-700 rounded"></div>

          {/* Footer Skeleton */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-6 w-1/4 bg-gray-600 rounded"></div>
            <div className="h-6 w-10 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
