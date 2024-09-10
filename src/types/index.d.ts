
export type Volume = number;  //unit: liter
export type VolumePerArea = number;  //unit: l/ha
export type Area = number;  //unit: ha

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
