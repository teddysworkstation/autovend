import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const machineTypes = [
  { label: "Snack", incomeMin: 300, incomeMax: 800, avgCost: 1500 },
  { label: "Combo", incomeMin: 500, incomeMax: 1200, avgCost: 1800 },
  { label: "Smart AI", incomeMin: 600, incomeMax: 1400, avgCost: 2200 },
  { label: "Drink", incomeMin: 300, incomeMax: 700, avgCost: 1400 },
];

const locationMultipliers: Record<string, number> = {
  office: 1.0, school: 1.15, gym: 1.2, apartment: 0.85, retail: 1.1,
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
    const totalCost = t.avgCost * machines;
    const avgMonthly = (monthlyMin + monthlyMax) / 2;
    const roiMonths = avgMonthly > 0 ? Math.ceil(totalCost / avgMonthly) : 0;
    return { monthlyMin, monthlyMax, annualMin: monthlyMin * 12, annualMax: monthlyMax * 12, roiMonths };
  }, [machines, typeIdx, location]);

  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">ROI Calculator</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            How Much Can You Earn?
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Number of Machines: <span className="text-primary font-bold">{machines}</span>
                </label>
                <input
                  type="range" min={1} max={10} value={machines}
                  onChange={(e) => setMachines(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1</span><span>10</span></div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Machine Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {machineTypes.map((t, i) => (
                    <button key={t.label} onClick={() => setTypeIdx(i)}
                      className={`text-sm font-medium px-3 py-2.5 rounded-xl border transition-all ${
                        typeIdx === i ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/30"
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Location Type</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground">
                  <option value="office">Office Building</option>
                  <option value="school">School / University</option>
                  <option value="gym">Gym / Fitness Center</option>
                  <option value="apartment">Apartment Complex</option>
                  <option value="retail">Retail / Public Space</option>
                </select>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Monthly Income</p>
                  <motion.p key={`m-${result.monthlyMin}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-2xl font-bold text-primary">
                    {fmt(result.monthlyMin)} – {fmt(result.monthlyMax)}
                  </motion.p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Annual Income</p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {fmt(result.annualMin)} – {fmt(result.annualMax)}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Break Even</p>
                  <p className="font-display text-lg font-bold text-foreground">~{result.roiMonths} months</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-6">* Estimates based on industry averages.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
