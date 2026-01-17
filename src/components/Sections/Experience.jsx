import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Experience = () => {
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await supabase.from('skills').select('*').order('level', { ascending: false });
        const educationData = await supabase.from('education').select('*').order('id', { ascending: false }); // Assuming newer first or based on ID

        if (skillsData.data) setSkills(skillsData.data);
        if (educationData.data) setEducation(educationData.data);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="experience" className="relative min-h-screen py-20 flex items-center overflow-visible">
      {/* 100vw Glass Panel Trick - Full Height Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full bg-slate-50 dark:bg-white/5 border-y border-black/5 dark:border-white/10 backdrop-blur-sm -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Skills Column */}
          <div>
            <h2 className="text-3xl font-black mb-8 lg:mb-12 tracking-tighter text-center lg:text-left text-slate-900 dark:text-white">
              Technical <span className="text-blue-500">Skills</span>
            </h2>
            
            {loading ? (
               <div className="text-center text-gray-500 animate-pulse">Loading skills matrix...</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:gap-8">
                {skills.map((skill) => (
                  <div key={skill.id || skill.name} className="glass p-4 lg:p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col items-center group">
                    <div className="relative h-24 w-24 lg:h-32 lg:w-32">
                      {/* Increased viewBox to prevent shadow clipping */}
                      <svg className="h-full w-full overflow-visible" viewBox="-10 -10 120 120">
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke="currentColor"
                          className="text-slate-200 dark:text-white/10"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke={skill.color}
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - skill.level / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out group-hover:scale-105"
                          style={{ filter: `drop-shadow(0 0 10px ${skill.color})` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-base lg:text-lg font-bold text-slate-900 dark:text-white">
                        {skill.level}%
                      </div>
                    </div>
                    <span className="mt-4 font-bold text-slate-800 dark:text-gray-200 uppercase tracking-[0.2em] text-[10px] lg:text-xs text-center group-hover:text-blue-500 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education Timeline Column */}
          <div>
            <h2 className="text-3xl font-black mb-8 lg:mb-12 tracking-tighter text-center lg:text-left mt-12 lg:mt-0 text-slate-900 dark:text-white">
              Education <span className="text-blue-500">Path</span>
            </h2>
            
            {loading ? (
               <div className="text-center text-gray-500 animate-pulse">Loading education history...</div>
            ) : (
              <div className="relative space-y-12 pl-4 lg:pl-8">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent"></div>

                {education.map((item, index) => (
                  <div key={item.id || index} className="relative group ml-4 lg:ml-0">
                    {/* Glowing Dot */}
                    <div className="absolute -left-[22px] lg:-left-[42px] top-1 h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform duration-300"></div>
                    
                    <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-xl group/card">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-blue-400 font-mono text-xs lg:text-sm px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">{item.year}</span>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white group-hover/card:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-blue-500/80 text-sm lg:text-base font-bold mt-1 mb-4">{item.institution}</p>
                      <p className="text-slate-700 dark:text-gray-400 text-sm lg:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
