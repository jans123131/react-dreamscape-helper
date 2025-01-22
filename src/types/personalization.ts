import { LucideIcon } from "lucide-react";

export interface SafeZone {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  shape?: 'rectangle' | 'circle' | 'polygon';
  points?: [number, number][]; // For polygon shapes
}

export interface ProductTemplate {
  id: string;
  name: string;
  backgroundImage: string;
  naturalWidth: number;
  naturalHeight: number;
  safeZones: SafeZone[];
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: keyof typeof import("lucide-react");
  description?: string;
  startingPrice?: string;
}

export const fonts = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Oswald", value: "Oswald" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Poppins", value: "Poppins" },
];