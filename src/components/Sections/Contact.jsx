import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden px-4 md:px-0">
      <div className="container mx-auto md:px-6">
        <div className="glass rounded-[2rem] md:rounded-[3rem] border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 p-8 md:p-20 text-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 blur-[120px] rounded-full -z-10"></div>
          
          <h2 className="text-blue-500 font-mono tracking-[0.3em] uppercase mb-4 md:mb-6 text-sm md:text-base">/ Get In Touch</h2>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 text-slate-900 dark:text-white">
            Let's build something <br />
            <span className="text-blue-500">extraordinary.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-700 dark:text-gray-400 text-base md:text-lg mb-8 md:mb-12">
            Currently open for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          <a 
            href="mailto:yusuf@example.com"
            className="inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-10 md:py-5 rounded-full bg-blue-500 text-white text-lg md:text-xl font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)] mb-12 md:mb-16"
          >
            <FaEnvelope /> Say Hello
          </a>

          <div className="flex justify-center gap-4 md:gap-6">
            {[
              { icon: <FaGithub />, link: "https://github.com/YusufRamadani2025" },
              { icon: <FaLinkedin />, link: "https://linkedin.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
            ].map((social, i) => (
              <a 
                key={i}
                href={social.link}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xl md:text-2xl text-slate-900 dark:text-white transition-all hover:bg-blue-500 hover:border-blue-500 hover:-translate-y-2 hover:text-white dark:hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs md:text-sm border-t border-white/10 pt-8 md:pt-10">
          <p className="mb-4 md:mb-0">© 2026 Yusuf Ramadani. Built with React & Tailwind v4.</p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
