import React, { Suspense, lazy } from 'react';
import { SceneFallback } from './SceneFallback';

const Hero3DScene = lazy(() =>
   import('./Hero3DScene').then((m) => ({ default: m.Hero3DScene }))
);

/**
 * Container for the 3D Mini Developer Planet hero experience.
 * Scene is lazy-loaded so Three.js stays out of the initial bundle; the
 * Suspense fallback matches the scene's own loading placeholder (no flash).
 */
export const Hero3DContainer: React.FC = () => {
   return (
      <div className="relative w-full h-full flex items-center justify-center select-none">
         {/* Atmospheric Ambient Glows */}
         <div className="absolute w-[360px] sm:w-[480px] lg:w-[560px] h-[360px] sm:h-[480px] lg:h-[560px] rounded-full bg-[#38BDF8]/10 blur-[90px] pointer-events-none -z-10" />
         <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-[#2563EB]/15 blur-[60px] pointer-events-none -z-10 translate-y-12" />

         {/* 3D Scene Root */}
         <div className="relative w-full h-full flex items-center justify-center bg-transparent">
            <Suspense fallback={<SceneFallback />}>
               <Hero3DScene className="!bg-transparent" />
            </Suspense>
         </div>
      </div>
   );
};
