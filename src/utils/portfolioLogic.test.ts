import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterCaseStudies,
  calculateHybridStats,
  generateGitHubWorkflowYaml,
  validateNewProject
} from './portfolioLogic.ts';
import type { ProjectItem, CaseStudy } from '../types/portfolio.ts';

const mockProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Kinetic Monolith Study',
    discipline: 'art',
    summary: 'A charcoal hand drawing of sculptural architecture.',
    description: 'Long description of charcoal drawing.',
    tags: ['Charcoal', 'Architecture'],
    thumbnail: 'https://example.com/art.jpg',
    highlights: ['24 spreads']
  },
  {
    id: 'p2',
    title: 'Wind Turbine Telemetry',
    discipline: 'data',
    summary: 'SCADA sensor stress forecasting algorithm.',
    description: 'Python regression analysis.',
    tags: ['Python', 'Telemetry'],
    thumbnail: 'https://example.com/data.jpg',
    highlights: ['Cut downtime']
  },
  {
    id: 'p3',
    title: 'Cycloidal Actuator',
    discipline: 'engineering',
    summary: 'Precision 45:1 zero backlash robotic gearbox.',
    description: 'SolidWorks CAD assembly.',
    tags: ['SolidWorks', 'Robotics'],
    thumbnail: 'https://example.com/eng.jpg',
    highlights: ['180 Nm torque']
  }
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Aero Gimbal System',
    subtitle: 'From Sketches to Aluminum',
    category: 'hybrid',
    completionDate: '2026',
    featured: true,
    summary: 'Drone gimbal stabilizer.',
    heroImage: 'https://example.com/hero.jpg',
    impactMetrics: [{ label: 'Mass', value: '-38%' }],
    toolsUsed: ['Sketching', 'Python', 'SolidWorks'],
    sketchStage: {
      title: 'Vision',
      subtitle: 'Sketches',
      description: 'Drafts',
      keyPoints: ['point 1'],
      visualType: 'sketch',
      tags: ['Ideation']
    },
    dataStage: {
      title: 'Validation',
      subtitle: 'FEA',
      description: 'Stress models',
      keyPoints: ['point 2'],
      visualType: 'data-chart',
      tags: ['FEA']
    },
    cadStage: {
      title: 'Solution',
      subtitle: 'CAD Model',
      description: 'Precision CAD',
      keyPoints: ['point 3'],
      visualType: 'cad-model',
      tags: ['CAD']
    }
  }
];

test('filterProjects filters by discipline correctly', () => {
  const artOnly = filterProjects(mockProjects, 'art');
  assert.equal(artOnly.length, 1);
  assert.equal(artOnly[0].id, 'p1');

  const all = filterProjects(mockProjects, 'all');
  assert.equal(all.length, 3);
});

test('filterProjects filters by search query correctly', () => {
  const filtered = filterProjects(mockProjects, 'all', 'cycloidal');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].title, 'Cycloidal Actuator');
});

test('filterProjects filters by tag correctly', () => {
  const filtered = filterProjects(mockProjects, 'all', '', 'Telemetry');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'p2');
});

test('calculateHybridStats counts correctly', () => {
  const stats = calculateHybridStats(mockCaseStudies, mockProjects);
  assert.equal(stats.totalCaseStudies, 1);
  assert.equal(stats.totalProjects, 3);
  assert.equal(stats.artCount, 1);
  assert.equal(stats.dataCount, 1);
  assert.equal(stats.engCount, 1);
  assert.equal(stats.hybridCount, 1);
  assert.ok(stats.distinctTags.includes('Python'));
  assert.ok(stats.distinctTags.includes('Charcoal'));
});

test('generateGitHubWorkflowYaml outputs valid YAML structure with actions', () => {
  const yaml = generateGitHubWorkflowYaml('my-portfolio');
  assert.ok(yaml.includes('Deploy Portfolio to GitHub Pages'));
  assert.ok(yaml.includes('actions/checkout@v4'));
  assert.ok(yaml.includes('npm run build'));
  assert.ok(yaml.includes("path: './dist'"));
});

test('validateNewProject validates required fields', () => {
  const invalid = validateNewProject({ title: 'A' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 2);

  const valid = validateNewProject({
    title: 'Mechanical Wrist Actuator',
    summary: 'Precision linkage design with flexural compliance.',
    discipline: 'engineering'
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.errors.length, 0);
});
