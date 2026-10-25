import React from 'react';
import type { PersonalInfo, Discipline } from '../types/portfolio.ts';
import {
  Github,
  Linkedin,
  Instagram,
  Edit3,
  Globe,
  Sparkles,
  Layers,
  Compass,
  Code
} from 'lucide-react';

interface NavbarProps {
  personalInfo: PersonalInfo;
  activeDiscipline: Discipline;
  onSelectDiscipline: (d: Discipline) => void;
  onOpenDeployModal: () => void;
  onOpenEditorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  personalInfo,
  activeDiscipline,
  onSelectDiscipline,
  onOpenDeployModal,
  onOpenEditorModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090A0F]/80 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0c0e17] rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-cyan-400 font-mono text-sm">
              AV
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-white tracking-tight block">
              {personalInfo.name}
            </span>
            <span className="text-[11px] font-mono text-slate-400 block -mt-0.5">
              Hybrid Polymath
            </span>
          </div>
        </a>

        {/* Center: Pill Navigation Tabs (from user brief & Image 1) */}
        <nav className="flex items-center bg-slate-900/90 border border-slate-800/90 rounded-full p-1 shadow-lg max-w-full overflow-x-auto">
          <a
            href="#about"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            About & Process
          </a>

          {/* Three distinct discipline tabs requested by user */}
          <button
            onClick={() => onSelectDiscipline('art')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeDiscipline === 'art'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎨 Art
          </button>
          <button
            onClick={() => onSelectDiscipline('data')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeDiscipline === 'data'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Data
          </button>
          <button
            onClick={() => onSelectDiscipline('engineering')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeDiscipline === 'engineering'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Engineering
          </button>

          <a
            href="#case-studies"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-colors hidden md:block"
          >
            Case Studies
          </a>
        </nav>

        {/* Right: Actions & Social */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* GitHub.io Deployment Guide button */}
          <button
            onClick={onOpenDeployModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition-colors shadow-sm"
            title="Deploy to GitHub Pages"
          >
            <Github className="w-3.5 h-3.5 text-purple-400" />
            <span>Deploy github.io</span>
          </button>

          {/* Customize / Edit items button */}
          <button
            onClick={onOpenEditorModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all hover:scale-105"
            title="Add or edit projects without coding"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Portfolio</span>
          </button>

          {/* Social Links */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-800 text-slate-400">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
