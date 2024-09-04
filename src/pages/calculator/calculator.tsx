import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";
import {DosageConfig, MediumMixture, VolumeArea} from "../../types";
import VolumeAreaSlider from "../../components/volume-area-slider/volume-area-slider.tsx";

export default function Calculator() {

    // @ts-expect-error
    const [dosageConfig, setDosageConfig] = useState<DosageConfig>({
        "tank": {
            "volume": 3300,
            "area": 280
        },
        "dosages": [
            {
                "medium": "Mittel 1",
                "dosage": 1
            },
            {
                "medium": "Mittel 2",
                "dosage": 2
            },
            {
                "medium": "Mittel 3",
                "dosage": 3
            },
            {
                "medium": "Mittel 4",
                "dosage": 4
            },
            {
                "medium": "Mittel 5",
                "dosage": 5
            },
            {
                "medium": "Mittel 6",
                "dosage": 6
            }
        ]
    } as DosageConfig);

    const [total, setTotal] = useState<VolumeArea>({volume: 2000, area: 10});
    const [rest, setRest] = useState<VolumeArea>({volume: 200, area: 1});
    // @ts-expect-error
    const [delta, setDelta] = useState<VolumeArea>(() => {
        return {
            volume: total.volume - rest.volume,
            area: total.area - rest.area
        } as VolumeArea;
    });

    const [mixtures, setMixtures] = useState<MediumMixture[]>([]);

    useEffect(() => {
        //console.log("useEffect");
        reCalc(total, rest);
    }, [delta])

    function reCalc(total: VolumeArea, rest: VolumeArea) {
        //console.log("reCalc", total, rest);
        setTotal(total);
        setRest(rest);
        let sumMediumDosages: number = 0;
        let sumMediumVolumes: number = 0;
        const newMixtures = dosageConfig.dosages.map(dosage => {
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
        //console.log("mixtures", mixtures);
        setMixtures([water, ...newMixtures]);
    }

    function formatNumber(value: number, unit: string): string {
        return value !== null ? `${value} ${unit}` : 'N/A';
    }

    return (
        <>
            <div>Für fehlende {delta.area} ha einfüllen:</div>

            <DataTable value={mixtures} showHeaders={false}>
                <Column field="medium" header="Name"></Column>
                <Column field="dosage" header="Dosierung" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.dosage, "l/ha")}/>
                <Column field="volume" header="Volume" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.volume, "l")}/>
            </DataTable>

            <VolumeAreaSlider label="Rest" data={rest} minVolume={0} maxVolume={total.volume} onChange={(v) => {
                reCalc(total, v);
            }}/>
            <VolumeAreaSlider label="Total" data={total} minVolume={rest.volume} maxVolume={dosageConfig.tank.volume} onChange={(v) => {
                reCalc(v, rest);
            }}/>

        </>
    )
}
