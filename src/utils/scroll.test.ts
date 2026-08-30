import {beforeEach, describe, expect, it, vi} from 'vitest';
import {scrollToSection, scrollToTop, getSectionTop} from './scroll';

describe('scroll utils', () => {
   beforeEach(() => {
      document.body.innerHTML = '';
   });

   describe('scrollToSection', () => {
      it('calls scrollIntoView on the matching element', () => {
         const el = document.createElement('div');
         el.id = 'hero';
         const spy = vi.spyOn(el, 'scrollIntoView').mockImplementation(() => {});
         document.body.appendChild(el);

         scrollToSection('hero');

         expect(spy).toHaveBeenCalledWith({behavior: 'smooth'});
      });

      it('is a no-op when the id does not exist', () => {
         const consoleErr = vi.spyOn(console, 'error').mockImplementation(() => {});
         expect(() => scrollToSection('nope')).not.toThrow();
         consoleErr.mockRestore();
      });
   });

   describe('scrollToTop', () => {
      it('calls window.scrollTo with top 0 and smooth behavior', () => {
         const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
         scrollToTop();
         expect(spy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
      });
   });

   describe('getSectionTop', () => {
      it('returns the offsetTop of the element', () => {
         const el = document.createElement('div');
         el.id = 'projects';
         Object.defineProperty(el, 'offsetTop', {configurable: true, value: 1234});
         document.body.appendChild(el);

         expect(getSectionTop('projects')).toBe(1234);
      });

      it('returns null when the element is missing', () => {
         expect(getSectionTop('does-not-exist')).toBeNull();
      });
   });
});