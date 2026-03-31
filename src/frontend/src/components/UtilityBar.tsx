import { Mail, MapPin, Phone } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-pf-utility py-2">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 flex flex-wrap items-center gap-x-6 gap-y-1">
        <a
          href="mailto:sparkindustries777@gmail.com"
          className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-pf-orange transition-colors duration-200"
        >
          <Mail className="h-3 w-3 shrink-0" />
          <span>sparkindustries777@gmail.com</span>
        </a>
        <a
          href="tel:+919677105592"
          className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-pf-orange transition-colors duration-200"
        >
          <Phone className="h-3 w-3 shrink-0" />
          <span>+91 96771 05592</span>
        </a>
        <a
          href="tel:+917010718856"
          className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-pf-orange transition-colors duration-200"
        >
          <Phone className="h-3 w-3 shrink-0" />
          <span>+91 70107 18856</span>
        </a>
        <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-foreground/70">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>
            No.121A, First Floor, WIP, Kattur SIDCO Industrial Estate,
            Thirumullaivoyal, Chennai – 600062
          </span>
        </span>
      </div>
    </div>
  );
}
