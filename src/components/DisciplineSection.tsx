import React, { useState } from 'react';
import type { ProjectItem, Discipline } from '../types/portfolio.ts';
import { PILLARS_CONFIG } from '../data/portfolioData.ts';
import {
  PenTool,
  LineChart,
  Cpu,
  Search,
  ExternalLink,
  Tag,
  CheckCircle,
  Filter,
  Plus
} from 'lucide-react';

interface DisciplineSectionProps {
  activeDiscipline: Discipline;
  onSelectDiscipline: (d: Discipline) => void;
  projects: ProjectItem[];
  onOpenAddProjectModal: () => void;
}

export const DisciplineSection: React.FC<DisciplineSectionProps> = ({
  activeDiscipline,
  onSelectDiscipline,
  projects,
  onOpenAddProjectModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get active pillar details
  const activePillar = PILLARS_CONFIG.find(p => p.id === activeDiscipline);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesDiscipline =
      activeDiscipline === 'all' ||
      project.discipline === activeDiscipline ||
      (activeDiscipline === 'hybrid' && project.discipline === 'hybrid');

    if (!matchesDiscipline) return false;

    if (selectedTag && !project.tags.includes(selectedTag)) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return true;
  });

  // Extract all tags for active view
  const allTags = Array.from(
    new Set(
      projects
        .filter(p => activeDiscipline === 'all' || p.discipline === activeDiscipline)
        .flatMap(p => p.tags)
    )
  );

  return (
    <section id="disciplines" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs for the 3 Professions */}
        <div className="flex flex-col items-center mb-12">
          <div className="text-center max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-2">
              Three Distinct Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore By Core Discipline
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Recruiters and clients can examine individual disciplines in isolation, or see how they cross-pollinate.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-full overflow-x-auto">
            <button
              onClick={() => onSelectDiscipline('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                activeDiscipline === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🌌</span>
              All Disciplines
            </button>
            <button
              onClick={() => onSelectDiscipline('art')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                activeDiscipline === 'art'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Sketch Artist
            </button>
            <button
              onClick={() => onSelectDiscipline('data')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                activeDiscipline === 'data'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              Data Analytics
            </button>
            <button
              onClick={() => onSelectDiscipline('engineering')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                activeDiscipline === 'engineering'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Design Engineer
            </button>
          </div>
        </div>

        {/* Dedicated Pillar Header Banner when specific discipline is selected */}
        {activePillar && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl glow-card border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activePillar.color }}
                  ></span>
                  {activePillar.badge} • {activePillar.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {activePillar.headline}
                </h3>
                <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
                  {activePillar.description}
                </p>
              </div>

              {/* Core Skill Chips */}
              <div className="flex flex-wrap md:max-w-xs gap-1.5 self-start md:self-auto">
                {activePillar.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search, Tag Filtering, and "Add Project" Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tools..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Tags
            </button>
            {allTags.slice(0, 6).map((tag, i) => (
              <button
                key={i}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Add New Item Button (For Easy Editing) */}
          <button
            onClick={onOpenAddProjectModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 shrink-0 w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </button>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800/80 p-8">
            <p className="text-slate-400 text-sm">No projects match the current search filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                onSelectDiscipline('all');
              }}
              className="mt-3 text-xs text-purple-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const badgeColor =
                project.discipline === 'art'
                  ? 'text-purple-400 bg-purple-950/60 border-purple-800'
                  : project.discipline === 'data'
                  ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800'
                  : project.discipline === 'engineering'
                  ? 'text-amber-400 bg-amber-950/60 border-amber-800'
                  : 'text-indigo-400 bg-indigo-950/60 border-indigo-800';

              const disciplineLabel =
                project.discipline === 'art'
                  ? 'Sketch Art'
                  : project.discipline === 'data'
                  ? 'Data Analytics'
                  : project.discipline === 'engineering'
                  ? 'Design Engineering'
                  : 'Hybrid';

              return (
                <div
                  key={project.id}
                  className="glow-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-transparent to-transparent opacity-80"></div>
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeColor}`}
                    >
                      {disciplineLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-slate-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Highlights */}
                      <div className="mt-3 space-y-1.5">
                        {project.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags & Action */}
                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {project.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <a
                        href="#case-studies"
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        Inspect
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
