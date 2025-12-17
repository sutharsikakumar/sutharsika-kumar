'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const Dither = dynamic(() => import('@/components/Dither'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
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
    <section className="bg-black min-h-screen flex items-center py-20 px-[200px]">
      <div className="flex items-center justify-center w-full">
        <div className="relative w-full max-w-6xl">

          {/* NAVIGATION */}
          <nav className="mb-6 text-left uppercase tracking-widest text-sm md:text-base lg:text-lg font-mono text-white">
            <Link
              href="/current-work"
              className="text-white hover:opacity-70 transition-opacity"
            >
              CURRENT WORK
            </Link>{' '}
            •{' '}
            <a
              href="#past-life"
              onClick={(e) => handleScroll(e, 'past-life')}
              className="text-white hover:opacity-70 transition-opacity"
            >
              PAST LIFE
            </a>{' '}
            •{' '}
            <a
              href="#future-direction"
              onClick={(e) => handleScroll(e, 'future-direction')}
              className="text-white hover:opacity-70 transition-opacity"
            >
              FUTURE DIRECTION
            </a>{' '}
            •{' '}
            <a
              href="#passions"
              onClick={(e) => handleScroll(e, 'passions')}
              className="text-white hover:opacity-70 transition-opacity"
            >
              PASSIONS
            </a>{' '}
            •{' '}
            <a
              href="#writing"
              onClick={(e) => handleScroll(e, 'writing')}
              className="text-white hover:opacity-70 transition-opacity"
            >
              WRITING
            </a>
          </nav>

          {/* HERO VISUAL */}
          <div className="relative w-full h-[600px]">
            <div className="absolute inset-0 w-full h-full">
              <Dither
                waveColor={[0.5, 0.5, 0.5]}
                enableMouseInteraction
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.1}
                pixelSize={2}
              />
            </div>

            {/* NAME */}
            <div
              className={`relative z-10 flex items-center justify-center h-full transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h1
                className="flex items-center gap-3 md:gap-4 italic font-serif text-white"
                style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }}
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

          {/* SOCIAL LINKS */}
          <div className="mt-6 text-right tracking-widest text-sm md:text-base lg:text-lg uppercase font-mono text-white">
            <a
              href="https://twitter.com/sutharsikakumar"
              className="text-white hover:opacity-70 transition-opacity"
            >
              TWITTER
            </a>{' '}
            •{' '}
            <a
              href="https://linkedin.com/in/sutharsikakumar"
              className="text-white hover:opacity-70 transition-opacity"
            >
              LINKEDIN
            </a>{' '}
            •{' '}
            <a
              href="https://github.com/sutharsikakumar"
              className="text-white hover:opacity-70 transition-opacity"
            >
              GITHUB
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
