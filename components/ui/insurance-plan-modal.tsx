// components/ui/insurance-plan-modal.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface Plan {
  provider: string;
  priceMin: number;
  priceMax: number;
  duration: number;
  highlight: string;
}

function getMostValuable(plans: Plan[]): string {
  type ScoredPlan = Plan & { score: number };

  const bestPlan = plans.reduce<ScoredPlan | null>((best, plan) => {
    const avg = (plan.priceMin + plan.priceMax) / 2;
    const score = avg / plan.duration;

    if (!best || score < best.score) {
      return { ...plan, score };
    }

    return best;
  }, null);

  return bestPlan?.provider ?? "";
}}

export function InsurancePlanModal({
  location,
  onClose,
}: {
  location: string;
  onClose: () => void;
}) {
  const [sortBy, setSortBy] = useState<"price" | "duration">("price");

  const plans: Plan[] = useMemo(() => {
    const data: { [key: string]: Plan[] } = {
      VIETNAM: [
        {
          provider: "AXA Thailand (Smart Traveller Plus)",
          priceMin: 300,
          priceMax: 800,
          duration: 180,
          highlight: "High coverage limits and rental car excess coverage.",
        },
        {
          provider: "Allianz Ayudhya (Allianz Travel - Single Trip)",
          priceMin: 250,
          priceMax: 750,
          duration: 180,
          highlight: "Strong global presence and follow-up medical care.",
        },
        {
          provider: "MSIG Thailand (Travel Easy Plus)",
          priceMin: 350,
          priceMax: 900,
          duration: 180,
          highlight:
            "Hijacking and rental car excess benefits in higher tiers.",
        },
      ],
      LAOS: [
        {
          provider: "AXA Thailand (Smart Traveller Plus)",
          priceMin: 32,
          priceMax: 82,
          duration: 180,
          highlight: "Direct billing hospitals and emergency evacuation.",
        },
        {
          provider: "Allianz Ayudhya (Allianz Travel - Single Trip)",
          priceMin: 270,
          priceMax: 780,
          duration: 180,
          highlight: "Quarantine allowance and medical evacuation.",
        },
        {
          provider: "MSIG Thailand (Travel Easy Plus)",
          priceMin: 370,
          priceMax: 920,
          duration: 185,
          highlight: "Wide plan range and higher sub-limits.",
        },
      ],
      CAMBODIA: [
        {
          provider: "AXA Thailand (Smart Traveller Plus)",
          priceMin: 310,
          priceMax: 810,
          duration: 180,
          highlight: "Rental car excess and wide hospital network.",
        },
        {
          provider: "Allianz Ayudhya (Allianz Travel - Single Trip)",
          priceMin: 260,
          priceMax: 760,
          duration: 180,
          highlight: "Emergency and travel inconvenience benefits.",
        },
        {
          provider: "MSIG Thailand (Travel Easy Plus)",
          priceMin: 360,
          priceMax: 910,
          duration: 185,
          highlight: "Hijacking, rental car excess, and comprehensive cover.",
        },
      ],
      MALAYSIA: [
        {
          provider: "AXA Thailand (Smart Traveller Plus)",
          priceMin: 330,
          priceMax: 830,
          duration: 180,
          highlight: "Comprehensive outpatient/inpatient cover for Malaysia.",
        },
        {
          provider: "Allianz Ayudhya (Allianz Travel - Single Trip)",
          priceMin: 280,
          priceMax: 790,
          duration: 180,
          highlight: "Includes COVID-19 and trip cancellation protection.",
        },
        {
          provider: "MSIG Thailand (Travel Easy Plus)",
          priceMin: 390,
          priceMax: 930,
          duration: 185,
          highlight: "Budget to premium options and high flexibility.",
        },
      ],
      SINGAPORE: [
        {
          provider: "AXA Thailand (Smart Traveller Plus)",
          priceMin: 1300,
          priceMax: 1850,
          duration: 180,
          highlight: "High healthcare cost coverage in Singapore.",
        },
        {
          provider: "Allianz Ayudhya (Allianz Travel - Single Trip)",
          priceMin: 280,
          priceMax: 800,
          duration: 180,
          highlight: "Quarantine allowance and comprehensive care.",
        },
        {
          provider: "MSIG Thailand (Travel Easy Plus)",
          priceMin: 380,
          priceMax: 950,
          duration: 185,
          highlight: "COVID-19 disruption, hijacking and rental excess.",
        },
      ],
    };
    return data[location] || [];
  }, [location]);

  const sorted = [...plans].sort((a, b) => {
    if (sortBy === "price") return a.priceMin - b.priceMin;
    if (sortBy === "duration") return b.duration - a.duration;
    return 0;
  });

  const mostValuable = getMostValuable(sorted);

  return (
    <div className="fixed inset-0 bg-black-500/20 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-lg p-6 rounded-4xl max-w-6xl w-full shadow-xl border border-white/10">
        <h2 className="text-3xl font-semibold m-10 text-center text-neutral-200">
          Travel Insurance Plans for {location}
        </h2>

        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            onClick={() => setSortBy("price")}>
            Sort by Price
          </Button>
          <Button
            variant={sortBy === "duration" ? "default" : "outline"}
            onClick={() => setSortBy("duration")}>
            Sort by Duration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sorted.map((plan) =>
            plan.provider === mostValuable ? (
              <BackgroundGradient
                key={plan.provider}
                className="rounded-3xl p-6 bg-slate-800/10 ring-4 ring-cyan-400/50">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">
                  {plan.provider}
                </h3>
                <ul className="text-sm text-neutral-300 space-y-1">
                  <li>
                    <strong>Price Range:</strong> THB {plan.priceMin} -{" "}
                    {plan.priceMax}+
                  </li>
                  <li>
                    <strong>Duration:</strong> up to {plan.duration} days
                  </li>
                  <li>
                    <strong>Highlight:</strong> {plan.highlight}
                  </li>
                </ul>
              </BackgroundGradient>
            ) : (
              <div
                key={plan.provider}
                className="rounded-3xl p-6 bg-slate-800/10 backdrop-blur-md border border-white/20 shadow-md">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">
                  {plan.provider}
                </h3>
                <ul className="text-sm text-neutral-300 space-y-1">
                  <li>
                    <strong>Price Range:</strong> THB {plan.priceMin} -{" "}
                    {plan.priceMax}+
                  </li>
                  <li>
                    <strong>Duration:</strong> up to {plan.duration} days
                  </li>
                  <li>
                    <strong>Highlight:</strong> {plan.highlight}
                  </li>
                </ul>
              </div>
            )
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-10 block mx-auto px-6 py-2 text-white bg-neutral-700 hover:bg-neutral-800 rounded-2xl">
          Close
        </button>
      </motion.div>
    </div>
  );
}
