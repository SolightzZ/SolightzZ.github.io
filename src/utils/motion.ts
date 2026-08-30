export const prefersReducedMotion = (): boolean => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Ultra-smooth Apple / Linear cubic-bezier easing curve
 */
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];
