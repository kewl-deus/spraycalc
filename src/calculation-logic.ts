import {MediumDosage, MediumMixture} from "./types";
import {WATER_ID, WATER_NAME} from "./defaults.ts";

export function calcArea(volume: number, dosage: number): number {
    return volume / dosage;
}

export function calcMixtures(area: number, sprayDosage: number, dosages: MediumDosage[]): MediumMixture[] {

    let sumMediumDosages: number = 0;
    const newMixtures = dosages
        .filter(dosage => {
            const m = dosage.medium ?? "";
            const d = dosage.dosage ?? 0;
            return m.length > 0 && d > 0;
        })
        .map(dosage => {
            const mixture: MediumMixture = {
                ...dosage,
                volume: dosage.dosage * area
            };
            sumMediumDosages += mixture.dosage;
            return mixture;
        }
    );
    const water: MediumMixture = {
        id: WATER_ID,
        medium: WATER_NAME,
        dosage: sprayDosage - sumMediumDosages,
        volume: sprayDosage * area
    }
    return [water, ...newMixtures];
}