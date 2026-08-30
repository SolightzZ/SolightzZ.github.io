import {act, renderHook} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useActiveSection} from './useActiveSection';

vi.mock('../utils/scroll', () => ({
  getSectionTop: vi.fn((id: string) => {
    const map: Record<string, number> = {
      projects: 500,
      experience: 1500,
      stack: 2500,
      about: 3500,
      contact: 4500,
    };
    return map[id] ?? null;
  }),
}));

describe('useActiveSection', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns empty string when scrolled near the top', async () => {
    window.scrollY = 0;
    const {result} = renderHook(() => useActiveSection());

    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(result.current).toBe('');
  });

  it('activates the projects section when scrolled past its offset', async () => {
    window.scrollY = 1000;
    const {result} = renderHook(() => useActiveSection());

    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(result.current).toBe('projects');
  });

  it('activates a deeper section when scrolled further', async () => {
    window.scrollY = 3000;
    const {result} = renderHook(() => useActiveSection());

    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(result.current).toBe('stack');
  });

  it('removes scroll listeners on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const {unmount} = renderHook(() => useActiveSection());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});