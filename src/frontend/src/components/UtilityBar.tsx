import { Mail, MapPin, Phone } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-pf-utility py-2">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 flex flex-wrap items-center gap-x-6 gap-y-1">
        <a
          href="mailto:info@sparkindustries.com"
          className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-pf-orange transition-colors duration-200"
        >
          <Mail className="h-3 w-3 shrink-0" />
          <span>info@sparkindustries.com</span>
        </a>
        <a
          href="tel:5552345678"
          className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-pf-orange transition-colors duration-200"
        >
          <Phone className="h-3 w-3 shrink-0" />
          <span>(555) 234-5678</span>
        </a>
        <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-foreground/70">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>123 Industrial Blvd, Manufacturing City, ST 00000</span>
        </span>
      </div>
    </div>
  );
}
