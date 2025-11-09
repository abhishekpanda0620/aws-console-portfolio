"use client";
import {
  Star,
  Home,
  Grid3x3,
  Code,
  Award,
  Briefcase,
  BookOpen,
  Trophy,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { portfolioData } from "../data/portfolio";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("projects");

  const portfolioSections = [
    { label: "Projects", icon: <Code size={16} />, href: "projects", count: 4 },
    {
      label: "Certifications",
      icon: <Award size={16} />,
      href: "certifications",
      count: 4,
    },
    { label: "Experience", icon: <Briefcase size={16} />, href: "experience" },
    { label: "Skills", icon: <Star size={16} />, href: "skills" },
    { label: "Blog", icon: <BookOpen size={16} />, href: "blog", count: 3 },
    { label: "Achievements", icon: <Trophy size={16} />, href: "achievements" },
    { label: "Career Journey", icon: <MapPin size={16} />, href: "timeline" },
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
                ↑ Back to Top
              </button>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="block w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                ✉️ Send Email
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-2 text-left text-gray-400 dark:text-gray-400 text-xs hover:bg-gray-700 dark:hover:bg-[#37475a] hover:text-white transition-colors"
              >
                🔗 GitHub Profile
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
                <span>Region:</span>
                <span className="text-gray-200 dark:text-gray-200">
                  {portfolioData.personal.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-400">● Online</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-gray-200 dark:text-gray-200">v2.0</span>
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
