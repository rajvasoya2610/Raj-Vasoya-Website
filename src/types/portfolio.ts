export type Discipline = 'all' | 'art' | 'data' | 'engineering' | 'hybrid';

export interface StageDetails {
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  metrics?: { label: string; value: string; unit?: string }[];
  visualType: 'sketch' | 'data-chart' | 'cad-model';
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: Discipline;
  summary: string;
  heroImage: string;
  impactMetrics: { label: string; value: string }[];
  sketchStage: StageDetails;
  dataStage: StageDetails;
  cadStage: StageDetails;
  toolsUsed: string[];
  featured: boolean;
  completionDate: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  discipline: 'art' | 'data' | 'engineering' | 'hybrid';
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  link?: string;
  githubUrl?: string;
  highlights: string[];
  featured?: boolean;
}

export interface PersonalInfo {
  name: string;
  roleTitle: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  availableForHire: boolean;
}

export interface SkillCategory {
  name: string;
  discipline: 'art' | 'data' | 'engineering' | 'hybrid';
  icon: string;
  skills: { name: string; level: number; highlight?: boolean }[];
  description: string;
}
