import { CircleDot, Settings, Wrench } from "lucide-react";
import { motion } from "motion/react";

const COLUMNS = [
  {
    icon: CircleDot,
    title: "Materials",
    items: [
      "Mild Steel (HR & CR)",
      "Stainless Steel (304, 316)",
      "Aluminum (5052, 6061)",
      "Galvanized Steel",
      "Copper & Brass",
      "Corten / Weathering Steel",
    ],
  },
  {
    icon: Wrench,
    title: "Equipment",
    items: [
      "4000W Fiber Laser (10' x 5' table)",
      "6-Axis CNC Press Brake",
      "CNC Turret Punch Press",
      "Plasma Cutter",
      "MIG / TIG Welding Stations",
      "Powder Coat Line",
    ],
  },
  {
    icon: Settings,
    title: "Secondary Processes",
    items: [
      "MIG & TIG Welding",
      "Powder Coating",
      "Deburring & Edge Finishing",
      "Assembly & Hardware Insertion",
      "Tapping & Countersinking",
      "Custom Packaging & Shipping",
    ],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="bg-metallic-gradient py-20 px-4 sm:px-6"
    >
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
            Full-Scope Fabrication
          </p>
          <h2 className="font-heading font-extrabold text-white uppercase tracking-tight text-[clamp(1.75rem,4vw,2.25rem)]">
            Capabilities
          </h2>
          <div className="mt-4 w-16 h-1 bg-pf-orange mx-auto rounded-full" />
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/8 hover:border-pf-orange/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pf-orange/15 border border-pf-orange/20">
                  <col.icon className="h-5 w-5 text-pf-orange" />
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-lg tracking-wide">
                  {col.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pf-orange shrink-0" />
                    <span className="text-foreground/75 text-[14px] leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
