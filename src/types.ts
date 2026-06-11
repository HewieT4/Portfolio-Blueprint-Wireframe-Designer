export type ViewMode = 'wireframe' | 'mockup';
export type ViewportSize = 'desktop' | 'tablet' | 'mobile';
export type ActiveTab = 'inspector' | 'architecture' | 'tokens' | 'flowchart';

export type SectionId = 'header' | 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

export interface FunctionalityMap {
  trigger: string;
  action: string;
  behavior: string;
}

export interface DesignTokenMap {
  layout: string;
  padding: string;
  typography: string;
  colors: string;
  animations: string;
}

export interface PortfolioSection {
  id: SectionId;
  name: string;
  title: string;
  concept: string;
  overview: string;
  functionalities: FunctionalityMap[];
  designTokens: DesignTokenMap;
  codeSnippet: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  mockImage: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}
