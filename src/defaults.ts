import {DosageConfig} from "./types";

export const sampleDosageConfig: DosageConfig = {
    tankVolume: 2000,
    sprayDosage: 200,
    dosages: [
        {id: 1, medium: "Mittel 1", dosage: 1},
        {id: 2, medium: "Mittel 2", dosage: 2},
        {id: 3, medium: "Mittel 3", dosage: 3},
        {id: 4, medium: "Mittel 4", dosage: 4},
        {id: 5, medium: "Mittel 5", dosage: 5},
        {id: 6, medium: "Mittel 6", dosage: 6},
        {id: 7, medium: "Mittel 7", dosage: 7},
        {id: 8, medium: "Mittel 8", dosage: 8},
    ]
} as DosageConfig;

export const defaultDosageConfig: DosageConfig = createEmptyDosageConfig(8);

export const WATER_ID: number = 0;
export const WATER_NAME: string = "Wasser";

export function createEmptyDosageConfig(mediumCount: number): DosageConfig{
    return {
        tankVolume: 0,
        sprayDosage: 0,
        dosages: Array.from({ length: mediumCount }, (_, index) => ({
            id: index + 1,
            //medium: `Mittel ${index + 1}`,
            medium: "",
            dosage: 0
        }))
    } as DosageConfig;
}

export const appVersion: string = "0.3";