'use client';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0b0c0d]">
      <h1
        className="text-white text-center"
        style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 400, lineHeight: 1 }}
      >
        Sutharsika Kumar
      </h1>
      <h2
        className="text-white text-center"
        style={{
          fontSize: 'clamp(1.25rem, 2vw, 2rem)',
          fontWeight: 300,
          marginTop: '-1.75em',
        }}
      >
        Builder&nbsp;&amp;&nbsp;Researcher
      </h2>
    </main>
  );
}
