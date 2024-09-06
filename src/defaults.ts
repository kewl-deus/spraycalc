import {DosageConfig} from "./types";

export const defaultDosageConfig: DosageConfig = {
    tank: {
        volume: 2000,
        area: 200
    },
    dosages: [
        {medium: "Mittel 1", dosage: 1},
        {medium: "Mittel 2", dosage: 2},
        {medium: "Mittel 3", dosage: 3},
        {medium: "Mittel 4", dosage: 4},
        {medium: "Mittel 5", dosage: 5},
        {medium: "Mittel 6", dosage: 6}
    ]
} as DosageConfig;