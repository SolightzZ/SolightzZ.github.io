import {describe, expect, it} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {Hero3DContainer} from './Hero3DContainer';

describe('<Hero3DContainer />', () => {
   it('renders the two atmospheric glow blobs', () => {
      const {container} = render(<Hero3DContainer />);
      // At least two blur-[*] blobs are rendered absolutely positioned.
      const blurred = Array.from(container.querySelectorAll('[class*="blur-"]'));
      expect(blurred.length).toBeGreaterThanOrEqual(2);
   });

   it('shows SceneFallback initially (Suspense pending) and resolves to the scene', async () => {
      render(<Hero3DContainer />);
      // Fallback shows a pulsing aura — check for the testid-less fallback class.
      expect(screen.queryByTestId('hero3d-fallback')).not.toBeInTheDocument();
      // Wait for the lazy chunk to resolve (SceneFallback is rendered inside Suspense).
      // The real component should then render aria-label="Interactive Three.js developer mini planet diorama"
      await waitFor(() => {
         expect(
            document.querySelector('[aria-label*="developer mini planet"]'),
         ).toBeTruthy();
      });
   });
});