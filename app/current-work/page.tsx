'use client';

export default function CurrentWorkPage() {
  return (
    <main className="w-full bg-white">

      {/* BLACK MASTHEAD */}
      <header className="bg-black border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20">
          <h1 className="text-white font-editorial italic tracking-tight text-5xl md:text-6xl">
            Current Work
          </h1>
          <p className="mt-4 text-neutral-400 text-base tracking-wide font-serif">
            Ongoing research, systems, and creative work.
          </p>
        </div>
      </header>

      {/* WHITE DOCUMENT BODY */}
      <section>
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-32 space-y-32">

          {/* ITEM 1 */}
          <article className="space-y-10">
            <h2 className="font-editorial italic tracking-tight text-3xl md:text-4xl">
              Autonomous Spectral Analysis with Foundation Models
            </h2>

            <p className="max-w-4xl text-neutral-700 leading-[1.8] text-lg">
              A universal benchmarking framework evaluating large language and
              multimodal models on spectroscopic interpretation tasks across
              Raman, UV–Vis, and diffraction modalities.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-3 text-xs tracking-[0.25em] uppercase text-neutral-500">
              <span>Research</span>
              <span>Machine Learning</span>
              <span>Materials Science</span>
            </div>
          </article>

          {/* ITEM 2 */}
          <article className="space-y-10">
            <h2 className="font-editorial italic tracking-tight text-3xl md:text-4xl">
              Multimodal Models for Scientific Discovery
            </h2>

            <p className="max-w-4xl text-neutral-700 leading-[1.8] text-lg">
              Exploring vision–language models that reason over figures,
              experimental data, and scientific context without task-specific
              retraining.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-3 text-xs tracking-[0.25em] uppercase text-neutral-500">
              <span>Multimodal AI</span>
              <span>Evaluation</span>
              <span>Benchmarking</span>
            </div>
          </article>

          {/* ITEM 3 */}
          <article className="space-y-10">
            <h2 className="font-editorial italic tracking-tight text-3xl md:text-4xl">
              Creative Computing & Performance
            </h2>

            <p className="max-w-4xl text-neutral-700 leading-[1.8] text-lg">
              Computational and performative explorations examining abstraction,
              identity, and embodied systems.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-3 text-xs tracking-[0.25em] uppercase text-neutral-500">
              <span>Art</span>
              <span>Dance</span>
              <span>Generative Systems</span>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}

