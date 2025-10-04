export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        {/* Minimal header - main navigation is in the hero box */}
        <div className="text-xs text-gray-500">
          <a href="#content" className="hover:underline">CURRENT WORK</a> •
          <a href="#past" className="hover:underline">PAST LIFE</a> •
          <a href="#future" className="hover:underline">FUTURE DIRECTION</a> •
          <a href="#passions" className="hover:underline">PASSIONS</a> •
          <a href="#writing" className="hover:underline">WRITING</a>
        </div>
      </nav>
    </header>
  );
}