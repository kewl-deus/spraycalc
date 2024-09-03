import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";
import {DosageConfig, MediumMixture, VolumeArea} from "../../types";
import VolumeAreaSlider from "../../components/volume-area-slider/volume-area-slider.tsx";

export default function Calculator() {

    // @ts-ignore
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
    // @ts-ignore
    const [delta, setDelta] = useState<VolumeArea>(() => {
        return {
            volume: total.volume - rest.volume,
            area: total.area - rest.area
        } as VolumeArea;
    });

    const [mixtures, setMixtures] = useState<MediumMixture[]>([]);

    useEffect(() => {
        console.log("useEffect");
        reCalc();
    }, [delta])

    function reCalc() {
        console.log("reCalc");
        let sumMediumDosages: number = 0;
        let sumMediumVolumes: number = 0;
        const mixtures = dosageConfig.dosages.map(dosage => {
                const mixture: MediumMixture = {
                    ...dosage,
                    volume: dosage.dosage * delta.area
                };
                sumMediumDosages += mixture.dosage;
                sumMediumVolumes += mixture.volume;
                return mixture;
            }
        );
        console.log("total", total);
        console.log("mixtures", mixtures);
        const water: MediumMixture = {
            medium: "Wasser",
            dosage: rest.volume - sumMediumDosages,
            volume: delta.volume - sumMediumVolumes
        }
        console.log("water", water);
        setMixtures([water, ...mixtures]);
    }

    return (
        <>
            <div>Für fehlende {delta.area} ha einfüllen:</div>
            <Toolbar className="p-mb-4"></Toolbar>

            <DataTable value={mixtures}>
                <Column field="medium" header="Name"></Column>
                <Column field="dosage" header="Dosierung"></Column>
                <Column field="volume" header="Volume"></Column>
            </DataTable>

            <VolumeAreaSlider label="Rest" data={rest} onChange={(v) => {
                setRest(v);
                reCalc();
            }}/>
            <VolumeAreaSlider label="Total" data={total} onChange={(v) => {
                setTotal(v);
                reCalc();
            }}/>

        </>
    )
}
