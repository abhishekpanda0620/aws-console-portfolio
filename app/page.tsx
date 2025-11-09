"use client";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Award,
  Code,
  Briefcase,
  RotateCcw,
  Lock,
  Unlock,
} from "lucide-react";
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { portfolioData } from "./data/portfolio";
import { useLocale } from "./context/LocaleContext";
// import MetricsWidget from "./components/MetricsWidget";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect, ReactNode } from "react";
import DraggableWidget from "./components/DraggableWidget";

// Icon mapping for certifications
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FaAws: FaAws,
  SiGooglecloud: SiGooglecloud,
  SiMicrosoftazure: VscAzure,
};

// Widget IDs - draggable widgets
const defaultWidgetOrder = [
  "projects",
  "certifications",
  "experience",
  "skills",
  "blog",
  "achievements",
];

export default function PortfolioConsole() {
  const { t } = useLocale();
  const [widgetOrder, setWidgetOrder] = useState(defaultWidgetOrder);
  const [mounted, setMounted] = useState(false);
  const [isDragEnabled, setIsDragEnabled] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setMounted(true);
    // Load saved order and drag state from localStorage
    const savedOrder = localStorage.getItem("widget-order");
    if (savedOrder) {
      setWidgetOrder(JSON.parse(savedOrder));
    }
    const savedDragState = localStorage.getItem("drag-enabled");
    if (savedDragState !== null) {
      setIsDragEnabled(JSON.parse(savedDragState));
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgetOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Save to localStorage
        localStorage.setItem("widget-order", JSON.stringify(newOrder));

        return newOrder;
      });
    }
  };

  const resetLayout = () => {
    setWidgetOrder(defaultWidgetOrder);
    localStorage.removeItem("widget-order");
  };

  const toggleDrag = () => {
    const newState = !isDragEnabled;
    setIsDragEnabled(newState);
    localStorage.setItem("drag-enabled", JSON.stringify(newState));
  };

  // Widget components
  const widgets: Record<string, ReactNode> = {
    projects: (
      <div
        id="projects"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Code size={18} className="text-[#ff9900]" />
            <span>{t('projects')} ({portfolioData.projects.length})</span>
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {portfolioData.projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors bg-white dark:bg-gray-900"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {project.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.status === "Production"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-[#ff9900]"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-[#ff9900]"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#ff9900] mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    certifications: (
      <div
        id="certifications"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Award size={18} className="text-[#ff9900]" />
            <span>
              {t('certifications')} ({portfolioData.certifications.length})
            </span>
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {portfolioData.certifications.map((cert, index) => {
              const IconComponent = iconMap[cert.icon] || FaAws;
              // Determine icon color based on provider
              const iconColorClass =
                cert.icon === 'FaAws' ? 'text-[#ff9900]' :
                cert.icon === 'SiGooglecloud' ? 'text-[#4285F4]' :
                cert.icon === 'SiMicrosoftazure' ? 'text-[#0078D4]' :
                'text-[#ff9900]';
              
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors bg-white dark:bg-gray-900"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-3 bg-opacity-10 rounded-lg">
                      <IconComponent size={28} className={iconColorClass} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                          {cert.name}
                        </h3>
                        {cert.Link && (
                          <a
                            href={cert.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-[#ff9900] ml-2"
                            title="View Certificate"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {t('issued')}: {cert.date}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                          {t('verified')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    experience: (
      <div
        id="experience"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Briefcase size={18} className="text-[#ff9900]" />
            <span>{t('experience')}</span>
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 border-[#ff9900] pl-4 py-2"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {exp.position}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {exp.company} • {exp.duration}
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {exp.responsibilities.slice(0, 3).map((resp, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#ff9900] mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    skills: (
      <div
        id="skills"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {t('skillsTechnologies')}
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('cloudDevOps')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.cloud.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full border border-orange-300 dark:border-orange-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('frontend')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.frontend.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('backend')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.backend.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    blog: (
      <div
        id="blog"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {t('blog')}
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="space-y-3">
            {portfolioData.blog.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors bg-white dark:bg-gray-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                      <span>{post.date}</span>
                      {post.views && (
                        <>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-400 dark:text-gray-600"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    ),
    achievements: (
      <div
        id="achievements"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px]"
      >
        <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            🏆 {t('achievements')}
          </h2>
        </div>
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {portfolioData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="relative p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800"
              >
                <div className="text-3xl font-bold text-[#ff9900] mb-2">
                  {index === 0
                    ? "90%"
                    : index === 1
                    ? "25%"
                    : index === 2
                    ? "40%"
                    : "60%"}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {achievement}
                </p>
                <div className="absolute top-2 right-2 text-2xl opacity-20">
                  🏆
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-[#0d1117] min-h-full p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0d1117] min-h-full p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {portfolioData.personal.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {portfolioData.personal.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
            {portfolioData.personal.experience} {t('yearsExperience')} | {portfolioData.experience[0].company}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Desktop controls */}
          <button
            onClick={toggleDrag}
            className={`hidden sm:flex px-3 sm:px-4 py-2 border rounded text-xs sm:text-sm items-center space-x-2 ${
              isDragEnabled
                ? "border-[#ff9900] bg-opacity-10 text-[#ff9900] hover:bg-opacity-20"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            title={isDragEnabled ? "Lock layout" : "Unlock layout"}
          >
            {isDragEnabled ? <Unlock size={14} /> : <Lock size={14} />}
            <span className="hidden md:inline">{isDragEnabled ? t('dragEnabled') : t('dragDisabled')}</span>
          </button>
          <button
            onClick={resetLayout}
            className="hidden sm:flex px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 items-center space-x-2"
            title="Reset widget layout to default"
          >
            <RotateCcw size={14} />
            <span className="hidden md:inline">{t('reset')}</span>
          </button>
          {/* Social links - visible on all screens */}
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
            title="GitHub"
          >
            <Github size={18} className="text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
            title="LinkedIn"
          >
            <Linkedin size={18} className="text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="px-3 sm:px-4 py-2 bg-[#ff9900] text-white rounded text-xs sm:text-sm hover:bg-[#cc7a00] flex items-center space-x-2"
          >
            <Mail size={14} />
            <span>{t('contact')}</span>
          </a>
        </div>
      </div>

      {/* Drag and Drop Info Banner - Hidden on mobile */}
      {isDragEnabled && (
        <div className="hidden sm:block mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <div>
              <h3 className="text-gray-800 dark:text-slate-300 font-semibold mb-1">
                {t('customizableDashboard')}
              </h3>
              <p className="text-sm text-gray-700 dark:text-slate-400">
                {t('dragInstruction')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Real-Time Metrics - Commented out until real API integration */}
      {/* <MetricsWidget /> */}

      {/* Draggable Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {isDragEnabled && typeof window !== 'undefined' && window.innerWidth >= 1024 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={widgetOrder}
              strategy={verticalListSortingStrategy}
            >
              {widgetOrder.map((widgetId) => (
                <DraggableWidget key={widgetId} id={widgetId}>
                  {widgets[widgetId]}
                </DraggableWidget>
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <>
            {widgetOrder.map((widgetId) => (
              <div key={widgetId}>{widgets[widgetId]}</div>
            ))}
          </>
        )}
      </div>

      {/* Career Journey Timeline - Always full width, non-draggable */}
      <div
        id="timeline"
        className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6"
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            🗺️ {t('careerJourney')}
          </h2>
          <div className="hidden sm:block text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
          </div>
        </div>
        <div className="p-3 sm:p-6">
          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff9900] to-orange-300 dark:to-orange-700"></div>

            <div className="space-y-6 sm:space-y-8">
              {portfolioData.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 sm:pl-16">
                  <div className="absolute left-2 sm:left-6 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ff9900] border-2 sm:border-4 border-white dark:border-gray-800 shadow-lg"></div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 bg-[#ff9900] bg-opacity-10 text-[#ffffff] rounded-full border border-[#ff9900]">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      📍 {exp.location}
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {exp.responsibilities.slice(0, 2).map((resp, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#ff9900] mr-2">▸</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {portfolioData.education.map((edu, index) => (
                <div key={index} className="relative pl-8 sm:pl-16">
                  <div className="absolute left-2 sm:left-6 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 border-2 sm:border-4 border-white dark:border-gray-800 shadow-lg"></div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 bg-blue-500 bg-opacity-10 text-blue-50 dark:text-blue-100 rounded-full border border-blue-500">
                        {edu.year}
                      </span>
                    </div>
                    {edu.grade && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        🎓 Grade: {edu.grade}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
