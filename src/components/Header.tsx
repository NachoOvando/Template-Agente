import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_0_calc(1.125*16px)_rgba(0,0,0,0.15)]" : ""
      }`}
      style={{ height: "72px" }}
    >
      <div className="h-full px-6 md:px-[calc(18vw-10rem)]">
        <div className="flex items-center justify-between h-full max-w-[138rem] mx-auto">
          <Link to="/" className="font-sans text-[21px] font-bold text-foreground">
            Editorial
          </Link>

          {/* Menu Button */}
          <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex items-center gap-2 p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open menu"
          >
            <span className="text-[21px] font-medium leading-none">Menu</span>
            <div className="w-12 flex flex-col gap-[7px] items-center justify-center mt-[5px]">
              <span className="w-[20px] h-[2px] bg-current block"></span>
              <span className="w-[20px] h-[2px] bg-current block"></span>
            </div>
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] p-0 flex flex-col h-full bg-white dark:bg-black"
        >
          {/* Header with Close */}
          <div className="flex items-center justify-end px-6 md:px-[9.09091vw] lg:px-52 py-6">
            <SheetClose asChild>
              <button className="text-[1.6rem] text-black dark:text-white hover:opacity-60 transition-opacity">
                Close
              </button>
            </SheetClose>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col justify-between h-full px-6 md:px-[9.09091vw] lg:px-52 pb-[40px] md:pb-[56px]">
            <div className="flex flex-[0_1_100%] flex-col justify-between pt-28 md:pt-32 lg:pt-28 xl:pt-48 text-right">
              {/* Main Links - Bigger */}
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-[3.6rem] inline-block font-semibold [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "0ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-[3.6rem] inline-block font-semibold [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "150ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[3.6rem] inline-block font-semibold [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "300ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-[3.6rem] inline-block font-semibold [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "450ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>

              {/* Secondary Links - Smaller */}
              <ul>
                <li>
                  <a
                    href="mailto:hello@editorial.com"
                    className="text-[1.6rem] inline-block [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "600ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.6rem] inline-block [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "750ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.6rem] inline-block [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "900ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.6rem] inline-block [transition:background-position_600ms_cubic-bezier(0.45,0,0.55,1)] animate-in fade-in slide-in-from-right-4 bg-current [background-image:linear-gradient(90deg,rgba(203,48,223,0.5)_0%,rgba(254,44,85,0.5)_46%,hsl(var(--foreground))_54%,hsl(var(--foreground))_100%)] bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent hover:bg-[position:0%_0]"
                    style={{
                      animationDelay: "1050ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
