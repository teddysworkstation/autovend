import { TrendingUp, Users, Truck, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "1,000+", label: "Active Entrepreneurs" },
  { icon: TrendingUp, value: "$2.4M+", label: "Monthly Revenue Generated" },
  { icon: Truck, value: "247", label: "Machines Delivered This Month" },
  { icon: Award, value: "4.9★", label: "Average Customer Rating" },
];

export default function SocialProofBar() {
  return (
    <section className="py-12 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
