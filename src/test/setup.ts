import '@testing-library/jest-dom/vitest';
import {cleanup} from '@testing-library/react';
import {afterEach, vi} from 'vitest';

class IntersectionObserverMock implements IntersectionObserver {
   readonly root: Element | Document | null = null;
   readonly rootMargin = '';
   readonly thresholds: ReadonlyArray<number> = [];
   observe(): void {}
   unobserve(): void {}
   disconnect(): void {}
   takeRecords(): IntersectionObserverEntry[] {
      return [];
   }
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
   globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
}

if (typeof window !== 'undefined' && !('scrollIntoView' in Element.prototype)) {
   Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: vi.fn(),
   });
}

afterEach(() => {
   cleanup();
});