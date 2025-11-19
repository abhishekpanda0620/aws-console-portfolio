import { Code, Github, ExternalLink } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function ProjectsWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="projects"
      title={`${t('projects')} (${portfolioData.projects.length})`}
      icon={<Code size={18} />}
    >
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
    </WidgetWrapper>
  );
}
