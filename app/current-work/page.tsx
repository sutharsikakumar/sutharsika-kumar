'use client';

import Header from '../../components/header';

export default function CurrentWorkPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Header title="Current Work" subtitle="Ongoing research, systems, and creative work." />

      {/* CONTENT */}
      <div className="w-full max-w-[calc(100%-6rem)] mx-auto px-12 py-12">
        <div className="w-full max-w-[1200px] mx-auto">
        {/* ITEM 1 */}
        <div className="w-full flex flex-row mb-24">
          {/* IMAGE COLUMN - FORCED LEFT */}
          <div className="w-1/2 pr-20">
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Project Image</span>
            </div>
          </div>
          
          {/* TEXT COLUMN */}
          <div className="w-1/2 pl-20 pr-40">
            <h2 className="text-2xl font-bold mb-4 font-bentham">
              Autonomous Spectral Analysis with Foundation Models
            </h2>
            <p className="text-gray-700 mb-16 leading-snug font-mono text-xs tracking-tight">
              A universal benchmarking framework evaluating large language and
              multimodal models on spectroscopic interpretation tasks across
              Raman, UV–Vis, and diffraction modalities.
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex flex-row mb-32">
          {/* IMAGE COLUMN - FORCED LEFT */}
          <div className="w-1/2 pr-20">
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Project Image</span>
            </div>
          </div>
          
          {/* TEXT COLUMN */}
          <div className="w-1/2 pl-20 pr-40">
            <h2 className="text-2xl font-bold mb-4 font-bentham">
              Multimodal Models for Scientific Discovery
            </h2>
            <p className="text-gray-700 mb-16 leading-snug font-mono text-xs tracking-tight">
              Exploring vision–language models that reason over figures,
              experimental data, and scientific context without task-specific
              retraining.
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex flex-row">
          {/* IMAGE COLUMN - FORCED LEFT */}
          <div className="w-1/2 pr-20">
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Project Image</span>
            </div>
          </div>
          
          {/* TEXT COLUMN */}
          <div className="w-1/2 pl-20 pr-40">
            <h2 className="text-2xl font-bold mb-4 font-bentham normal-case">
              Creative Computing & Performance
            </h2>
            <p className="text-gray-700 mb-16 leading-snug font-mono text-xs tracking-tight">
              Computational and performative explorations examining abstraction,
              identity, and embodied systems.
            </p>
          </div>
        </div>

      </div>
    </div>
    </main>
  );
}
