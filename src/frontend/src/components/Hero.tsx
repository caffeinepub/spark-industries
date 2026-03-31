import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url("/assets/generated/hero-metal-fabrication.dim_1920x700.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-pf-orange text-[12px] font-semibold tracking-[0.25em] uppercase border border-pf-orange/30 bg-pf-orange/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pf-orange" />
            ISO 9001 Certified • 20+ Years Experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading font-extrabold text-white uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,7vw,4rem)] mb-5"
        >
          High-Precision
          <br />
          <span className="text-pf-orange">Metal Fabrication</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-foreground/80 text-[clamp(1rem,2vw,1.125rem)] font-normal max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Specializing in Laser Cutting &amp; Press Brake Services for Industry.
          Serving aerospace, automotive, construction, and OEM sectors with
          tolerances to ±0.005".
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-12 px-7 text-[15px] shadow-orange-glow hover:shadow-none transition-all duration-200 group"
            onClick={() => scrollTo("#services")}
            data-ocid="hero.services.button"
          >
            Explore Services
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/60 h-12 px-7 text-[15px] font-semibold transition-all duration-200"
            onClick={() => scrollTo("#contact")}
            data-ocid="hero.quote.button"
          >
            Get A Quote
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { value: "20+", label: "Years Experience" },
            { value: '±0.005"', label: "Tolerance Precision" },
            { value: "4000W", label: "Fiber Laser" },
            { value: "6-Axis", label: "Press Brake" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading font-bold text-pf-orange text-2xl leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-foreground/60 text-[12px] tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => scrollTo("#services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/40 hover:text-pf-orange transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
