"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterOptions {
  sizes: Array<{ _id: string; name: string }>;
  colors: Array<{ _id: string; name: string; hexCode: string }>;
  deniers: Array<{ _id: string; value: string }>;
  productTypes: Array<{ value: string; label: string }>;
  features: Array<{ value: string; label: string }>;
}

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: any) => void;
}

export default function ProductFilter({
  filters,
  onFilterChange,
}: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{
    sizes: string[];
    colors: string[];
    deniers: string[];
    productTypes: string[];
    features: string[];
  }>({
    sizes: [],
    colors: [],
    deniers: [],
    productTypes: [],
    features: [],
  });

  const handleFilterToggle = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const categoryFilters = prev[category as keyof typeof prev];
      const newCategoryFilters = categoryFilters.includes(value)
        ? categoryFilters.filter((v) => v !== value)
        : [...categoryFilters, value];

      const newFilters = {
        ...prev,
        [category]: newCategoryFilters,
      };

      onFilterChange({ ...newFilters, searchTerm });
      return newFilters;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ ...selectedFilters, searchTerm: value });
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      sizes: [],
      colors: [],
      deniers: [],
      productTypes: [],
      features: [],
    };
    setSearchTerm("");
    setSelectedFilters(emptyFilters);
    onFilterChange({ ...emptyFilters, searchTerm: "" });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0
  ) || searchTerm !== "";

  return (
    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base md:text-xl font-semibold text-gray-900">
          Filteri
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Obriši sve
          </Button>
        )}
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Pretraži po imenu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        {filters.sizes.length > 0 && (
          <AccordionItem value="size">
            <AccordionTrigger className="text-xs md:text-sm font-medium">
              Veličina{" "}
              {selectedFilters.sizes.length > 0 &&
                `(${selectedFilters.sizes.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 md:space-y-2">
                {filters.sizes.map((size) => (
                  <label
                    key={size._id}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.sizes.includes(size._id)}
                      onChange={() => handleFilterToggle("sizes", size._id)}
                      className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{size.name}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {filters.colors.length > 0 && (
          <AccordionItem value="color">
            <AccordionTrigger className="text-xs md:text-sm font-medium">
              Boja{" "}
              {selectedFilters.colors.length > 0 &&
                `(${selectedFilters.colors.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 md:space-y-2">
                {filters.colors.map((color) => (
                  color?.hexCode ? (
                    <label
                      key={color._id}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.colors.includes(color._id)}
                        onChange={() => handleFilterToggle("colors", color._id)}
                        className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                      />
                      <div
                        className="h-5 w-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <span className="text-sm text-gray-700">{color.name}</span>
                    </label>
                  ) : null
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {filters.deniers.length > 0 && (
          <AccordionItem value="denier">
            <AccordionTrigger className="text-xs md:text-sm font-medium">
              Debljina{" "}
              {selectedFilters.deniers.length > 0 &&
                `(${selectedFilters.deniers.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 md:space-y-2">
                {filters.deniers.map((denier) => (
                  <label
                    key={denier._id}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.deniers.includes(denier._id)}
                      onChange={() => handleFilterToggle("deniers", denier._id)}
                      className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">
                      {denier.value}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {filters.productTypes.length > 0 && (
          <AccordionItem value="productType">
            <AccordionTrigger className="text-sm font-medium">
              Tip proizvoda{" "}
              {selectedFilters.productTypes.length > 0 &&
                `(${selectedFilters.productTypes.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {filters.productTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.productTypes.includes(
                        type.value
                      )}
                      onChange={() =>
                        handleFilterToggle("productTypes", type.value)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {filters.features.length > 0 && (
          <AccordionItem value="features">
            <AccordionTrigger className="text-sm font-medium">
              Osobine{" "}
              {selectedFilters.features.length > 0 &&
                `(${selectedFilters.features.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {filters.features.map((feature) => (
                  <label
                    key={feature.value}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.features.includes(feature.value)}
                      onChange={() =>
                        handleFilterToggle("features", feature.value)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
