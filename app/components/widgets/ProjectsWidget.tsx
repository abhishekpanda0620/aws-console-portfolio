import { Code, Github, ExternalLink, Eye } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import ProjectModal from "../ProjectModal";

export default function ProjectsWidget() {
  const { t } = useLocale();
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: typeof portfolioData.projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear after animation
  };

  return (
    <>
      <WidgetWrapper
        id="projects"
        title={`${t('projects')} (${portfolioData.projects.length})`}
        icon={<Code size={18} />}
      >
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group/project border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-all cursor-pointer bg-white dark:bg-gray-900 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors">
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
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-[#ff9900] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-[#ff9900] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      title="View Live Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-xs text-[#ff9900] font-medium opacity-0 group-hover/project:opacity-100 transition-opacity">
                <Eye size={14} className="mr-1" />
                View Details
              </div>
            </div>
          ))}
        </div>
      </WidgetWrapper>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}
