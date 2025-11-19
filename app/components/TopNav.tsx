"use client";
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  X,
  Globe,
  Terminal,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolio";
import { useLocale, regions } from "../context/LocaleContext";
import Link from "next/link";
import { TbBrandPowershell } from "react-icons/tb";


// Simple theme hook
function useSimpleTheme() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("aws-console-theme") as
      | "light"
      | "dark"
      | "system";
    if (saved) {
      setThemeState(saved);
      const root = document.documentElement;
      let effectiveTheme: "light" | "dark";

      if (saved === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        effectiveTheme = saved;
      }

      root.classList.remove("light", "dark");
      root.classList.add(effectiveTheme);
    }
  }, []);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    localStorage.setItem("aws-console-theme", newTheme);

    const root = document.documentElement;
    let effectiveTheme: "light" | "dark";

    if (newTheme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = newTheme;
    }

    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
    root.setAttribute("data-theme", effectiveTheme);
    root.style.colorScheme = effectiveTheme;

    document.body.style.display = "none";
    void document.body.offsetHeight; // Force reflow
    document.body.style.display = "";
  };

  return { theme, setTheme, mounted };
}

export default function TopNav({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const { theme, setTheme, mounted } = useSimpleTheme();
  const { region, setRegion, t } = useLocale();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      type: string;
      name: string;
      section: string;
    }>
  >([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const regionMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (
        regionMenuRef.current &&
        !regionMenuRef.current.contains(event.target as Node)
      ) {
        setShowRegionMenu(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: Array<{
      type: string;
      name: string;
      section: string;
    }> = [];

    // Search projects
    portfolioData.projects.forEach((project) => {
      if (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))
      ) {
        results.push({
          type: "Project",
          name: project.name,
          section: "projects",
        });
      }
    });

    // Search skills
    const allSkills = [
      ...portfolioData.skills.cloud,
      ...portfolioData.skills.frontend,
      ...portfolioData.skills.backend,
    ];
    allSkills.forEach((skill) => {
      if (skill.toLowerCase().includes(query)) {
        results.push({ type: "Skill", name: skill, section: "skills" });
      }
    });

    // Search certifications
    portfolioData.certifications.forEach((cert) => {
      if (cert.name.toLowerCase().includes(query)) {
        results.push({
          type: "Certification",
          name: cert.name,
          section: "certifications",
        });
      }
    });

    // Search blog
    portfolioData.blog.forEach((post) => {
      if (post.title.toLowerCase().includes(query)) {
        results.push({ type: "Blog", name: post.title, section: "blog" });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(results.length > 0);
  }, [searchQuery]);

  const handleSearchResultClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  if (!mounted) {
    return (
      <header className="w-full bg-gray-800 dark:bg-[#232f3e] h-12 flex items-center justify-between border-b border-gray-700 px-4">
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-gray-800 py-1 dark:bg-aws-blue h-12 flex items-center justify-between border-b border-gray-700 px-2 sm:px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-[200px] sm:max-w-md" ref={searchRef}>
          <div className="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400">
            <Search size={14} className="sm:w-4 sm:h-4" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() =>
              searchResults.length > 0 && setShowSearchResults(true)
            }
            className="pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 rounded bg-gray-700 dark:bg-[#37475a] text-white text-xs sm:text-sm border border-gray-600 focus:outline-none focus:border-[#ff9900] focus:ring-1 focus:ring-[#ff9900] w-full"
            placeholder={t("searchPlaceholder")}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute right-2 sm:right-3 top-2 sm:top-2.5 text-gray-400 hover:text-white"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
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
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {result.type}
                      </div>
                    </div>
                    <ChevronDown
                      size={14}
                      className="text-gray-400 rotate-[-90deg]"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Terminal Button - AWS CloudShell style (hidden on mobile) */}
        {onOpenTerminal && (
          <button
            onClick={onOpenTerminal}
            className="hidden sm:flex items-center p-1.5 sm:p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
            title="Open CloudShell"
          >
            <TbBrandPowershell size={16} className="sm:w-[18px] sm:h-[18px] mr-1" />
          </button>
        )}
        {/* Support Icon - Hidden on mobile */}
        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
          title="GitHub"
        >
          <HelpCircle size={18} />
        </a>

        {/* Notification Bell - Hidden on mobile */}
        <Link
          href="/changelog"
          className="hidden sm:block relative p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
          title="Notifications"
        >
          <button
            className="hidden sm:block relative p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff9900] rounded-full"></span>
          </button>
        </Link>

        {/* Settings/Theme Toggle */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-1.5 sm:p-2 hover:bg-gray-700 dark:hover:bg-[#37475a] rounded text-white"
            title="Theme Settings"
          >
            <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    setTheme("light");
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                    theme === "light" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <Sun size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">Light</span>
                  {theme === "light" && (
                    <span className="ml-auto text-[#ff9900]">✓</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTheme("dark");
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                    theme === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <Moon size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">Dark</span>
                  {theme === "dark" && (
                    <span className="ml-auto text-[#ff9900]">✓</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTheme("system");
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                    theme === "system" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <Monitor
                    size={16}
                    className="text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-900 dark:text-white">System</span>
                  {theme === "system" && (
                    <span className="ml-auto text-[#ff9900]">✓</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Region Selector */}
        <div className="relative" ref={regionMenuRef}>
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="hidden md:flex text-white text-xs sm:text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] px-2 sm:px-3 py-1.5 rounded items-center space-x-1"
            title="Select Region (Languages)"
          >
            <Globe size={14} />
            <span>
              {region.flag} {region.name}
            </span>
            <ChevronDown size={12} className="sm:w-[14px] sm:h-[14px]" />
          </button>

          {showRegionMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
              <div className="py-1">
                {regions.map((r) => (
                  <button
                    key={r.code}
                    onClick={() => {
                      setRegion(r);
                      setShowRegionMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                      region.code === r.code
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{r.flag}</span>
                      <div>
                        <div className="text-gray-900 dark:text-white font-medium">
                          {r.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {r.code}
                        </div>
                      </div>
                    </div>
                    {region.code === r.code && (
                      <span className="text-[#ff9900]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account with Mobile Menu */}
        <div className="relative" ref={mobileMenuRef}>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white text-xs sm:text-sm hover:bg-gray-700 dark:hover:bg-[#37475a] px-2 sm:px-3 py-1.5 rounded flex items-center space-x-1"
          >
            <span className="hidden sm:inline">
              {portfolioData.personal.name}
            </span>
            <span className="sm:hidden">AP</span>
            <ChevronDown size={12} className="sm:hidden" />
          </button>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
              <div className="py-1">
                {/* Mobile Terminal Option - Only show on mobile since desktop has the icon */}
                {onOpenTerminal && (
                  <button
                    onClick={() => {
                      onOpenTerminal();
                      setShowMobileMenu(false);
                    }}
                    className="sm:hidden w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Terminal size={16} className="text-gray-900 dark:text-white" />
                    <span className="text-gray-900 dark:text-white">CloudShell</span>
                  </button>
                )}
                
                {/* Mobile Region Selector */}
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                    Region
                  </div>
                  {regions.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => {
                        setRegion(r);
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{r.flag}</span>
                        <span className="text-gray-900 dark:text-white">{r.name}</span>
                      </div>
                      {region.code === r.code && (
                        <span className="text-[#ff9900]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* GitHub Link */}
                <a
                  href="https://github.com/abhishekpanda1999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 border-t border-gray-200 dark:border-gray-700"
                >
                  <HelpCircle size={16} className="text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white">GitHub</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
