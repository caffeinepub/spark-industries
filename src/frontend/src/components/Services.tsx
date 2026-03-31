import { ArrowRight, Check, Layers, Zap } from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    id: "laser",
    icon: Zap,
    title: "Laser Cutting",
    subtitle: "High-Speed Fiber Laser Precision",
    description:
      "Our 4000W fiber laser delivers unmatched speed and precision for sheet metal cutting. From intricate details to heavy plate work, we achieve tolerances competitors can't match.",
    features: [
      'Steel, aluminum & stainless up to 1" thick',
      'Tolerances to ±0.005" on all cuts',
      "High-speed fiber laser technology",
      "Complex geometry and tight nesting",
      "Burr-free edges on most materials",
    ],
    image: "/assets/generated/service-laser-cutting.dim_800x500.jpg",
  },
  {
    id: "press",
    icon: Layers,
    title: "Press Brake",
    subtitle: "Precision Bending & Forming",
    description:
      "Our 6-axis CNC press brake handles complex multi-bend parts with repeatable accuracy. From simple angles to intricate box forms, we deliver consistent results every time.",
    features: [
      "Mild steel, stainless & aluminum",
      "Complex multi-angle bending sequences",
      "6-axis back gauge for accuracy",
      "Prototypes to high-volume production",
      "In-house tooling for custom profiles",
    ],
    image: "/assets/generated/service-press-brake.dim_800x500.jpg",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-pf-slate py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-pf-orange text-[12px] font-semibold tracking-[0.25em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading font-extrabold text-white uppercase tracking-tight text-[clamp(1.75rem,4vw,2.25rem)]">
            Our Core Services
          </h2>
          <div className="mt-4 w-16 h-1 bg-pf-orange mx-auto rounded-full" />
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="bg-pf-card rounded-xl overflow-hidden shadow-card-lift border border-white/5 hover:border-pf-orange/20 transition-colors duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Text side */}
                <div className="flex-1 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pf-orange/15 border border-pf-orange/20">
                      <service.icon className="h-5 w-5 text-pf-orange" />
                    </div>
                    <div>
                      <p className="text-foreground/50 text-[11px] tracking-[0.2em] uppercase">
                        {service.subtitle}
                      </p>
                      <h3 className="font-heading font-bold text-white uppercase text-xl tracking-wide">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-foreground/70 text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-pf-orange shrink-0 mt-0.5" />
                        <span className="text-foreground/75 text-[14px]">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-pf-orange text-[14px] font-semibold hover:gap-2.5 transition-all duration-200 group"
                    data-ocid={`services.${service.id}.button`}
                  >
                    Get a Quote
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Image side */}
                <div className="lg:w-[42%] h-64 lg:h-auto relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} at Spark Industries`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pf-card/40 to-transparent lg:block hidden" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
