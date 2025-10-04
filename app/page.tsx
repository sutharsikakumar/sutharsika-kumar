import Header from '@/components/header';
import Hero from '@/components/hero';
import ContentSection from '@/components/content-section';
import Footer from '@/components/footer';

export default function Home() {
  const currentWorkData = [
    {
      number: "01",
      title: "Your current main focus",
      description: "Add your current work, research, or studies here.",
    },
  ];

  const pastLifeData = [
    {
      number: "01",
      title: "Previous role",
      description: "Description of your past work.",
    },
  ];

  const futureDirectionData = [
    {
      number: "01",
      title: "Future goal",
      description: "What problems do you want to solve?",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-3 gap-16">
            <ContentSection title="CURRENT WORK" items={currentWorkData} />
            <ContentSection title="PAST LIFE" items={pastLifeData} />
            <ContentSection title="FUTURE DIRECTION" items={futureDirectionData} />
          </div>
        </div>
      </main>
    </div>
  );
}