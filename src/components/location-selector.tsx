"use client";

import { useState, useEffect } from "react";
import { countries, type Country } from "@/lib/location-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

interface LocationSelectorProps {
  onCitySelect: (city: string) => void;
  disabled?: boolean;
}

export function LocationSelector({ onCitySelect, disabled }: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCountryChange = (countryName: string) => {
    const country = countries.find((c) => c.name === countryName) || null;
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    onCitySelect(cityName);
  }

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
      <div className="space-y-2">
        <label htmlFor="country-select" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Country
        </label>
        <Select onValueChange={handleCountryChange} disabled={disabled}>
          <SelectTrigger
            id="country-select"
            className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 focus:ring-2 focus:ring-amber-500/30"
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-lg">
            {countries.map((country) => (
              <SelectItem key={country.name} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="city-select" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          City
        </label>
        <Select
          value={selectedCity || ""}
          onValueChange={handleCityChange}
          disabled={!selectedCountry || disabled}
        >
          <SelectTrigger
            id="city-select"
            className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm hover:border-slate-400 dark:hover:border-slate-600 focus:ring-2 focus:ring-amber-500/30"
          >
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-lg">
            {selectedCountry?.cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
