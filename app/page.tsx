import Header from '@/components/header';
import Hero from '@/components/hero';
import ContentSection from '@/components/content-section';
import Footer from '@/components/footer';

export default function Home() {
  const currentWorkData = [
    {
      number: "01",
      title: "Your current main focus",
      description: "Add your current work, research, or studies here. What's the most important problem you're working on?"
    },
    {
      number: "02",
      title: "Secondary focus",
      description: "Another project or area of work"
    },
  ];

  const pastLifeData = [
    {
      number: "01",
      title: "Previous role or achievement",
      description: "Description of your past work, backed by companies or institutions"
    },
    {
      number: "02",
      title: "Another milestone",
      description: "Awards, recognition, or significant projects"
    },
  ];

  const writingData = [
    {
      number: "01",
      title: "Article or Essay Title",
      description: "Brief description of what this piece is about",
      publication: "Publication Name (Year)"
    },
    {
      number: "02",
      title: "Another Piece",
      description: "Description of this work",
      publication: "Publication (Year)"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      {/* Hero section with dither effect */}
      <main className="px-6 md:px-12 pt-20">
        <Hero />
        
        {/* Content sections below - scroll down to see these */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-32 pb-20">
          <ContentSection 
            title="CURRENT WORK" 
            items={currentWorkData}
          />
          
          <ContentSection 
            title="PAST LIFE" 
            items={pastLifeData}
          />
          
          <ContentSection 
            title="SELECTED WRITING" 
            items={writingData}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}