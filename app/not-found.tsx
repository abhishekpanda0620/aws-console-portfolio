"use client";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0d1117] p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle size={64} className="text-[#ff9900]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-[#ff9900] border-opacity-20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
        </p>

        {/* AWS Console Style Error Details */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold mb-1">Error Details</p>
              <p className="text-xs">
                <strong>Status Code:</strong> 404<br />
                <strong>Error Type:</strong> Resource Not Found<br />
                <strong>Timestamp:</strong> {timestamp || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#ff9900] text-white rounded-lg hover:bg-[#cc7a00] transition-colors font-medium"
          >
            <Home size={20} />
            <span>Go to Homepage</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/#projects"
              className="text-[#ff9900] hover:underline flex items-center space-x-1"
            >
              <span>Projects</span>
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/#certifications"
              className="text-[#ff9900] hover:underline flex items-center space-x-1"
            >
              <span>Certifications</span>
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/#experience"
              className="text-[#ff9900] hover:underline flex items-center space-x-1"
            >
              <span>Experience</span>
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/changelog"
              className="text-[#ff9900] hover:underline flex items-center space-x-1"
            >
              <span>Changelog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}