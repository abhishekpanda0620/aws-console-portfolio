"use client";
import { Search, Bell, HelpCircle, Settings, ChevronDown, Sun, Moon, Monitor, X } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio';

// Simple theme hook
function useSimpleTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('aws-console-theme') as 'light' | 'dark' | 'system';
    if (saved) {
      setThemeState(saved);
      const root = document.documentElement;
      let effectiveTheme: 'light' | 'dark';
      
      if (saved === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        effectiveTheme = saved;
      }
      
      root.classList.remove('light', 'dark');
      root.classList.add(effectiveTheme);
    }
  }, []);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('aws-console-theme', newTheme);
    
    const root = document.documentElement;
    let effectiveTheme: 'light' | 'dark';
    
    if (newTheme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = newTheme;
    }
    
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
    root.setAttribute('data-theme', effectiveTheme);
    root.style.colorScheme = effectiveTheme;
    
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  };

  return { theme, setTheme, mounted };
}

export default function TopNav() {
  const { theme, setTheme, mounted } = useSimpleTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // Search projects
    portfolioData.projects.forEach(project => {
      if (project.name.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))) {
        results.push({ type: 'Project', name: project.name, section: 'projects' });
      }
    });

    // Search skills
    const allSkills = [...portfolioData.skills.cloud, ...portfolioData.skills.frontend, ...portfolioData.skills.backend];
    allSkills.forEach(skill => {
      if (skill.toLowerCase().includes(query)) {
        results.push({ type: 'Skill', name: skill, section: 'skills' });
      }
    });

    // Search certifications
    portfolioData.certifications.forEach(cert => {
      if (cert.name.toLowerCase().includes(query)) {
        results.push({ type: 'Certification', name: cert.name, section: 'certifications' });
      }
    });

    // Search blog
    portfolioData.blog.forEach(post => {
      if (post.title.toLowerCase().includes(query)) {
        results.push({ type: 'Blog', name: post.title, section: 'blog' });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(results.length > 0);
  }, [searchQuery]);

  const handleSearchResultClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  if (!mounted) {
    return (
      <header className="w-full bg-gray-800 dark:bg-[#232f3e] h-12 flex items-center justify-between border-b border-gray-700 px-4">
        <div className="flex items-center space-x-4">
          <div className="text-white font-bold text-sm">aws</div>
          <div className="text-white text-sm">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-gray-800 dark:bg-[#232f3e] h-12 flex items-center justify-between border-b border-gray-700 px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* AWS Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-white font-bold text-sm">aws</div>
        </div>

        {/* Services Menu */}
        <button className="text-white text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] px-3 py-1.5 rounded flex items-center space-x-1">
          <span>Portfolio</span>
          <ChevronDown size={14} />
        </button>

        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={16} />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            className="pl-10 pr-10 py-2 rounded bg-gray-700 dark:bg-[#37475a] text-white text-sm border border-gray-600 focus:outline-none focus:border-[#ff9900] focus:ring-1 focus:ring-[#ff9900] w-96"
            placeholder="Search projects, skills, certifications..."
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result.section)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{result.type}</div>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 rotate-[-90deg]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Support Icon */}
        <a
          href="https://github.com/abhishekpanda1999"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
          title="GitHub"
        >
          <HelpCircle size={18} />
        </a>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white" title="Notifications">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff9900] rounded-full"></span>
        </button>

        {/* Settings/Theme Toggle */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
            title="Theme Settings"
          >
            <Settings size={18} />
          </button>
          
          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    setTheme('light');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Sun size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">Light</span>
                  {theme === 'light' && <span className="ml-auto text-[#ff9900]">✓</span>}
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Moon size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">Dark</span>
                  {theme === 'dark' && <span className="ml-auto text-[#ff9900]">✓</span>}
                </button>
                <button
                  onClick={() => {
                    setTheme('system');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Monitor size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">System</span>
                  {theme === 'system' && <span className="ml-auto text-[#ff9900]">✓</span>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Region Selector */}
        <button className="text-white text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] px-3 py-1.5 rounded flex items-center space-x-1">
          <span>India (ap-south-1)</span>
          <ChevronDown size={14} />
        </button>

        {/* User Account */}
        <button className="text-white text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] px-3 py-1.5 rounded flex items-center space-x-1">
          <span>{portfolioData.personal.name}</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}
