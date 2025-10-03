'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Dither = dynamic(() => import('@/components/Dither'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-black py-100 px-100">
      <div className="flex items-center justify-center">
        <div 
          className="relative w-full max-w-6xl h-[600px] border border-white mt-10"
        >
          <div className="absolute inset-0 w-full h-full">
            <Dither
              waveColor={[0.5, 0.5, 0.5]}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.1}
              pixelSize={2}
            />
          </div>

          <a 
            href="#content" 
            className="absolute top-4 left-0 right-0 z-20 text-center text-white text-sm uppercase tracking-wider hover:underline"
          >
            CURRENT WORK • PAST LIFE • FUTURE DIRECTION • PASSIONS • WRITING
          </a>
          
          <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic flex items-center gap-3 md:gap-4">
              <span>Sutharsika</span>
              <span className="text-3xl md:text-4xl lg:text-5xl">★</span>
              <span>Kumar</span>
            </h1>
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-20 text-center text-white text-sm uppercase tracking-wider">
            <a href="https://twitter.com/yourusername" className="hover:underline">TWITTER</a> • 
            <a href="https://linkedin.com/in/yourusername" className="hover:underline">LINKEDIN</a> • 
            <a href="https://github.com/yourusername" className="hover:underline">GITHUB</a>
          </div>
        </div>
      </div>
    </section>
  );
}