import React from 'react';
import type { PersonalInfo } from '../types/portfolio.ts';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Sparkles,
  Globe,
  Heart,
  Code
} from 'lucide-react';

interface FooterProps {
  personalInfo: PersonalInfo;
  onOpenDeployModal: () => void;
  onOpenEditorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  personalInfo,
  onOpenDeployModal,
  onOpenEditorModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-[#07080d] pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-[#0c0e17] rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-cyan-400 font-mono text-xs">
                  AV
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {personalInfo.tagline}. Integrating human aesthetic sensibility, empirical numerical validation, and production-grade CAD engineering.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-400">
                {personalInfo.availableForHire ? 'Available for select hybrid engineering & design roles' : 'Busy with projects'}
              </span>
            </div>
          </div>

          {/* Quick links & GitHub.io Deployment */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Hosting & Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDeployModal}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Pages Deployment Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEditorModal}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" />
                  No-Code Project Manager
                </button>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-purple-400 transition-colors">
                  3-Stage Case Studies
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-purple-400 transition-colors">
                  Pillar Explorations
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Connect Directly
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 pt-2 text-slate-400">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            Built with React, TypeScript & Tailwind CSS • Optimized for free <strong>github.io</strong> hosting.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
