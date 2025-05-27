'use client';
import Image from 'next/image';
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
        <div className="ml-32">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <Image
                src="/skumark.jpg"
                alt="Sutharsika Kumar"
                width={96}
                height={96}
                className="rounded-full object-cover"
                priority
              />

              <div className="mt-5">
                <a
                  href="https://www.linkedin.com/in/sutharsikakumar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={40}
                    height={40}
                    className="hover:opacity-60 transition"
                    loading="lazy"
                  />
                </a>
              </div>

              <div className="mt-3">
                <a
                  href="https://github.com/sutharsikakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Image
                    src="/github.svg"
                    alt="GitHub Icon"
                    width={24}
                    height={24}
                    className="hover:opacity-60 transition"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            <h1 className="ml-4 text-3xl font-bold -mt-9 font-inter">
              <span className="mr-2">Hello, I&apos;m</span>
              <span className="text-[#3a829c] opacity-60">
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

          <div className="-mt-12 ml-36 text-gray-700 font-inter">
            <div className="mb-4 font-inter">
              <h2 className="text-lg font-semibold mb-2 font-inter">Upcoming</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Engineering Intern – GridClarity</span><br />
                  <span className="text-sm">Coming soon</span><br />
                  <span className="text-xs text-gray-500">Jun 2025 – Aug 2025</span>
                </li>
              </ul>
            </div>

            <div className="mb-4 font-inter">
              <h2 className="text-lg font-semibold mb-2 font-inter">Present</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Undergraduate Researcher – Duke University</span><br />
                  <span className="text-sm">Developed AI-based segmentation pipeline for microscopic imaging of nanomaterials</span><br />
                  <span className="text-xs text-gray-500">May 2024 – Present</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 font-inter">Past</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">PennApps XXV Winner</span><br />
                  <span className="text-sm">Fine-tuned Llama model to generate personalized emails to land coffee-chats.</span><br />
                  <span className="text-xs text-gray-500">Sept 2024</span>
                </li>
              </ul>
              <ul className="list-disc pl-5 space-y-2 font-inter">
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
          content={`I am a Computer Science and Statistics student at UNC Chapel Hill. My first introduction to building was in high school when I took AP Computer Science A, and to say the very least, I did not enjoy it. It was not until college that I realized the kind of impact I could make with computer science. If I saw a problem, more often than not, there was a solution waiting to be built, and CS became an integral part of that process. Since then, I have contributed to research in machine intelligence and computational physics, and hope to build tools that people actually find value in.`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ml-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ml-20">
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
