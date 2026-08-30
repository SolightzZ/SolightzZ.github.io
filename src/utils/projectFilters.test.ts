import {describe, expect, it} from 'vitest';
import {PROJECT_CATEGORIES, filterProjects, matchesCategory} from './projectFilters';
import type {ProjectItem} from '../types/portfolio';

const makeProject = (overrides: Partial<ProjectItem> = {}): ProjectItem => ({
  id: 'p1',
  slug: 'sample',
  title: 'Sample',
  description: '',
  tags: [],
  category: 'WEB',
  featured: false,
  ...overrides,
});

describe('matchesCategory', () => {
  it('returns true for ALL or empty category', () => {
    expect(matchesCategory(makeProject(), 'ALL')).toBe(true);
    expect(matchesCategory(makeProject(), '')).toBe(true);
  });

  it('matches by featured flag when category is FEATURED', () => {
    expect(matchesCategory(makeProject({featured: true}), 'FEATURED')).toBe(true);
    expect(matchesCategory(makeProject({featured: false}), 'FEATURED')).toBe(false);
  });

  it('matches by category keyword for WEB', () => {
    expect(matchesCategory(makeProject({category: 'WEB'}), 'WEB')).toBe(true);
    expect(matchesCategory(makeProject({category: 'FULL-STACK'}), 'WEB')).toBe(true);
    expect(matchesCategory(makeProject({category: 'TOOL'}), 'WEB')).toBe(false);
  });

  it('matches by category keyword for TOOLS', () => {
    expect(matchesCategory(makeProject({category: 'TOOL'}), 'TOOLS')).toBe(true);
    expect(matchesCategory(makeProject({category: 'MINECRAFT'}), 'TOOLS')).toBe(true);
    expect(matchesCategory(makeProject({category: 'DESKTOP'}), 'TOOLS')).toBe(true);
    expect(matchesCategory(makeProject({category: 'WEB'}), 'TOOLS')).toBe(false);
  });

  it('returns true for unknown categories (safe default)', () => {
    expect(matchesCategory(makeProject(), 'UNKNOWN')).toBe(true);
  });

  it('is case-insensitive on the category argument', () => {
    expect(matchesCategory(makeProject({category: 'web'}), 'WEB')).toBe(true);
  });
});

describe('filterProjects', () => {
  const projects: ProjectItem[] = [
    makeProject({id: '1', category: 'WEB', featured: true}),
    makeProject({id: '2', category: 'WEB', featured: false}),
    makeProject({id: '3', category: 'TOOL', featured: false}),
    makeProject({id: '4', category: 'MINECRAFT', featured: true}),
  ];

  it('exports the expected categories', () => {
    expect(PROJECT_CATEGORIES).toEqual(['ALL', 'WEB', 'TOOLS']);
  });

  it('filters by category only', () => {
    expect(filterProjects(projects, 'WEB').map((p) => p.id)).toEqual(['1', '2']);
    expect(filterProjects(projects, 'TOOLS').map((p) => p.id)).toEqual(['3', '4']);
  });

  it('returns all projects for ALL', () => {
    expect(filterProjects(projects, 'ALL')).toHaveLength(4);
  });

  it('filters featured only when requested', () => {
    expect(filterProjects(projects, 'ALL', true).map((p) => p.id)).toEqual(['1', '4']);
  });

  it('applies a positive limit before category filtering', () => {
    expect(filterProjects(projects, 'ALL', false, 2).map((p) => p.id)).toEqual(['1', '2']);
  });

  it('ignores non-positive limits', () => {
    expect(filterProjects(projects, 'ALL', false, 0)).toHaveLength(4);
    expect(filterProjects(projects, 'ALL', false, -3)).toHaveLength(4);
  });
});