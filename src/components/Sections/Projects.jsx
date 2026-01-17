import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { supabase } from '../../supabaseClient';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true }); // Or use created_at

      if (error) throw error;
      if (data) setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Ensure URL has protocol
  const formatUrl = (url) => {
    if (!url) return '#';
    const cleanUrl = url.trim();
    if (cleanUrl.length === 0) return '#';
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) return cleanUrl;
    return `https://${cleanUrl}`;
  };

  const displayProjects = projects.length > 0 ? projects : [];

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-blue-500 font-mono tracking-widest uppercase mb-4 text-sm md:text-base">/ Featured Works</h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">Selected <span className="text-blue-500">Projects</span></h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-blue-400 font-mono animate-pulse">
            Loading neural data...
          </div>
        )}

        {/* Stacked Cards Container */}
        <div className="space-y-12 md:space-y-[10vh]">
          {displayProjects.map((project, index) => (
            <div 
              key={project.id || index}
              className="sticky top-20 md:top-24 mx-auto w-full max-w-5xl transition-all duration-500"
              style={{ 
                // Using inline styles for the scaling effect logic
                marginTop: index === 0 ? '0' : '20px'
              }}
            >
              <div className={`group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-gradient-to-br ${project.color || 'from-white to-slate-50 dark:from-gray-800 dark:to-gray-900'} p-5 md:p-12 backdrop-blur-2xl transition-all hover:border-blue-500/30 dark:hover:border-white/20 shadow-xl dark:shadow-2xl`}>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  {/* Project Info */}
                  <div className="w-full md:w-1/2 order-2 md:order-1">
                    <span className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">{project.category}</span>
                    <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-slate-700 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                      {/* Handle if tech is stored as JSON/Array or string */}
                      {(Array.isArray(project.tech) ? project.tech : project.tech?.split(','))?.map((t, i) => (
                        <span key={i} className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-[10px] md:text-xs font-bold text-slate-800 dark:text-gray-300">
                          {typeof t === 'string' ? t.trim() : t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.demo_link && (
                        <a href={formatUrl(project.demo_link)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 rounded-full bg-blue-500 text-white text-sm md:text-base font-bold hover:scale-105 transition-all">
                          Live Demo <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                      {project.repo_link && (
                        <a href={formatUrl(project.repo_link)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white text-sm md:text-base font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                          Source <FaGithub size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Image Placeholder */}
                  <div className="w-full md:w-1/2 order-1 md:order-2 overflow-hidden rounded-xl md:rounded-2xl border border-white/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
