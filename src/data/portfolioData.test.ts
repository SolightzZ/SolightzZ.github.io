import {describe, expect, it} from 'vitest';
import {
   CERTIFICATES_DATA,
   EDUCATION_DATA,
   EXPERIENCE_DATA,
   PERSONAL_INFO,
   PROJECTS_DATA,
   TECH_CATEGORIES,
   SOCIAL_LINKS,
} from './portfolioData';

describe('portfolioData — PERSONAL_INFO', () => {
   it('has the required identity fields', () => {
      expect(PERSONAL_INFO.name).toBeTruthy();
      expect(PERSONAL_INFO.fullName).toBeTruthy();
      expect(PERSONAL_INFO.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(PERSONAL_INFO.github).toMatch(/^https:\/\/github\.com\//);
      expect(PERSONAL_INFO.role).toBeTruthy();
      expect(PERSONAL_INFO.university).toBeTruthy();
   });

   it('currentYear is a 4-digit year', () => {
      expect(PERSONAL_INFO.currentYear).toMatch(/^\d{4}$/);
   });
});

describe('portfolioData — PROJECTS_DATA', () => {
   it('every project has a unique id and slug', () => {
      const ids = new Set<string>();
      const slugs = new Set<string>();
      PROJECTS_DATA.forEach((p) => {
         expect(ids.has(p.id), `Duplicate id: ${p.id}`).toBe(false);
         ids.add(p.id);
         expect(slugs.has(p.slug), `Duplicate slug: ${p.slug}`).toBe(false);
         slugs.add(p.slug);
      });
   });

   it('every project has required fields', () => {
      PROJECTS_DATA.forEach((p) => {
         expect(p.title).toBeTruthy();
         expect(p.description).toBeTruthy();
         expect(p.category).toBeTruthy();
         expect(typeof p.featured).toBe('boolean');
         expect(Array.isArray(p.tags)).toBe(true);
      });
   });

   it('every githubUrl is a real github URL', () => {
      PROJECTS_DATA.forEach((p) => {
         expect(p.githubUrl, `${p.id} missing githubUrl`).toBeTruthy();
         expect(p.githubUrl).toMatch(/^https:\/\/github\.com\//);
      });
   });

   it('featured projects are a non-empty subset of all projects', () => {
      const featured = PROJECTS_DATA.filter((p) => p.featured);
      expect(featured.length).toBeGreaterThan(0);
      expect(featured.length).toBeLessThanOrEqual(PROJECTS_DATA.length);
   });

   it('slug matches id for every project', () => {
      PROJECTS_DATA.forEach((p) => {
         expect(p.slug).toBe(p.id);
      });
   });

   it('every project has a githubUrl (some may share a URL but none are empty)', () => {
      const urls = new Set<string>();
      PROJECTS_DATA.forEach((p) => {
         if (p.githubUrl) urls.add(p.githubUrl);
      });
      expect(urls.size).toBeGreaterThan(1);
   });
});

describe('portfolioData — EXPERIENCE_DATA', () => {
   it('has at least one entry with required fields', () => {
      expect(EXPERIENCE_DATA.length).toBeGreaterThan(0);
      EXPERIENCE_DATA.forEach((e) => {
         expect(e.company).toBeTruthy();
         expect(e.role).toBeTruthy();
         expect(e.period).toBeTruthy();
         expect(e.location).toBeTruthy();
         expect(Array.isArray(e.description)).toBe(true);
         expect(e.description.length).toBeGreaterThan(0);
         expect(Array.isArray(e.technologies)).toBe(true);
         expect(e.technologies.length).toBeGreaterThan(0);
      });
   });
});

describe('portfolioData — EDUCATION_DATA', () => {
   it('has at least one entry with required fields', () => {
      expect(EDUCATION_DATA.length).toBeGreaterThan(0);
      EDUCATION_DATA.forEach((e) => {
         expect(e.period).toBeTruthy();
         expect(e.institution).toBeTruthy();
         expect(e.degree).toBeTruthy();
      });
   });
});

describe('portfolioData — CERTIFICATES_DATA', () => {
   it('has at least one entry with required fields', () => {
      expect(CERTIFICATES_DATA.length).toBeGreaterThan(0);
      CERTIFICATES_DATA.forEach((c) => {
         expect(c.issuer).toBeTruthy();
         expect(c.title).toBeTruthy();
      });
   });
});

describe('portfolioData — TECH_CATEGORIES', () => {
   it('has categories with non-empty skills', () => {
      expect(TECH_CATEGORIES.length).toBeGreaterThan(0);
      TECH_CATEGORIES.forEach((cat) => {
         expect(cat.title).toBeTruthy();
         expect(cat.skills.length).toBeGreaterThan(0);
      });
   });

   it('every skill has a color and bgLight hex', () => {
      TECH_CATEGORIES.forEach((cat) => {
         cat.skills.forEach((s) => {
            expect(s.name).toBeTruthy();
            expect(s.color).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(s.bgLight).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(s.iconName).toBeTruthy();
         });
      });
   });

   it('skill names are unique within each category', () => {
      TECH_CATEGORIES.forEach((cat) => {
         const names = new Set<string>();
         cat.skills.forEach((s) => {
            expect(names.has(s.name), `Duplicate skill in ${cat.title}: ${s.name}`).toBe(false);
            names.add(s.name);
         });
      });
   });
});

describe('portfolioData — SOCIAL_LINKS', () => {
   it('every link has a label, href, and ariaLabel', () => {
      expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
      SOCIAL_LINKS.forEach((l) => {
         expect(l.label).toBeTruthy();
         expect(l.href).toBeTruthy();
         expect(l.ariaLabel).toBeTruthy();
      });
   });
});