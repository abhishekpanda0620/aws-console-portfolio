"use client";
import { useState, useEffect } from 'react';
import { TrendingUp, GitCommit, Eye, Users } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

type Metric = {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
};

export default function MetricsWidget() {
  const { t } = useLocale();
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: t('githubStars'),
      value: 0,
      icon: <TrendingUp size={16} />,
      color: 'text-yellow-500',
      trend: '+12%'
    },
    {
      label: t('totalCommits'),
      value: 0,
      icon: <GitCommit size={16} />,
      color: 'text-green-500',
      trend: '+8%'
    },
    {
      label: t('blogReads'),
      value: 0,
      icon: <Eye size={16} />,
      color: 'text-blue-500',
      trend: '+25%'
    },
    {
      label: t('visitors'),
      value: 0,
      icon: <Users size={16} />,
      color: 'text-purple-500',
      trend: '+15%'
    },
  ]);

  useEffect(() => {
    // Simulate fetching real-time data
    const fetchMetrics = () => {
      setMetrics([
        {
          label: t('githubStars'),
          value: Math.floor(Math.random() * 50) + 150,
          icon: <TrendingUp size={16} />,
          color: 'text-yellow-500',
          trend: '+12%'
        },
        {
          label: t('totalCommits'),
          value: Math.floor(Math.random() * 100) + 1200,
          icon: <GitCommit size={16} />,
          color: 'text-green-500',
          trend: '+8%'
        },
        {
          label: t('blogReads'),
          value: Math.floor(Math.random() * 500) + 2500,
          icon: <Eye size={16} />,
          color: 'text-blue-500',
          trend: '+25%'
        },
        {
          label: t('visitors'),
          value: Math.floor(Math.random() * 200) + 800,
          icon: <Users size={16} />,
          color: 'text-purple-500',
          trend: '+15%'
        },
      ]);
    };

    // Initial fetch
    fetchMetrics();

    // Update every 5 seconds for "real-time" feel
    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, [t]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`${metric.color}`}>
              {metric.icon}
            </div>
            {metric.trend && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                {metric.trend}
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatNumber(metric.value)}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}