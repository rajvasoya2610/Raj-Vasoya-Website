import React, { useState } from 'react';
import type { PersonalInfo, ProjectItem, Discipline } from '../types/portfolio.ts';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  Edit3,
  Sparkles,
  Layers,
  Save,
  PenTool,
  LineChart,
  Cpu
} from 'lucide-react';
import { validateNewProject } from '../utils/portfolioLogic.ts';

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

export const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
  onUpdatePersonalInfo,
  projects,
  onAddProject,
  onDeleteProject
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'add-project' | 'manage-projects' | 'export'>('info');

  // Form states
  const [tempInfo, setTempInfo] = useState<PersonalInfo>(personalInfo);
  const [newTitle, setNewTitle] = useState('');
  const [newDiscipline, setNewDiscipline] = useState<Discipline>('engineering');
  const [newSummary, setNewSummary] = useState('');
  const [newTags, setNewTags] = useState('CAD, SolidWorks, Prototyping');
  const [newHighlights, setNewHighlights] = useState('0.01mm tolerance, CNC machined');
  const [newThumbnail, setNewThumbnail] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80');

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePersonalInfo(tempInfo);
    setSuccessMsg('Personal details saved and applied live!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate: Partial<ProjectItem> = {
      title: newTitle,
      discipline: newDiscipline as 'art' | 'data' | 'engineering' | 'hybrid',
      summary: newSummary
    };

    const validation = validateNewProject(candidate);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    const created: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      discipline: newDiscipline as 'art' | 'data' | 'engineering' | 'hybrid',
      summary: newSummary.trim(),
      description: newSummary.trim(),
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      highlights: newHighlights.split(',').map(h => h.trim()).filter(Boolean),
      thumbnail: newThumbnail.trim() || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    };

    onAddProject(created);
    setFormErrors([]);
    setSuccessMsg(`Project "${created.title}" successfully added!`);
    // Reset inputs
    setNewTitle('');
    setNewSummary('');
    setTimeout(() => {
      setSuccessMsg(null);
      setActiveTab('manage-projects');
    }, 1500);
  };

  const generateExportCode = () => {
    return `// Updated Portfolio Data
export const personalInfo = ${JSON.stringify(tempInfo, null, 2)};

export const projects = ${JSON.stringify(projects, null, 2)};
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e111d] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              No-Code Content Manager
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Customize Your Portfolio
            </h2>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'info'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('add-project')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'add-project'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            + Add New Project
          </button>
          <button
            onClick={() => setActiveTab('manage-projects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'manage-projects'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manage Existing ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'export'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Export / Copy Code
          </button>
        </div>

        {/* Success notification */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        {/* TAB 1: Personal Info */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name:</label>
                <input
                  type="text"
                  value={tempInfo.name}
                  onChange={e => setTempInfo({ ...tempInfo, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Role Title:</label>
                <input
                  type="text"
                  value={tempInfo.roleTitle}
                  onChange={e => setTempInfo({ ...tempInfo, roleTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Central Value Headline:</label>
              <input
                type="text"
                value={tempInfo.tagline}
                onChange={e => setTempInfo({ ...tempInfo, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Bio / Philosophy:</label>
              <textarea
                rows={3}
                value={tempInfo.bio}
                onChange={e => setTempInfo({ ...tempInfo, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address:</label>
                <input
                  type="email"
                  value={tempInfo.email}
                  onChange={e => setTempInfo({ ...tempInfo, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Profile URL:</label>
                <input
                  type="url"
                  value={tempInfo.github}
                  onChange={e => setTempInfo({ ...tempInfo, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile URL:</label>
                <input
                  type="url"
                  value={tempInfo.linkedin}
                  onChange={e => setTempInfo({ ...tempInfo, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/30"
              >
                <Save className="w-4 h-4" />
                Apply Changes Live
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Add New Project */}
        {activeTab === 'add-project' && (
          <form onSubmit={handleCreateProject} className="space-y-4">
            {formErrors.length > 0 && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs space-y-1">
                {formErrors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Ergonomic Drone Gimbal"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Discipline Category:</label>
                <select
                  value={newDiscipline}
                  onChange={e => setNewDiscipline(e.target.value as Discipline)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="art">🎨 Sketch Art</option>
                  <option value="data">📊 Data Analytics</option>
                  <option value="engineering">⚙️ Design Engineering</option>
                  <option value="hybrid">🌌 Multi-Discipline Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Project Summary / Overview:</label>
              <textarea
                rows={3}
                placeholder="Explain the problem, process, and outcome in 1-3 sentences..."
                value={newSummary}
                onChange={e => setNewSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tags (comma separated):
                </label>
                <input
                  type="text"
                  placeholder="SolidWorks, DFM, FEA"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Highlights / Metrics (comma separated):
                </label>
                <input
                  type="text"
                  placeholder="38% mass reduction, ±0.01mm tolerance"
                  value={newHighlights}
                  onChange={e => setNewHighlights(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Image URL:</label>
              <input
                type="url"
                placeholder="https://..."
                value={newThumbnail}
                onChange={e => setNewThumbnail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono text-xs"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/30"
              >
                <Plus className="w-4 h-4" />
                Add to Portfolio
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Manage Existing Projects */}
        {activeTab === 'manage-projects' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-2">
              Click the trash icon to remove any project. Changes update live immediately!
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {projects.map(p => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                      <span className="text-xs text-purple-400 font-mono uppercase font-bold">
                        {p.discipline}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${p.title}"?`)) {
                        onDeleteProject(p.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-950/40 border border-red-800/60 text-red-400 hover:bg-red-900/60 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Export / Copy Code */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-300">
                You can copy this JSON/TypeScript data to paste into <code className="text-purple-300 font-mono">src/data/portfolioData.ts</code>, or keep it as a backup!
              </p>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs text-slate-300 max-h-72 overflow-y-auto">
              <pre>{generateExportCode()}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
