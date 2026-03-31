import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    setMobileOpen(false);
    setTimeout(() => {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-pf-navy transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 shrink-0"
          data-ocid="nav.home.link"
        >
          <div className="flex items-center justify-center w-9 h-9 bg-pf-orange rounded-md shadow-orange-glow">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-heading font-bold text-[15px] leading-tight tracking-wide uppercase">
              Spark Industries
            </p>
            <p className="text-foreground/50 text-[10px] tracking-[0.15em] uppercase">
              Manufacturing
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[14px] font-medium text-foreground/85 hover:text-pf-orange transition-colors duration-200 rounded-md hover:bg-white/5"
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center justify-center rounded-md bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold px-5 h-10 text-[14px] shadow-orange-glow transition-all duration-200 hover:shadow-none"
          data-ocid="nav.quote.button"
        >
          Request a Quote
        </a>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground/80 hover:text-foreground hover:bg-white/10"
              aria-label="Open menu"
              data-ocid="nav.mobile.button"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-pf-navy border-l border-border w-72 p-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2.5 p-6 border-b border-border">
                <div className="flex items-center justify-center w-8 h-8 bg-pf-orange rounded-md">
                  <Zap className="h-4 w-4 text-white fill-white" />
                </div>
                <span className="text-white font-heading font-bold text-[15px] tracking-wide uppercase">
                  Spark Industries
                </span>
              </div>
              <nav className="flex flex-col px-4 pt-6 gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-[15px] font-medium text-foreground/80 hover:text-pf-orange hover:bg-white/5 rounded-md transition-colors duration-200"
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t border-border">
                <Button
                  type="button"
                  className="w-full bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-11"
                  onClick={scrollToContact}
                  data-ocid="nav.mobile.quote.button"
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
