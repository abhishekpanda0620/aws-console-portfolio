"use client";
import {
  Star,
  Grid3x3,
  Code,
  Award,
  Briefcase,
  BookOpen,
  Trophy,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolio";
import { useLocale } from "../context/LocaleContext";
import { changelog } from "../data/changelog";

export default function Sidebar() {
  const { t, region } = useLocale();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("projects");
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px matches lg breakpoint in Tailwind
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const portfolioSections = [
    { label: t('projects'), icon: <Code size={16} />, href: "projects", count: 4 },
    {
      label: t('certifications'),
      icon: <Award size={16} />,
      href: "certifications",
      count: 5,
    },
    { label: t('experience'), icon: <Briefcase size={16} />, href: "experience" },
    { label: t('skills'), icon: <Star size={16} />, href: "skills" },
    { label: t('blog'), icon: <BookOpen size={16} />, href: "blog", count: 3 },
    { label: t('achievements'), icon: <Trophy size={16} />, href: "achievements" },
    { label: t('careerJourney'), icon: <MapPin size={16} />, href: "timeline" },
  ];

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add highlight effect
      element.classList.add('ring-2', 'ring-[#ff9900]', 'ring-opacity-50');
      
      // Remove highlight after 2 seconds
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#ff9900]', 'ring-opacity-50');
      }, 2000);
      
      // Close sidebar on mobile when navigating to a section
      if (isMobile) {
        // Find the toggle button in ClientLayout and trigger a click
        const sidebarToggleButton = document.querySelector('.lg\\:hidden.fixed.bottom-4.right-4');
        if (sidebarToggleButton && window.getComputedStyle(sidebarToggleButton).display !== 'none') {
          (sidebarToggleButton as HTMLElement).click();
        }
      }
    }
  };

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-16"
      } bg-gray-800 dark:bg-[#232f3e] border-r border-gray-700 dark:border-gray-700 transition-all duration-300 flex flex-col h-full`}
    >
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
          {/* Profile Section */}
          <div className="p-4 border-b border-gray-700 dark:border-gray-700 bg-gray-900 dark:bg-[#1a2332]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9900] to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {portfolioData.personal.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">
                  {portfolioData.personal.name}
                </div>
                <div className="text-xs text-gray-400 leading-tight mt-0.5">
                  {portfolioData.personal.title}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Sections */}
          <div className="border-b border-gray-700 dark:border-gray-700">
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-400 tracking-wider">
              PORTFOLIO SECTIONS
            </div>
            <div className="bg-gray-900 dark:bg-[#1a2332]">
              {portfolioSections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(section.href)}
                  className={`w-full px-6 py-2.5 text-left text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white flex items-center justify-between group transition-colors ${
                    activeSection === section.href
                      ? "bg-gray-700 dark:bg-[#37475a] border-l-4 border-[#ff9900] text-white"
                      : "text-gray-300 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`${
                        activeSection === section.href
                          ? "text-[#ff9900]"
                          : "text-gray-400 dark:text-gray-400"
                      } group-hover:text-[#ff9900] transition-colors`}
                    >
                      {section.icon}
                    </span>
                    <span className={activeSection === section.href ? "font-semibold" : ""}>{section.label}</span>
                  </div>
                  {section.count && (
                    <span className="text-xs px-2 py-0.5 bg-gray-700 dark:bg-[#37475a] text-gray-300 dark:text-gray-300 rounded">
                      {section.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-b border-gray-700 dark:border-gray-700">
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-400 tracking-wider">
              QUICK ACTIONS
            </div>
            <div className="bg-gray-900 dark:bg-[#1a2332]">
              <button
                onClick={() => {
                  const mainElement = document.querySelector('main');
                  if (mainElement) {
                    mainElement.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                ↑ {t('backToTop')}
              </button>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="block w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                {t('sendEmail')}
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                🔗 {t('githubProfile')}
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>

          {/* Console Info */}
          <div className="p-4 border-t border-gray-700 dark:border-gray-700 mt-auto">
            <div className="space-y-2 text-xs text-gray-400 dark:text-gray-400">
              <div className="flex justify-between">
                <span>{t('region')}:</span>
                <span className="text-gray-200 dark:text-gray-200">
                  {region.flag} {region.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('status')}:</span>
                <span className="text-green-400">● {t('online')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('version')}:</span>
                <span className="text-gray-200 dark:text-gray-200">v{changelog[0].version}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isExpanded && (
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          <button
            onClick={() => handleNavClick("projects")}
            className={`p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded transition-colors ${
              activeSection === "projects" ? "bg-gray-700 text-[#ff9900]" : "text-white"
            }`}
            title="Projects"
          >
            <Code size={20} />
          </button>
          <button
            onClick={() => handleNavClick("certifications")}
            className={`p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded transition-colors ${
              activeSection === "certifications" ? "bg-gray-700 text-[#ff9900]" : "text-white"
            }`}
            title="Certifications"
          >
            <Award size={20} />
          </button>
          <button
            onClick={() => handleNavClick("experience")}
            className={`p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded transition-colors ${
              activeSection === "experience" ? "bg-gray-700 text-[#ff9900]" : "text-white"
            }`}
            title="Experience"
          >
            <Briefcase size={20} />
          </button>
          <button
            onClick={() => handleNavClick("skills")}
            className={`p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded transition-colors ${
              activeSection === "skills" ? "bg-gray-700 text-[#ff9900]" : "text-white"
            }`}
            title="Skills"
          >
            <Star size={20} />
          </button>
        </div>
      )}
    </aside>
  );
}
