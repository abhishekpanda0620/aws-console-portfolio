"use client";
import { MoreVertical, Plus, ExternalLink, Github, Linkedin, Mail, Award, Code, Briefcase } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import { SiGooglecloud } from 'react-icons/si';
import { portfolioData } from './data/portfolio';

// Icon mapping for certifications
const iconMap: Record<string, any> = {
  FaAws: FaAws,
  SiGooglecloud: SiGooglecloud,
};

export default function PortfolioConsole() {
  return (
    <div className="bg-white dark:bg-[#0d1117] min-h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {portfolioData.personal.name} - Portfolio Console
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {portfolioData.personal.title} | {portfolioData.personal.experience} Experience
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <a 
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Github size={20} className="text-gray-700 dark:text-gray-300" />
          </a>
          <a 
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Linkedin size={20} className="text-gray-700 dark:text-gray-300" />
          </a>
          <a 
            href={`mailto:${portfolioData.personal.email}`}
            className="px-4 py-2 bg-[#ff9900] text-white rounded text-sm hover:bg-[#cc7a00] flex items-center space-x-2"
          >
            <Mail size={16} />
            <span>Contact Me</span>
          </a>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Widget */}
        <div id="projects" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 lg:col-span-2 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Code size={20} className="text-[#ff9900]" />
                <span>Projects ({portfolioData.projects.length})</span>
              </h2>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === 'Production' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      }`}>
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

        {/* Certifications Widget */}
        <div id="certifications" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Award size={20} className="text-[#ff9900]" />
                <span>Certifications ({portfolioData.certifications.length})</span>
              </h2>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => {
                const IconComponent = iconMap[cert.icon] || FaAws;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors bg-white dark:bg-gray-900"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-3  bg-opacity-10 rounded-lg">
                        <IconComponent size={28} className="text-[#ff9900]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Issued: {cert.date}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                            Verified
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

        {/* Experience Widget */}
        <div id="experience" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Briefcase size={20} className="text-[#ff9900]" />
                <span>Experience</span>
              </h2>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
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

        {/* Skills Widget */}
        <div id="skills" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Cloud & DevOps
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
                  Frontend
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
                  Backend
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

        {/* Blog Posts Widget */}
        <div id="blog" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Blog & Articles
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
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
                        <span>•</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 dark:text-gray-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Widget */}
        <div id="achievements" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 lg:col-span-2 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🏆 Key Achievements
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolioData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="relative p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800"
                >
                  <div className="text-3xl font-bold text-[#ff9900] mb-2">
                    {index === 0 ? '40%' : index === 1 ? '50%' : index === 2 ? '5+' : '10K+'}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{achievement}</p>
                  <div className="absolute top-2 right-2 text-2xl opacity-20">🏆</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <div id="timeline" className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 lg:col-span-2 scroll-mt-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🗺️ Career Journey
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff9900] to-orange-300 dark:to-orange-700"></div>
              
              <div className="space-y-8">
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-[#ff9900] border-4 border-white dark:border-gray-800 shadow-lg"></div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-[#ff9900] bg-opacity-10 text-[#ffffff] rounded-full border border-[#ff9900]">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">📍 {exp.location}</p>
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
                
                {/* Education */}
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="relative pl-16">
                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800 shadow-lg"></div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-blue-500 bg-opacity-10 text-blue-200 dark:text-blue-400 rounded-full border border-blue-500">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">🎓 Grade: {edu.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
