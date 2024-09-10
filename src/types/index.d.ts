
export type Volume = number;  // liter
export type VolumePerArea = number;  // l/ha
export type Area = number;  // l/ha

export interface DosageConfig {
  tankVolume: Volume;
  sprayDosage: VolumePerArea;
  dosages: MediumDosage[];
}

export interface MediumDosage {
  id: number;
  medium: string;
  dosage: VolumePerArea;
}

export interface MediumMixture extends MediumDosage{
  volume: Volume;
}

export interface VolumeArea {
  volume: Volume;
  area: Area;
}
