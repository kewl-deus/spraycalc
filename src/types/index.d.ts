
export interface DosageConfig {
  tank: VolumeArea;
  dosages: MediumDosage[];
}

export interface Mixture {
  total: VolumeArea;
  rest: VolumeArea;
  mixtures: MediumMixture[];
}

export interface MediumDosage {
  medium: string;
  dosage: number;
}

export interface MediumMixture extends MediumDosage{
  volume: number;
}

export interface VolumeArea {
  volume: number;
  area: number;
}

export class VolumeAreaImpl implements VolumeArea{
  volume: number;
  area: number;

  constructor(volume: number, area: number) {
    this.volume = volume;
    this.area = area;
  }

  calcRatio(): number {
    return this.volume / this.area;
  }
}