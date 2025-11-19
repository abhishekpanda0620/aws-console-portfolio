"use client";
import {
  Github,
  Linkedin,
  Mail,
  RotateCcw,
  Lock,
  Unlock,
} from "lucide-react";
import { portfolioData } from "./data/portfolio";
import { useLocale } from "./context/LocaleContext";
import Loading from "./components/Loading";
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

// Import Widget Components
import ProjectsWidget from "./components/widgets/ProjectsWidget";
import CertificationsWidget from "./components/widgets/CertificationsWidget";
import ExperienceWidget from "./components/widgets/ExperienceWidget";
import SkillsWidget from "./components/widgets/SkillsWidget";
import BlogWidget from "./components/widgets/BlogWidget";
import AchievementsWidget from "./components/widgets/AchievementsWidget";

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
      // Merge saved order with new widgets if they are missing
      const parsedOrder = JSON.parse(savedOrder);
      // Filter out any widgets that might be in local storage but no longer exist
      const validWidgets = parsedOrder.filter((id: string) => defaultWidgetOrder.includes(id));
      
      // If we have valid widgets from storage, use them, otherwise default
      // Also check if we need to add any new default widgets that aren't in storage
      const newWidgets = defaultWidgetOrder.filter(id => !validWidgets.includes(id));
      
      if (validWidgets.length > 0) {
         setWidgetOrder([...validWidgets, ...newWidgets]);
      } else {
         setWidgetOrder(defaultWidgetOrder);
      }
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
    projects: <ProjectsWidget />,
    certifications: <CertificationsWidget />,
    experience: <ExperienceWidget />,
    skills: <SkillsWidget />,
    blog: <BlogWidget />,
    achievements: <AchievementsWidget />,
  };

  if (!mounted) {
    return <Loading />;
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
