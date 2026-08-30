import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

vi.mock('../../three/Hero3DScene', () => ({
   Hero3DScene: () => <div data-testid="hero3d-scene-mock" aria-label="Interactive Three.js developer mini planet diorama" />,
}));
vi.mock('../../three/SceneFallback', () => ({
   SceneFallback: () => <div data-testid="hero3d-fallback" />,
}));

import {HeroContainer} from './HeroContainer';

describe('<HeroContainer />', () => {
   it('renders the section with id="hero"', () => {
      render(<HeroContainer />);
      const section = document.getElementById('hero');
      expect(section).toBeInTheDocument();
      expect(section!.tagName).toBe('SECTION');
   });

   it('renders the scroll-down indicator', () => {
      render(<HeroContainer />);
      // Thai label "เลื่อนลง" + Thai "เลื่อนเพื่อดูผลงาน"
      expect(screen.getByText(/เลื่อนลง/)).toBeInTheDocument();
      expect(screen.getByText(/เลื่อนเพื่อดูผลงาน/)).toBeInTheDocument();
   });

   it('renders the timezone indicator', () => {
      render(<HeroContainer />);
      expect(screen.getByText(/THAILAND BANGKOK/)).toBeInTheDocument();
   });

   it('calls onViewProjects when the scroll-down link is clicked', () => {
      const onViewProjects = vi.fn();
      render(<HeroContainer onViewProjects={onViewProjects} />);
      // Both bottom links forward to onViewProjects; click the right one.
      const link = screen.getByText(/เลื่อนลง/).closest('a')!;
      fireEvent.click(link);
      expect(onViewProjects).toHaveBeenCalled();
   });

   it('does not throw when clicking scroll indicators without callbacks', () => {
      render(<HeroContainer />);
      const link = screen.getByText(/เลื่อนลง/).closest('a')!;
      expect(() => fireEvent.click(link)).not.toThrow();
   });

   it('renders the 3D container wrapper (async lazy)', async () => {
      render(<HeroContainer />);
      await waitFor(() => {
         expect(
            document.querySelector('[aria-label*="developer mini planet"]'),
         ).toBeTruthy();
      });
   });
});