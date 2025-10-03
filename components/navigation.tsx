export default function Navigation() {
  return (
    <nav className="bg-black py-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs tracking-wider text-white">
          <a href="#current-work" className="hover:opacity-60 transition-opacity">
            CURRENT WORK
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#past-life" className="hover:opacity-60 transition-opacity">
            PAST LIFE
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#future" className="hover:opacity-60 transition-opacity">
            FUTURE
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#directions" className="hover:opacity-60 transition-opacity">
            DIRECTIONS
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#passions" className="hover:opacity-60 transition-opacity">
            PASSIONS
          </a>
          <span className="hidden md:inline">•</span>
          <a href="#writings" className="hover:opacity-60 transition-opacity">
            WRITINGS
          </a>
        </div>
      </div>
    </nav>
  );
}