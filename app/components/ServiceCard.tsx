'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Circle } from 'lucide-react';

export default function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="p-5 rounded-lg bg-[#0b1220] aws-card border border-gray-800 hover:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-semibold text-base group-hover:text-awsaccent transition-colors">
            {title}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <Circle size={8} className="fill-green-500 text-green-500" />
            <span className="text-xs text-green-400">Operational</span>
          </div>
        </div>
        <ExternalLink size={16} className="text-gray-500 group-hover:text-awsaccent transition-colors" />
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          Last updated: <span className="text-gray-400">2 days ago</span>
        </div>
        <button className="text-xs py-1.5 px-4 rounded bg-[#0f1724] border border-gray-700 text-gray-300 hover:bg-[#1a2332] hover:border-awsaccent hover:text-awsaccent transition-all font-medium">
          View Details
        </button>
      </div>

      {/* AWS-style accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-awsaccent to-orange-600 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}