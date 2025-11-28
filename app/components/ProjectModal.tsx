"use client";
import { X, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  highlights: string[];
  live?: string;
  status: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0d1117] w-full max-w-2xl rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      project.status === "Production" 
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Overview
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                            <span className="mr-2 text-[#ff9900] mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm border border-gray-200 dark:border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#161b22] rounded-b-lg flex justify-end gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    <ExternalLink size={18} />
                    View Live
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#ff9900] text-white rounded-lg hover:bg-[#e68a00] transition-colors font-medium shadow-sm"
                >
                  <Github size={18} />
                  View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
