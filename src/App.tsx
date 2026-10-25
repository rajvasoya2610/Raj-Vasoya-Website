import React, { useState } from 'react';
import type { PersonalInfo, ProjectItem, Discipline, CaseStudy } from './types/portfolio.ts';
import {
  INITIAL_PERSONAL_INFO,
  INITIAL_CASE_STUDIES,
  INITIAL_STANDALONE_PROJECTS
} from './data/portfolioData.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CaseStudyExplorer } from './components/CaseStudyExplorer.tsx';
import { DisciplineSection } from './components/DisciplineSection.tsx';
import { AboutProcess } from './components/AboutProcess.tsx';
import { Footer } from './components/Footer.tsx';
import { GitHubDeployModal } from './components/GitHubDeployModal.tsx';
import { PortfolioEditorModal } from './components/PortfolioEditorModal.tsx';
import { Sparkles, X, Github, Edit3 } from 'lucide-react';

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(INITIAL_PERSONAL_INFO);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_STANDALONE_PROJECTS);
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>('all');

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  // Handlers for dynamic no-code additions & edits
  const handleAddProject = (newProj: ProjectItem) => {
    setProjects(prev => [newProj, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Helper Banner for the user */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-purple-500/30 px-4 py-2.5 text-xs text-slate-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-purple-500/20 text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span>
                <strong>Beginner Friendly Setup:</strong> Easily customize projects, or get complete step-by-step instructions to deploy free on <strong>yourname.github.io</strong>!
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors flex items-center gap-1"
              >
                <Github className="w-3 h-3" />
                Deploy Guide
              </button>
              <button
                onClick={() => setIsEditorModalOpen(true)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-purple-300 font-medium transition-colors flex items-center gap-1 border border-slate-700"
              >
                <Edit3 className="w-3 h-3" />
                Edit Content
              </button>
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar with the 3 Distinct Discipline Tabs */}
      <Navbar
        personalInfo={personalInfo}
        activeDiscipline={activeDiscipline}
        onSelectDiscipline={setActiveDiscipline}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenEditorModal={() => setIsEditorModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Cosmic Glow Arc and Orbital Radar */}
        <Hero
          personalInfo={personalInfo}
          activeDiscipline={activeDiscipline}
          onSelectDiscipline={setActiveDiscipline}
          onOpenDeployModal={() => setIsDeployModalOpen(true)}
          onOpenEditorModal={() => setIsEditorModalOpen(true)}
        />

        {/* Featured 3-Stage Case Studies: [Sketch] -> [Data] -> [CAD] */}
        <CaseStudyExplorer caseStudies={caseStudies} />

        {/* 3 Pillar Sections: Sketch Art, Data Analytics, Design Engineering */}
        <DisciplineSection
          activeDiscipline={activeDiscipline}
          onSelectDiscipline={setActiveDiscipline}
          projects={projects}
          onOpenAddProjectModal={() => setIsEditorModalOpen(true)}
        />

        {/* Core Value Narrative & Skills Matrix */}
        <AboutProcess />
      </main>

      {/* Footer */}
      <Footer
        personalInfo={personalInfo}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenEditorModal={() => setIsEditorModalOpen(true)}
      />

      {/* GitHub.io Deployment Guide Modal */}
      <GitHubDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* No-Code In-App Content Manager Modal */}
      <PortfolioEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        projects={projects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
