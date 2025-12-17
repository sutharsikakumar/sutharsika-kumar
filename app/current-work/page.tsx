'use client';

export default function CurrentWorkPage() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* MINIMAL BLACK HEADER */}
      <section className="bg-black text-white py-16 px-8 md:px-16 lg:px-24 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl mb-3 font-light tracking-tight font-crimson">
            Current Work
          </h1>
          <p className="text-base md:text-lg font-light tracking-wide text-neutral-400 font-inter">
            Ongoing research, systems, and creative work.
          </p>
        </div>
      </section>

      {/* WHITE CONTENT */}
      <section className="bg-white text-black py-16 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">

          <article className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight font-crimson">
              Autonomous Spectral Analysis with Foundation Models
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-4xl font-inter">
              A universal benchmarking framework evaluating large language and
              multimodal models on spectroscopic interpretation tasks across
              Raman, UV–Vis, and diffraction modalities.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Research</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Machine Learning</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Materials Science</span>
            </div>
          </article>

          <article className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight font-crimson">
              Multimodal Models for Scientific Discovery
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-4xl font-inter">
              Exploring vision-language models that reason over figures,
              experimental data, and scientific context without task-specific
              retraining.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Multimodal AI</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Evaluation</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Benchmarking</span>
            </div>
          </article>

          <article className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight font-crimson">
              Creative Computing & Performance
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-4xl font-inter">
              Computational and performative explorations examining abstraction,
              identity, and embodied systems.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Art</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Dance</span>
              <span className="text-xs uppercase tracking-wider px-3 py-1.5 bg-neutral-100 text-neutral-600 font-medium font-inter">Generative Systems</span>
            </div>
          </article>

        </div>
      </section>

    </main>
  );
}