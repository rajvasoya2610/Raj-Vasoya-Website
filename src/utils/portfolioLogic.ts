import type { CaseStudy, ProjectItem, Discipline, PersonalInfo } from '../types/portfolio.ts';

export interface HybridStats {
  totalCaseStudies: number;
  totalProjects: number;
  artCount: number;
  dataCount: number;
  engCount: number;
  hybridCount: number;
  distinctTags: string[];
}

/**
 * Filter projects by discipline tab and optional search query or tag
 */
export function filterProjects(
  projects: ProjectItem[],
  discipline: Discipline = 'all',
  searchQuery: string = '',
  activeTag: string | null = null
): ProjectItem[] {
  return projects.filter(project => {
    // Discipline filter
    const matchesDiscipline =
      discipline === 'all' ||
      project.discipline === discipline ||
      (discipline === 'hybrid' && project.discipline === 'hybrid');

    if (!matchesDiscipline) return false;

    // Tag filter
    if (activeTag && !project.tags.includes(activeTag)) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSummary = project.summary.toLowerCase().includes(q);
      const matchTags = project.tags.some(t => t.toLowerCase().includes(q));
      const matchHighlights = project.highlights.some(h => h.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchTags || matchHighlights;
    }

    return true;
  });
}

/**
 * Filter case studies by active discipline
 */
export function filterCaseStudies(
  studies: CaseStudy[],
  discipline: Discipline = 'all',
  searchQuery: string = ''
): CaseStudy[] {
  return studies.filter(study => {
    const matchesDiscipline =
      discipline === 'all' ||
      study.category === discipline ||
      discipline === 'hybrid'; // Hybrid shows all 3-stage case studies

    if (!matchesDiscipline) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = study.title.toLowerCase().includes(q);
      const matchSubtitle = study.subtitle.toLowerCase().includes(q);
      const matchTools = study.toolsUsed.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchTools;
    }

    return true;
  });
}

/**
 * Calculate aggregate portfolio stats
 */
export function calculateHybridStats(
  caseStudies: CaseStudy[],
  projects: ProjectItem[]
): HybridStats {
  const allTags = new Set<string>();

  let artCount = 0;
  let dataCount = 0;
  let engCount = 0;
  let hybridCount = 0;

  for (const s of caseStudies) {
    if (s.category === 'art') artCount++;
    else if (s.category === 'data') dataCount++;
    else if (s.category === 'engineering') engCount++;
    else hybridCount++;

    s.toolsUsed.forEach(t => allTags.add(t));
    s.sketchStage.tags.forEach(t => allTags.add(t));
    s.dataStage.tags.forEach(t => allTags.add(t));
    s.cadStage.tags.forEach(t => allTags.add(t));
  }

  for (const p of projects) {
    if (p.discipline === 'art') artCount++;
    else if (p.discipline === 'data') dataCount++;
    else if (p.discipline === 'engineering') engCount++;
    else hybridCount++;

    p.tags.forEach(t => allTags.add(t));
  }

  return {
    totalCaseStudies: caseStudies.length,
    totalProjects: projects.length,
    artCount,
    dataCount,
    engCount,
    hybridCount,
    distinctTags: Array.from(allTags).sort()
  };
}

/**
 * Generates ready-to-copy GitHub Actions deploy.yml file content
 * for automatic GitHub Pages deployment.
 */
export function generateGitHubWorkflowYaml(repoName: string = ''): string {
  return `name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: |
          if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then
            npm ci --legacy-peer-deps || npm install --legacy-peer-deps
          elif [ -f yarn.lock ]; then
            corepack enable && yarn install --frozen-lockfile || yarn install
          elif [ -f pnpm-lock.yaml ]; then
            corepack enable && pnpm install --frozen-lockfile || pnpm install
          else
            npm install --legacy-peer-deps
          fi

      - name: Build Application
        run: |
          npm run build
          touch dist/.nojekyll

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          enablement: true

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
}

/**
 * Validates a newly submitted project
 */
export function validateNewProject(project: Partial<ProjectItem>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!project.title || project.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long.');
  }
  if (!project.summary || project.summary.trim().length < 5) {
    errors.push('Summary must be at least 5 characters long.');
  }
  if (!project.discipline) {
    errors.push('Discipline category is required.');
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
