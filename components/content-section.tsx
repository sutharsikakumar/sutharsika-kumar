'use client';

import { useEffect, useRef, useState } from 'react';

interface ContentItem {
  number: string;
  title: string;
  description: string;
  publication?: string;
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
}

export default function ContentSection({ title, items }: ContentSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id={title.toLowerCase().replace(/\s+/g, '-')}
      className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <h2 className="text-xs tracking-wider text-gray-500">{title}</h2>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div 
            key={index}
            className="space-y-2"
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="text-xs text-gray-600">{item.number}</div>
            <h3 className="text-sm leading-relaxed">{item.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {item.description}
            </p>
            {item.publication && (
              <p className="text-sm italic text-gray-500">{item.publication}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}