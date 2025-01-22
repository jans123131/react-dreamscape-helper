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