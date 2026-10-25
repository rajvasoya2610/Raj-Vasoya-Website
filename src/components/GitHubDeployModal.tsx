import React, { useState } from 'react';
import {
  X,
  Github,
  Globe,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Terminal,
  Sparkles,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { generateGitHubWorkflowYaml } from '../utils/portfolioLogic.ts';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [githubUsername, setGithubUsername] = useState('yourname');
  const [repoType, setRepoType] = useState<'user-site' | 'project-site'>('user-site');
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const repoName = repoType === 'user-site' ? `${githubUsername}.github.io` : 'my-hybrid-portfolio';
  const siteUrl = repoType === 'user-site' ? `https://${githubUsername}.github.io` : `https://${githubUsername}.github.io/my-hybrid-portfolio`;
  const workflowYaml = generateGitHubWorkflowYaml(repoName);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2500);
  };

  const downloadWorkflowFile = () => {
    const blob = new Blob([workflowYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deploy.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d101d] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Beginner-Friendly Free Hosting Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Deploy Free to GitHub Pages (github.io)
            </h2>
          </div>
        </div>

        {/* Quick URL Calculator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-8">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
            Step 0: Choose Your Website Address
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Enter your GitHub Username:</label>
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm">
                <Github className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={githubUsername}
                  onChange={e => setGithubUsername(e.target.value.trim().toLowerCase() || 'yourname')}
                  placeholder="yourname"
                  className="bg-transparent border-none text-white focus:outline-none w-full font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Your Future Free Website Link:</label>
              <div className="flex items-center justify-between rounded-xl bg-purple-950/40 border border-purple-500/40 px-3 py-2 text-sm text-purple-300 font-mono overflow-x-auto">
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate font-semibold">{siteUrl}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(siteUrl, 'url')}
                  className="ml-2 text-xs text-purple-300 hover:text-white p-1"
                  title="Copy URL"
                >
                  {copiedStep === 'url' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step Deployment Walkthrough */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-400 font-mono font-bold flex items-center justify-center shrink-0 border border-purple-500/40">
              1
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-base font-bold text-white">
                Create a New Repository on GitHub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-purple-400 underline font-semibold">github.com/new</a> and create a public repository.
              </p>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-emerald-300 flex items-center justify-between">
                <span>Repository Name: <strong>{repoName}</strong> (Must be <strong>Public</strong>)</span>
                <button
                  onClick={() => copyToClipboard(repoName, 'reponame')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedStep === 'reponame' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 border border-cyan-500/40">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-base font-bold text-white">
                Upload or Push Your Portfolio Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You can push using git in your terminal or use GitHub's web file uploader. If using Git, run:
              </p>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto relative group">
                <pre>{`git init
git add .
git commit -m "feat: initial hybrid portfolio release"
git branch -M main
git remote add origin https://github.com/${githubUsername}/${repoName}.git
git push -u origin main`}</pre>
                <button
                  onClick={() => copyToClipboard(`git init\ngit add .\ngit commit -m "feat: initial hybrid portfolio release"\ngit branch -M main\ngit remote add origin https://github.com/${githubUsername}/${repoName}.git\ngit push -u origin main`, 'git')}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  {copiedStep === 'git' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0 border border-amber-500/40">
              3
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white">
                  Add GitHub Actions Auto-Deploy File
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadWorkflowFile}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download deploy.yml
                  </button>
                  <button
                    onClick={() => copyToClipboard(workflowYaml, 'yaml')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs text-white font-medium transition-colors"
                  >
                    {copiedStep === 'yaml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Workflow
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Save this file inside your repo as <code className="text-amber-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">.github/workflows/deploy.yml</code>. Includes automatic fallback installation so it runs smoothly whether or not a lockfile is committed!
              </p>
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-400 max-h-36 overflow-y-auto">
                <pre>{workflowYaml}</pre>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 border border-emerald-500/40">
              4
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Enable GitHub Pages in Repo Settings
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Required
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In your GitHub repository:
              </p>
              <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-1.5 pl-1">
                <li>Click the <strong>Settings</strong> tab at the top of your GitHub repository.</li>
                <li>In the left sidebar, click <strong>Pages</strong>.</li>
                <li>Under <strong>Build and deployment &gt; Source</strong>: change dropdown from <em>"Deploy from a branch"</em> to <strong>GitHub Actions</strong>.</li>
                <li>Go to the <strong>Actions</strong> tab and re-run your failed workflow.</li>
                <li>Done! Your portfolio is live at <span className="text-emerald-400 font-mono font-semibold">{siteUrl}</span>.</li>
              </ol>
              <div className="mt-2 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
                <strong>⚠️ Why did you get "Error: Get Pages site failed"?</strong> This error only happens if Step 4 hasn't been switched to <strong>GitHub Actions</strong> yet in Settings. As soon as you select GitHub Actions, the API activates and deploys automatically!
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Need to add a custom domain (like yourname.com)? You can add it in Settings &gt; Pages &gt; Custom Domain for free!</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-colors"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
};
