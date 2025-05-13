import Header from '../components/header';
import AboutText from '../components/about';

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
                  href="https://www.linkedin.com/in/sutharsika-kumar-9b89401b5/"
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

            <h1 className="text-3xl font-bold -mt-25">
              hello, i'm <span style={{ color: '#a67c52', opacity: 0.6 }}>sutharsika kumar</span>
            </h1>
          </div>
          <div className="-mt-25 ml-35 text-gray-700">

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Upcoming</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Software Engineering Intern – GridClarity</span><br />
                  <span className="text-sm">Innovative applications</span><br />
                  <span className="text-xs text-gray-500">Jun 2025 – Aug 2025</span>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Present</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Undergraduate Researcher – Duke University</span><br />
                  <span className="text-sm">Developed AI-based segmentation pipeline for microscopic imaging of nanomaterials</span><br />
                  <span className="text-xs text-gray-500">May 2024 – Present</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Past</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">PennApps XXV Winner</span><br />
                  <span className="text-sm">Built disaster relief resource allocation app using weather and socioeconomic data</span><br />
                  <span className="text-xs text-gray-500">Sept 2024</span>
                </li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">HackHarvard Participant</span><br />
                  <span className="text-sm">Built disaster relief resource allocation app using weather and socioeconomic data</span><br />
                  <span className="text-xs text-gray-500">Oct 2024</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
