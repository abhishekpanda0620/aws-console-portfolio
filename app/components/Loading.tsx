"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0d1117]">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Spinning loader */}
          <Loader2 size={48} className="text-[#ff9900] animate-spin" />
          
          {/* AWS-style pulse effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#ff9900] border-opacity-20 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading Portfolio
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we prepare your experience...
          </p>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-[#ff9900] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#ff9900] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#ff9900] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}