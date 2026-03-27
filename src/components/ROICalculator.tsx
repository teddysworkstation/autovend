import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const machineTypes = [
  { label: "Snack Machine", incomeMin: 300, incomeMax: 800, avgCost: 1500 },
  { label: "Combo Machine", incomeMin: 500, incomeMax: 1200, avgCost: 1800 },
  { label: "Smart AI Machine", incomeMin: 600, incomeMax: 1400, avgCost: 2200 },
  { label: "Drink Machine", incomeMin: 300, incomeMax: 700, avgCost: 1400 },
];

const locationMultipliers: Record<string, number> = {
  office: 1.0,
  school: 1.15,
  gym: 1.2,
  apartment: 0.85,
  retail: 1.1,
};

export default function ROICalculator() {
  const [machines, setMachines] = useState(2);
  const [typeIdx, setTypeIdx] = useState(1);
  const [location, setLocation] = useState("office");

  const result = useMemo(() => {
    const t = machineTypes[typeIdx];
    const mult = locationMultipliers[location] || 1;
    const monthlyMin = Math.round(t.incomeMin * mult * machines);
    const monthlyMax = Math.round(t.incomeMax * mult * machines);
    const annualMin = monthlyMin * 12;
    const annualMax = monthlyMax * 12;
    const totalCost = t.avgCost * machines;
    const avgMonthly = (monthlyMin + monthlyMax) / 2;
    const roiMonths = avgMonthly > 0 ? Math.ceil(totalCost / avgMonthly) : 0;
    return { monthlyMin, monthlyMax, annualMin, annualMax, roiMonths };
  }, [machines, typeIdx, location]);

  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

  return (
    <section className="py-20 border-b border-border bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide uppercase text-gradient-gold">
            How Much Can You Earn?
          </h2>
          <p className="text-muted-foreground mt-3">
            Adjust the inputs below to see your estimated passive income.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="font-display text-xs font-bold tracking-widest uppercase text-primary mb-2 block">
                Number of Machines: {machines}
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={machines}
                onChange={(e) => setMachines(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span><span>10</span>
              </div>
            </div>

            <div>
              <label className="font-display text-xs font-bold tracking-widest uppercase text-primary mb-2 block">
                Machine Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {machineTypes.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTypeIdx(i)}
                    className={`text-xs font-display font-bold tracking-wider uppercase px-3 py-2.5 rounded-lg border transition-all ${
                      typeIdx === i
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-primary/30"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-display text-xs font-bold tracking-widest uppercase text-primary mb-2 block">
                Location Type
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground"
              >
                <option value="office">Office Building</option>
                <option value="school">School / University</option>
                <option value="gym">Gym / Fitness Center</option>
                <option value="apartment">Apartment Complex</option>
                <option value="retail">Retail / Public Space</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-center">
            <div className="space-y-5">
              <ResultRow label="Monthly Income" value={`${fmt(result.monthlyMin)} – ${fmt(result.monthlyMax)}`} highlight />
              <ResultRow label="Annual Income" value={`${fmt(result.annualMin)} – ${fmt(result.annualMax)}`} />
              <ResultRow label="ROI Timeline" value={`~${result.roiMonths} months`} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-6 leading-relaxed">
              * Estimates based on industry averages. Actual results may vary based on location, product selection, and pricing strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
      <span className="text-xs font-display font-bold tracking-widest uppercase text-muted-foreground">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`font-mono text-lg font-bold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </motion.span>
    </div>
  );
}
