"use client";
import { ArrowLeft, Package, Calendar, Tag, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import Link from "next/link";
import { changelog, upcomingFeatures } from "../data/changelog";

const categoryColors = {
  Added: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
  Changed: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
  Fixed: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700",
  Removed: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
  Deprecated: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
};

const versionTypeColors = {
  major: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  minor: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  patch: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
};

const statusColors = {
  planned: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  considering: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
};

export default function ChangelogPage() {
  return (
    <div className="bg-white dark:bg-[#0d1117] min-h-full p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#ff9900] dark:hover:text-[#ff9900] mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        
        <div className="flex items-center space-x-3 mb-2">
          <Package size={32} className="text-[#ff9900]" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Changelog
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Track all changes, improvements, and new features added to this portfolio
        </p>
      </div>

      {/* Version History */}
      <div className="space-y-8 mb-12">
        {changelog.map((entry, index) => (
          <div
            key={entry.version}
            className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden"
          >
            {/* Version Header */}
            <div className="p-4 sm:p-6 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <Tag size={20} className="text-[#ff9900]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    v{entry.version}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${versionTypeColors[entry.type]}`}>
                    {entry.type}
                  </span>
                  {index === 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#ff9900] text-white">
                      Latest
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>{entry.date}</span>
                </div>
              </div>
            </div>

            {/* Changes */}
            <div className="p-4 sm:p-6 space-y-6">
              {entry.changes.map((change, changeIndex) => (
                <div key={changeIndex}>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border mb-3 ${categoryColors[change.category]}`}>
                    <span className="font-semibold text-sm">{change.category}</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {change.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={16} className="text-[#ff9900] mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Features */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-300 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center space-x-3">
            <Lightbulb size={24} className="text-[#ff9900]" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Features
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Features and improvements planned for future releases
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[feature.status]}`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold mb-1">Version Numbering</p>
            <p>
              This project follows <a href="https://semver.org/" target="_blank" rel="noopener noreferrer" className="text-[#ff9900] hover:underline">Semantic Versioning</a>:
              <span className="font-mono ml-1">MAJOR.MINOR.PATCH</span>
            </p>
            <ul className="mt-2 space-y-1 ml-4">
              <li><strong>MAJOR</strong> - Incompatible changes or major new features</li>
              <li><strong>MINOR</strong> - New features in a backwards-compatible manner</li>
              <li><strong>PATCH</strong> - Backwards-compatible bug fixes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}