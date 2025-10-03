'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Dither to avoid SSR issues with Three.js
const Dither = dynamic(() => import('./Dither'), { ssr: false });

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      {/* Main content box with dither background */}
      <div className="relative w-full max-w-6xl border-2 border-white p-8 md:p-12 overflow-hidden">
        {/* Dither background contained within this box */}
        <div className="absolute inset-0 w-full h-full">
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
            pixelSize={2}
          />
        </div>
        
        {/* Flexbox container for vertical layout */}
        <div className="relative z-10 flex flex-col min-h-[60vh]">
          
          {/* Navigation tabs at top */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs tracking-wider pb-8 border-b border-white/20">
            <a href="#current-work" className="hover:opacity-60 transition-opacity">
              CURRENT WORK
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#past-life" className="hover:opacity-60 transition-opacity">
              PAST LIFE
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#future" className="hover:opacity-60 transition-opacity">
              FUTURE
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#directions" className="hover:opacity-60 transition-opacity">
              DIRECTIONS
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#passions" className="hover:opacity-60 transition-opacity">
              PASSIONS
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#writings" className="hover:opacity-60 transition-opacity">
              WRITINGS
            </a>
          </nav>

          {/* Center name with star - flex-grow centers it vertically */}
          <div className={`flex-grow flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic flex items-center gap-3 md:gap-4">
              <span>Sutharsika</span>
              <span className="text-3xl md:text-5xl lg:text-6xl">★</span>
              <span>Kumar</span>
            </h1>
          </div>

          {/* Social links at bottom */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs tracking-wider pt-8 border-t border-white/20">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              TWITTER
            </a>
            <span className="hidden md:inline">•</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              LINKEDIN
            </a>
            <span className="hidden md:inline">•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              GITHUB
            </a>
          </nav>
          
        </div>
      </div>
    </section>
  );
}