import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import {DosageConfig, MediumMixture} from "../types";
import VolumeAreaSlider from "../components/volume-area-slider.tsx";
import {calcArea, calcMixtures} from "../calculation-logic.ts";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";
import {formatNumber} from "../utils.ts";
import {defaultDosageConfig} from "../defaults.ts";

export default function Calculator() {

    //@typescript-eslint/no-unused-vars
    const [dosageConfig] = useState<DosageConfig>(() => {
        const persistedState = window.localStorage.getItem("dosageConfig");
        if (persistedState) {
            return JSON.parse(persistedState) as DosageConfig;
        }
        return defaultDosageConfig;
    });

    const [locked, setLocked] = useState(false);
    const [total, setTotal] = useState<number>(dosageConfig.tankVolume);
    const [rest, setRest] = useState<number>(0);
    const [mixtures, setMixtures] = useState<MediumMixture[]>([]);


    useEffect(() => {
        reCalc(total, rest);
    }, [])

    function reCalc(total: number, rest: number) {
        setTotal(total);
        setRest(rest);

        const delta = total - rest;

        //const totalArea = dosageConfig.sprayDosage * total;
        //const restArea = dosageConfig.sprayDosage * rest;
        const deltaArea = calcArea(delta, dosageConfig.sprayDosage);

        const newMixtures = calcMixtures(deltaArea, dosageConfig.sprayDosage, dosageConfig.dosages)
        setMixtures(newMixtures);
    }

    function getLockIcon() {
        return locked ? "pi-lock" : "pi-lock-open";
    }

    const startContent = (
        <React.Fragment>
            <Button icon={"pi " + getLockIcon()} onClick={() => setLocked(!locked)}/>
        </React.Fragment>
    );

    const centerContent = (
        <div>Spray Calc</div>
    );

    const endContent = (
        <React.Fragment>
            <Link to="/dosage" className="p-button pi pi-cog topbar-link-button"/>
        </React.Fragment>
    );

    return (
        <>
            <div>
                <Toolbar start={startContent} center={centerContent} end={endContent} className="toolbar-borderless"/>
            </div>
            <div className="mt-2 mb-2">Für fehlende {formatNumber(calcArea(total - rest, dosageConfig.sprayDosage), "ha")} einfüllen &darr;</div>

            <DataTable value={mixtures} showHeaders={false}>
                <Column field="medium" header="Name"></Column>
                <Column field="dosage" header="Dosierung" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.dosage, "l/ha")}/>
                <Column field="volume" header="Volume" dataType="numeric" align="right"
                        body={(rowData: MediumMixture) => formatNumber(rowData.volume, "l")}/>
            </DataTable>


            <div className="footer">
                <div>
                    <VolumeAreaSlider label="Rest"
                                      volume={rest}
                                      sprayDosage={dosageConfig.sprayDosage}
                                      minVolume={0}
                                      maxVolume={total}
                                      disabled={locked}
                                      onChange={(v) => reCalc(total, v)}/>
                    <VolumeAreaSlider label="Total"
                                      volume={total}
                                      sprayDosage={dosageConfig.sprayDosage}
                                      minVolume={rest}
                                      maxVolume={dosageConfig.tankVolume}
                                      disabled={locked}
                                      onChange={(v) => reCalc(v, rest)}/>
                </div>
            </div>
        </>
    )
}
