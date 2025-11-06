'use client';
import { Star, Home, Grid3x3, Code, Award, Briefcase, BookOpen, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const portfolioSections = [
    { label: 'Dashboard', icon: <Home size={16} />, href: '#dashboard' },
    { label: 'Projects (EC2)', icon: <Code size={16} />, href: '#projects', count: 4 },
    { label: 'Certifications (IAM)', icon: <Award size={16} />, href: '#certifications', count: 3 },
    { label: 'Experience (CloudWatch)', icon: <Briefcase size={16} />, href: '#experience' },
    { label: 'Skills (S3)', icon: <Star size={16} />, href: '#skills' },
    { label: 'Blog (Lambda)', icon: <BookOpen size={16} />, href: '#blog', count: 3 },
    { label: 'Contact', icon: <Mail size={16} />, href: '#contact' }
  ];

  const awsServices = [
    'EC2 - Virtual Servers',
    'Lambda - Serverless Functions',
    'S3 - Object Storage',
    'RDS - Managed Databases',
    'CloudFormation - Infrastructure as Code',
    'API Gateway - API Management',
    'DynamoDB - NoSQL Database',
    'CloudWatch - Monitoring',
    'IAM - Identity Management'
  ];

  return (
    <aside className={`${isExpanded ? 'w-64' : 'w-16'} bg-gray-800 dark:bg-[#232f3e] border-r border-gray-700 dark:border-gray-700 transition-all duration-300 flex flex-col h-full`}>
      {/* Toggle Button */}
      <div className="p-3 border-b border-gray-700 dark:border-gray-700">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Grid3x3 size={20} />
        </button>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-y-auto">
          {/* Portfolio Sections */}
          <div className="border-b border-gray-700 dark:border-gray-700">
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-400 tracking-wider">
              PORTFOLIO SECTIONS
            </div>
            <div className="bg-gray-900 dark:bg-[#1a2332]">
              {portfolioSections.map((section, index) => (
                <a
                  key={index}
                  href={section.href}
                  className="w-full px-6 py-2.5 text-left text-gray-300 dark:text-gray-300 text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 dark:text-gray-400 group-hover:text-[#ff9900]">
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </div>
                  {section.count && (
                    <span className="text-xs px-2 py-0.5 bg-gray-700 dark:bg-[#37475a] text-gray-300 dark:text-gray-300 rounded">
                      {section.count}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* AWS Services Reference */}
          <div className="border-b border-gray-700 dark:border-gray-700">
            <button className="w-full px-4 py-3 text-left text-white font-semibold text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] flex items-center justify-between">
              <span>AWS Services Used</span>
            </button>
            <div className="bg-gray-900 dark:bg-[#1a2332] max-h-64 overflow-y-auto">
              {awsServices.map((service, index) => (
                <div
                  key={index}
                  className="px-6 py-2 text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Console Info */}
          <div className="p-4 border-t border-gray-700 dark:border-gray-700 mt-auto">
            <div className="space-y-2 text-xs text-gray-400 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Region:</span>
                <span className="text-gray-200 dark:text-gray-200">ap-south-1</span>
              </div>
              <div className="flex justify-between">
                <span>Account:</span>
                <span className="text-gray-200 dark:text-gray-200">Portfolio</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-gray-200 dark:text-gray-200">v2.0</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-4 border-t border-gray-700 dark:border-gray-700">
            <div className="text-xs space-y-2">
              <a 
                href="https://github.com/abhishekpanda1999" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 dark:text-gray-400 hover:text-[#ff9900] transition-colors"
              >
                📚 GitHub Profile
              </a>
              <a 
                href="https://www.linkedin.com/in/abhishek-panda1999/" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 dark:text-gray-400 hover:text-[#ff9900] transition-colors"
              >
                💼 LinkedIn
              </a>
              <a 
                href="mailto:abhishekpanda1999@gmail.com"
                className="block text-gray-400 dark:text-gray-400 hover:text-[#ff9900] transition-colors"
              >
                💬 Contact
              </a>
            </div>
          </div>
        </div>
      )}

      {!isExpanded && (
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          <button className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white" title="Dashboard">
            <Home size={20} />
          </button>
          <button className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white" title="Projects">
            <Code size={20} />
          </button>
          <button className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white" title="Certifications">
            <Award size={20} />
          </button>
          <button className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white" title="Experience">
            <Briefcase size={20} />
          </button>
        </div>
      )}
    </aside>
  );
}