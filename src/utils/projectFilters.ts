import { ProjectItem } from '../types/portfolio';

export const PROJECT_CATEGORIES = ['ALL', 'WEB', 'TOOLS'] as const;

const CATEGORY_KEYWORDS: Record<string, string[]> = {
   WEB: ['WEB', 'FULL-STACK'],
   TOOLS: ['TOOL', 'FONT TOOLING', 'DEVELOPER TOOL', 'MINECRAFT', 'DESKTOP'],
   MINECRAFT: ['MINECRAFT'],
   DESKTOP: ['DESKTOP'],
};

/**
 * Consolidate project matching / category checking into a single shared function
 */
export const matchesCategory = (project: ProjectItem, category: string): boolean => {
   if (!category || category === 'ALL') return true;
   if (category === 'FEATURED') return !!project.featured;

   const keywords = CATEGORY_KEYWORDS[category.toUpperCase()];
   if (!keywords) return true;

   const projectCat = (project.category || '').toUpperCase();
   return keywords.some((kw) => projectCat.includes(kw));
};

/**
 * Filter projects list by category and featured state
 */
export const filterProjects = (projects: ProjectItem[], category: string, featuredOnly = false, limit?: number): ProjectItem[] => {
   let list = featuredOnly ? projects.filter((p) => p.featured) : projects;
   if (limit && limit > 0) {
      list = list.slice(0, limit);
   }
   return list.filter((project) => matchesCategory(project, category));
};
