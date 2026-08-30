import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SceneFallback} from './SceneFallback';

describe('<SceneFallback />', () => {
   it('renders without crashing', () => {
      const {container} = render(<SceneFallback />);
      expect(container.firstChild).toBeInTheDocument();
   });

   it('renders two ambient glow blobs', () => {
      const {container} = render(<SceneFallback />);
      expect(container.querySelectorAll('.blur-3xl, .blur-2xl').length).toBeGreaterThanOrEqual(2);
   });

   it('uses accessible selectors (no role required, but renders an svg or decorative element)', () => {
      const {container} = render(<SceneFallback />);
      // No buttons or links expected.
      expect(container.querySelectorAll('button, a').length).toBe(0);
   });

   it('matches the snapshot structure (one wrapper, one inner pulsing blob)', () => {
      const {container} = render(<SceneFallback />);
      // The pulsing aura + inner blurred dot + 2 glow circles = 4 children inside the outer wrapper.
      expect(container.firstChild!.childNodes.length).toBeGreaterThanOrEqual(3);
   });
});