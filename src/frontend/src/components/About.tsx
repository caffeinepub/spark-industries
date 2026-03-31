import { Award, Clock, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { icon: Clock, value: "1–5 Days", label: "Production" },
  { icon: Users, value: "200+", label: "Clients Served" },
  { icon: Award, value: "5 Years", label: "Years in Business" },
  { icon: TrendingUp, value: "5+", label: "Years of Excellence" },
];

export default function About() {
  return (
    <section id="about" className="bg-pf-slate py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-card-lift">
              <img
                src="/assets/generated/about-spark-industries-facility.dim_800x600.jpg"
                alt="Spark Industries manufacturing facility"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-pf-orange rounded-xl px-6 py-4 shadow-orange-glow">
              <p className="font-heading font-bold text-white text-3xl leading-none">
                5+
              </p>
              <p className="text-white/80 text-[12px] mt-0.5">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-pf-orange text-[12px] font-semibold tracking-[0.25em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-heading font-extrabold text-white uppercase tracking-tight text-[clamp(1.75rem,4vw,2.25rem)] mb-6">
              About Us
            </h2>
            <div className="w-16 h-1 bg-pf-orange mb-7 rounded-full" />

            <p className="text-foreground/75 text-[15px] leading-relaxed mb-5">
              Spark Industries has been a trusted partner in precision metal
              fabrication for over 5 years. Founded on principles of quality,
              reliability, and continuous improvement, we deliver
              industry-leading results for the most demanding applications.
            </p>
            <p className="text-foreground/70 text-[15px] leading-relaxed mb-8">
              Our state-of-the-art 3000W fiber laser facility combined with
              expert CNC press brake operations serves 200+ clients with fast
              turnaround times of just 1–5 days. Every part leaves our shop to
              print — guaranteed.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-pf-card border border-white/5 rounded-lg p-4 text-center"
                >
                  <stat.icon className="h-5 w-5 text-pf-orange mx-auto mb-2" />
                  <p className="font-heading font-bold text-white text-xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-foreground/50 text-[11px] leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
