import { useEffect, useState } from "react";

const navLinks = [
  { label: "Sobre Nosotros", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "border-b border-border" : ""
      }`}
      style={{ height: "72px" }}
    >
      <div className="h-full px-6 md:px-12">
        <div className="flex items-center justify-between h-full max-w-[110rem] mx-auto">
          <a href="#" className="font-sans text-[2rem] font-bold text-foreground tracking-tight">
            Studio<span className="text-primary">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[1.4rem] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-[1.4rem] font-medium px-6 py-2.5 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Hablemos
            </a>
          </nav>

          {/* Mobile menu */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
            onClick={() => {
              const el = document.getElementById("mobile-nav");
              el?.classList.toggle("hidden");
            }}
          >
            <span className="w-5 h-[2px] bg-foreground block" />
            <span className="w-5 h-[2px] bg-foreground block" />
          </button>
        </div>
      </div>
      {/* Mobile nav dropdown */}
      <div id="mobile-nav" className="hidden md:hidden bg-background border-b border-border px-6 py-6">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[1.6rem] text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => document.getElementById("mobile-nav")?.classList.add("hidden")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
