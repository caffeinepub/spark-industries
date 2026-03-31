import { ExternalLink, Mail, MapPin, Phone, Zap } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About Us", href: "#about" },
  { label: "Request a Quote", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-pf-footer">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 bg-pf-orange rounded-md shadow-orange-glow">
                <Zap className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-white font-heading font-bold text-[15px] leading-tight tracking-wide uppercase">
                  Spark Industries
                </p>
                <p className="text-foreground/40 text-[10px] tracking-[0.15em] uppercase">
                  Manufacturing
                </p>
              </div>
            </div>
            <p className="text-foreground/60 text-[14px] leading-relaxed">
              Industry-leading laser cutting and press brake fabrication
              services. Serving aerospace, automotive, construction, and OEM
              industries.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[14px] mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:sparkindustries777@gmail.com"
                  className="flex items-start gap-2.5 text-foreground/60 hover:text-pf-orange transition-colors duration-200 text-[14px] group"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 group-hover:text-pf-orange" />
                  <span>sparkindustries777@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919677105592"
                  className="flex items-center gap-2.5 text-foreground/60 hover:text-pf-orange transition-colors duration-200 text-[14px] group"
                >
                  <Phone className="h-4 w-4 shrink-0 group-hover:text-pf-orange" />
                  <span>+91 96771 05592</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917010718856"
                  className="flex items-center gap-2.5 text-foreground/60 hover:text-pf-orange transition-colors duration-200 text-[14px] group"
                >
                  <Phone className="h-4 w-4 shrink-0 group-hover:text-pf-orange" />
                  <span>+91 70107 18856</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-foreground/60 text-[14px]">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    No.121A, First Floor, WIP,
                    <br />
                    Kattur SIDCO Industrial Estate,
                    <br />
                    Thirumullaivoyal, Chennai – 600062
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[14px] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-foreground/60 hover:text-pf-orange transition-colors duration-200 text-[14px] flex items-center gap-1.5 group"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    <span className="w-1 h-1 rounded-full bg-foreground/30 group-hover:bg-pf-orange transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-foreground/40 text-[12px]">
            &copy; {currentYear} Spark Industries. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-foreground/30 hover:text-foreground/50 transition-colors text-[12px]"
          >
            Built with ❤️ using caffeine.ai
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
