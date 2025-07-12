// components/ui/select-country-menu.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onChange: (value: string) => void;
  onClose: () => void;
};

const countries = ["VIETNAM", "LAOS", "CAMBODIA", "MALAYSIA", "SINGAPORE"];

export function SelectCountryMenu({ onChange, onClose }: Props) {
  return (
    <div className="absolute bottom-40 z-30 bg-neutral-900/40 shadow-xl rounded-4xl p-4 w-72 text-center backdrop-blur-lg">
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Choose a country
      </h2>
      <div className="grid gap-2">
        {countries.map((country) => (
          <Button
            key={country}
            variant="outline"
            onClick={() => onChange(country)}
          >
            {country}
          </Button>
        ))}
      </div>
      <Button
        className="mt-4"
        variant="ghost"
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
}
