import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import {DosageConfig, MediumMixture, VolumeArea} from "../../types";
import VolumeAreaSlider from "../../components/volume-area-slider/volume-area-slider.tsx";
import {calcMixtures} from "../../calculation-logic.ts";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";

export default function Calculator() {

    const numberFormat = new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });

    // @ts-expect-error
    const [dosageConfig, setDosageConfig] = useState<DosageConfig>({
        tank: {
            volume: 3300,
            area: 280
        },
        dosages: [
            { medium: "Mittel 1", dosage: 1 },
            { medium: "Mittel 2", dosage: 2 },
            { medium: "Mittel 3", dosage: 3 },
            { medium: "Mittel 4", dosage: 4 },
            { medium: "Mittel 5", dosage: 5 },
            { medium: "Mittel 6", dosage: 6 }
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
        setTotal(total);
        setRest(rest);
        const newMixtures = calcMixtures(total, rest, dosageConfig.dosages)
        setMixtures(newMixtures);
    }

    function formatNumber(value: number, unit: string): string {
        return value !== null ? numberFormat.format(value) + ' ' + unit : 'N/A';
    }

    const startContent = (
        <React.Fragment>
            <Button icon="pi pi-lock"/>
        </React.Fragment>
    );

    const centerContent = (
        <div>Spray Calc</div>
    );

    const endContent = (
        <React.Fragment>
            <Link to="/dosage">
                <span>Dosierung</span>
            </Link>
        </React.Fragment>
    );

    return (
        <>
            <div>
                <Toolbar start={startContent} center={centerContent} end={endContent} className="toolbar-borderless"/>
            </div>
            <div className="mt-2 mb-2">Für fehlende {delta.area} ha einfüllen:</div>

            <DataTable value={mixtures} showHeaders={false}>
                <Column field="medium" header="Name"></Column>
                <Column field="dosage" header="Dosierung" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.dosage, "l/ha")}/>
                <Column field="volume" header="Volume" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.volume, "l")}/>
            </DataTable>


            <div className="footer">
                <div>
                    <VolumeAreaSlider label="Rest" data={rest} minVolume={0} maxVolume={total.volume} onChange={(v) => {
                        reCalc(total, v);
                    }}/>
                    <VolumeAreaSlider label="Total" data={total} minVolume={rest.volume}
                                      maxVolume={dosageConfig.tank.volume} onChange={(v) => {
                        reCalc(v, rest);
                    }}/>
                </div>
            </div>
        </>
    )
}
