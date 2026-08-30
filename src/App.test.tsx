import {describe, expect, it, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';

vi.mock('./components/three/Hero3DScene', () => ({
   Hero3DScene: () => <div data-testid="hero3d-mock" />,
}));
vi.mock('./components/three/SceneFallback', () => ({
   SceneFallback: () => <div data-testid="hero3d-fallback" />,
}));

import App from './App';

describe('<App /> — orchestration', () => {
   beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
      Element.prototype.scrollIntoView = vi.fn();
      window.scrollTo = vi.fn();
   });

   it('renders the page shell with header, main, footer', () => {
      render(<App />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
   });

   it('renders all six section ids', () => {
      render(<App />);
      ['hero', 'projects', 'experience', 'stack', 'about', 'contact'].forEach((id) => {
         expect(document.getElementById(id)).toBeInTheDocument();
      });
   });

   it('does not render any modal dialogs initially', () => {
      render(<App />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
   });
});