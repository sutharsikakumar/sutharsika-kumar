'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Dither = dynamic(() => import('@/components/Dither'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-20 px-[200px] min-h-screen flex items-center">
      <div className="flex items-center justify-center w-full">
        <div className="relative w-full max-w-6xl">
          {/* Navigation above box */}
          <nav className="mb-4 text-left text-white text-sm uppercase tracking-wider">
            <a 
              href="#current-work"
              onClick={(e) => handleScroll(e, 'current-work')}
              className="hover:underline transition-all"
            >
              Current Work
            </a> • <a 
              href="#past-life"
              onClick={(e) => handleScroll(e, 'past-life')}
              className="hover:underline transition-all"
            >
              Past Life
            </a> • <a 
              href="#future-direction"
              onClick={(e) => handleScroll(e, 'future-direction')}
              className="hover:underline transition-all"
            >
              Future Direction
            </a> • <a 
              href="#passions"
              onClick={(e) => handleScroll(e, 'passions')}
              className="hover:underline transition-all"
            >
              Passions
            </a> • <a 
              href="#writing"
              onClick={(e) => handleScroll(e, 'writing')}
              className="hover:underline transition-all"
            >
              Writing
            </a>
          </nav>

          {/* Dither box */}
          <div className="relative w-full h-[600px]">
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
            
            <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl italic flex items-center gap-3 md:gap-4 text-white"
                style={{ fontFamily: "'Alice', serif" }}
              >
                <span>Sutharsika</span>
                <Image 
                  src="/star.png" 
                  alt="star" 
                  width={12}
                  height={12}
                  className="object-contain"
                />
                <span>Kumar</span>
              </h1>
            </div>
          </div>

          {/* Social links below box */}
          <div className="mt-4 text-right text-white text-sm uppercase tracking-wider">
            <a href="https://twitter.com/yourusername" className="hover:underline">TWITTER</a> • 
            <a href="https://linkedin.com/in/yourusername" className="hover:underline">LINKEDIN</a> • 
            <a href="https://github.com/yourusername" className="hover:underline">GITHUB</a>
          </div>
        </div>
      </div>
    </section>
  );
}