import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceType, useSubmitQuote } from "../hooks/useQueries";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  serviceType: ServiceType.laserCutting,
  message: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const { mutateAsync, isPending, isSuccess, reset } = useSubmitQuote();

  const updateField =
    (field: keyof typeof INITIAL_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      toast.success(
        "Quote request submitted! We'll be in touch within 24 hours.",
      );
    } catch {
      toast.error("Failed to submit. Please try again or call us directly.");
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    reset();
  };

  return (
    <section id="contact" className="bg-pf-slate py-20 px-4 sm:px-6">
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
            Get Started
          </p>
          <h2 className="font-heading font-extrabold text-white uppercase tracking-tight text-[clamp(1.75rem,4vw,2.25rem)]">
            Ready to Start Your Project?
          </h2>
          <div className="mt-4 w-16 h-1 bg-pf-orange mx-auto rounded-full" />
          <p className="mt-5 text-foreground/65 text-[15px] max-w-xl mx-auto">
            Fill in your project details and our team will provide a detailed
            quote within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isSuccess ? (
              <div
                data-ocid="quote.success_state"
                className="bg-pf-card border border-pf-orange/30 rounded-xl p-10 text-center flex flex-col items-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-pf-orange/15 border border-pf-orange/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-pf-orange" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-xl uppercase mb-2">
                    Request Received!
                  </h3>
                  <p className="text-foreground/65 text-[15px] leading-relaxed">
                    Thanks for reaching out. Our team will review your project
                    details and send you a detailed quote within 24 business
                    hours.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-pf-orange/40 text-pf-orange hover:bg-pf-orange/10 hover:text-pf-orange mt-2"
                  onClick={handleReset}
                  data-ocid="quote.reset.button"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-pf-card border border-white/5 rounded-xl p-8 space-y-5"
                data-ocid="quote.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-foreground/80 text-[13px] uppercase tracking-wide"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      required
                      value={form.name}
                      onChange={updateField("name")}
                      className="bg-background border-border text-foreground placeholder:text-foreground/30 h-11 focus:border-pf-orange focus:ring-pf-orange/20"
                      data-ocid="quote.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-foreground/80 text-[13px] uppercase tracking-wide"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      value={form.email}
                      onChange={updateField("email")}
                      className="bg-background border-border text-foreground placeholder:text-foreground/30 h-11 focus:border-pf-orange focus:ring-pf-orange/20"
                      data-ocid="quote.email.input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-foreground/80 text-[13px] uppercase tracking-wide"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={updateField("phone")}
                      className="bg-background border-border text-foreground placeholder:text-foreground/30 h-11 focus:border-pf-orange focus:ring-pf-orange/20"
                      data-ocid="quote.phone.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="company"
                      className="text-foreground/80 text-[13px] uppercase tracking-wide"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={updateField("company")}
                      className="bg-background border-border text-foreground placeholder:text-foreground/30 h-11 focus:border-pf-orange focus:ring-pf-orange/20"
                      data-ocid="quote.company.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-[13px] uppercase tracking-wide">
                    Service Required *
                  </Label>
                  <Select
                    value={form.serviceType}
                    onValueChange={(val) =>
                      setForm((prev) => ({
                        ...prev,
                        serviceType: val as ServiceType,
                      }))
                    }
                    required
                    data-ocid="quote.service.select"
                  >
                    <SelectTrigger className="bg-background border-border text-foreground h-11 focus:border-pf-orange focus:ring-pf-orange/20">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-pf-card border-border">
                      <SelectItem
                        value={ServiceType.laserCutting}
                        className="text-foreground focus:bg-pf-orange/15"
                      >
                        Laser Cutting
                      </SelectItem>
                      <SelectItem
                        value={ServiceType.pressBrake}
                        className="text-foreground focus:bg-pf-orange/15"
                      >
                        Press Brake
                      </SelectItem>
                      <SelectItem
                        value={ServiceType.both}
                        className="text-foreground focus:bg-pf-orange/15"
                      >
                        Both Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-foreground/80 text-[13px] uppercase tracking-wide"
                  >
                    Project Details *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your project: materials, dimensions, quantity, tolerances, deadline..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={updateField("message")}
                    className="bg-background border-border text-foreground placeholder:text-foreground/30 resize-none focus:border-pf-orange focus:ring-pf-orange/20"
                    data-ocid="quote.message.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-12 text-[15px] shadow-orange-glow hover:shadow-none transition-all duration-200 disabled:opacity-70"
                  data-ocid="quote.submit.button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Get Your Quote
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Image + info side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="relative rounded-xl overflow-hidden shadow-card-lift">
              <img
                src="/assets/generated/quote-metal-parts.dim_700x600.jpg"
                alt="Precision laser-cut metal parts"
                className="w-full h-72 lg:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-heading font-bold text-white text-lg uppercase">
                  Parts Manufactured to Print
                </p>
                <p className="text-foreground/70 text-[13px] mt-1">
                  Every order quality-checked before shipping.
                </p>
              </div>
            </div>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Response Time",
                  value: "< 24 Hours",
                  sub: "Quote turnaround",
                },
                {
                  label: "Production",
                  value: "3–5 Days",
                  sub: "Standard lead time",
                },
                {
                  label: "Rush Orders",
                  value: "Available",
                  sub: "Contact us directly",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-pf-card border border-white/5 rounded-lg p-4 text-center"
                >
                  <p className="text-foreground/50 text-[11px] tracking-wider uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-heading font-bold text-pf-orange text-[17px] leading-snug">
                    {item.value}
                  </p>
                  <p className="text-foreground/45 text-[11px] mt-0.5">
                    {item.sub}
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
