'use client';
import Header from '../components/header';
import AboutText from '../components/about';
import Footer from '../components/footer';
import HobbyCard from '../components/hobby';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-8">
        <div style={{ marginLeft: '1cm' }}>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <img
                src="/skumark.jpg"
                alt="Sutharsika Kumar"
                className="w-24 h-24 rounded-full object-cover "
              />

              <div className="mt-5">
                <a
                  href="https://www.linkedin.com/in/sutharsikakumar/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin.png"
                    alt="LinkedIn"
                    className="w-10 h-10 hover:opacity-60 transition"
                  />
                </a>
              </div>

              <div className="mt-3">
                <a
                  href="https://github.com/sutharsikakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/github.svg"
                    alt="GitHub Icon"
                    className="w-6 h-6 hover:opacity-60 transition"
                  />
                </a>
              </div>
            </div>

            <h1 className="ml-4 text-3xl font-bold -mt-25 font-[Inter]">
            <span className="mr-2">Hello, I'm</span>
            <span style={{ color: '#3a829c', opacity: 0.6 }}>
            <Typewriter
            words={['Sutharsika Kumar']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={0}
            delaySpeed={1000}
            />
            </span>
          </h1>
          </div>
          <div className="-mt-25 ml-35 text-gray-700 font-[Inter]">

            <div className="mb-4 font-[Inter]">
              <h2 className="text-lg font-semibold mb-2 font-[Inter]">Upcoming</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Engineering Intern – GridClarity</span><br />
                  <span className="text-sm">Coming soon</span><br />
                  <span className="text-xs text-gray-500">Jun 2025 – Aug 2025</span>
                </li>
              </ul>
            </div>

            <div className="mb-4 font-[Inter]">
              <h2 className="text-lg font-semibold mb-2 font-[Inter]">Present</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Undergraduate Researcher – Duke University</span><br />
                  <span className="text-sm">Developed AI-based segmentation pipeline for microscopic imaging of nanomaterials</span><br />
                  <span className="text-xs text-gray-500">May 2024 – Present</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 font-[Inter]">Past</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">PennApps XXV Winner</span><br />
                  <span className="text-sm">Fine-tuned Llama model to generate personalized emails to land coffee-chats.</span><br />
                  <span className="text-xs text-gray-500">Sept 2024</span>
                </li>
              </ul>
              <ul className="list-disc pl-5 space-y-2 font-[Inter]">
                <li>
                  <span className="font-semibold">HackHarvard Participant</span><br />
                  <span className="text-sm">Built a disaster relief resource allocation app using weather and socioeconomic data</span><br />
                  <span className="text-xs text-gray-500">Oct 2024</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <AboutText
        title="About Me"
        content={`I'm a Computer Science and Statistics student at UNC Chapel Hill. My first introduction to building was in high school when I took AP Computer Science A, and to say the very least, I didn't enjoy it. It wasn't until college that I realized the kind of impact I could make with computer science. If I saw a problem, more often than not, there was a solution waiting to be built, and CS became an integral part of that process. Since then, I've contributed to research in machine intelligence and computational physics, and hope to build tools that people actually find value in.`}
        />
        <AboutText
        title="Projects"
        content={
        <>
        I love building just for the fun of it! For a full list of projects, check out my{' '}
        <a href="/projects" className="text-blue-500 underline">projects page.</a>
        </>
        }
        />

        <div className="flex gap-x-6 mt-4 ml-20">
        <HobbyCard
          title="Token Optimizer"
          description="Web extension to optimize token usage for large-language model prompts"
          imageUrl="/tokenoptimizer.jpg"
          />
        <HobbyCard
          title="baXter"
          description="Speech trainer with real-time feedback and AI-powered transcription and slide generation."
          imageUrl="/presenter.png"
          />
           <HobbyCard
          title="Dog Adoption"
          description="A website that performs CRUD operations and uses dynamic routing to display dog breeds for adoption."
          imageUrl="/dogadoption.jpg"
          />
        </div>
        <AboutText
        title="Hobbies"
        content={`In my free time, I enjoy cafe-hopping, dancing, and traveling/exploring.`}
        />
        <div className="flex gap-x-6 mt-4 ml-20">
        <HobbyCard
          title="Cafe Hopping"
          description="Enjoying the ambience of a new cafe with a unique coffee/matcha in hand never gets boring!"
          imageUrl="/cafe.jpg"
          />
        <HobbyCard
          title="Traveling/Exploring"
          description="Having traveled and lived in various places, exploration has become a key part of who I am."
          imageUrl="/river.jpg"
          />
           <HobbyCard
          title="Dancing"
          description="I have experience with traditional Bharatanatyam but am always looking to expand."
          imageUrl="/dance.jpg"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
