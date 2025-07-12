// app/page.tsx
"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { SelectCountryMenu } from "@/components/ui/countryselect";
import { InsurancePlanModal } from "@/components/ui/insurance-plan-modal";
import { useState } from "react";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconMoneybag, IconLocation } from "@tabler/icons-react";
import { motion } from "framer-motion";
import SmokeyCursor from "@/src/components/lightswind/smokey-cursor";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function Home() {
  const [location, setLocation] = useState("SOUTH EAST ASIA");
  const [showSelect, setShowSelect] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const locationSelected = location !== "SOUTH EAST ASIA";

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowSelect(false);
  };

  const links: DockItem[] = [
    {
      title: "Select Country",
      icon: (
        <IconLocation className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setShowSelect(true),
    },
    {
      title: "Insurance",
      icon: (
        <IconMoneybag
          className={`h-full w-full ${
            !locationSelected
              ? "opacity-30"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      onClick: locationSelected ? () => setShowInsurance(true) : undefined,
    },
  ];

  return (
    <div className="flex flex-col h-screen w-screen items-center relative justify-center">
      <BackgroundBeams />
      <SmokeyCursor
        splatRadius={0.3}
        splatForce={8000}
        densityDissipation={80}
        velocityDissipation={80}
        colorUpdateSpeed={90}
      />
      <div className="flex flex-col items-center mb-20">
        <h1 className="ml-1 mb-3 relative z-10 text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800 text-center font-sans font-bold">
          Let's explore
        </h1>
        <h1 className="relative z-10 text-lg md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-sans font-bold">
          {location}
        </h1>
      </div>
      <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px] z-10">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 80, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0">
          <Image
            src={`/${location}.png`}
            alt={location}
            fill
            className="object-cover rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>

      {showSelect && (
        <SelectCountryMenu
          onChange={handleLocationChange}
          onClose={() => setShowSelect(false)}
        />
      )}

      {showInsurance && (
        <InsurancePlanModal
          location={location}
          onClose={() => setShowInsurance(false)}
        />
      )}

      <div className="flex items-center justify-center w-full mt-10">
        <FloatingDock
          mobileClassName="translate-y-50"
          desktopClassName=""
          items={links}
        />
      </div>
    </div>
  );
}
