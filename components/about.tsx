import React, { ReactNode } from 'react';

interface AboutTextProps {
  title?: string;
  content: string | ReactNode;
}

const AboutText: React.FC<AboutTextProps> = ({ title, content }) => {
  return (
    <section className="mt-10 ml-20 max-w-6xl text-gray-800 font-inter">
      {title && <h2 className="text-xl font-semibold mb-5">{title}</h2>}
      <div className="text-base leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </section>
  );
};

export default AboutText;
