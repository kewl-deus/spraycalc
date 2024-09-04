import {MediumDosage, MediumMixture, VolumeArea} from "./types";

export function calcDelta(total: VolumeArea, rest: VolumeArea): VolumeArea {
    return {
        volume: total.volume - rest.volume,
        area: total.area - rest.area
    } as VolumeArea;
}

export function calcMixtures(total: VolumeArea, rest: VolumeArea, dosages: MediumDosage[]): MediumMixture[] {
    const delta = calcDelta(total, rest);
    let sumMediumDosages: number = 0;
    let sumMediumVolumes: number = 0;
    const newMixtures = dosages.map(dosage => {
            const mixture: MediumMixture = {
                ...dosage,
                volume: dosage.dosage * delta.area
            };
            sumMediumDosages += mixture.dosage;
            sumMediumVolumes += mixture.volume;
            return mixture;
        }
    );
    const water: MediumMixture = {
        medium: "Wasser",
        dosage: rest.volume - sumMediumDosages,
        volume: delta.volume - sumMediumVolumes
    }
    return [water, ...newMixtures];
}