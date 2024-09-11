import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import {DosageConfig, MediumMixture, TankStatus} from "../types";
import VolumeAreaSlider from "../components/volume-area-slider.tsx";
import {calcArea, calcMixtures} from "../calculation-logic.ts";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";
import {formatNumber} from "../utils.ts";
import {defaultDosageConfig} from "../defaults.ts";

export default function Calculator() {

    const navigate = useNavigate(); // Hook für Navigation

    //@typescript-eslint/no-unused-vars
    const [dosageConfig] = useState<DosageConfig>(() => {
        const persistedState = window.localStorage.getItem("dosageConfig");
        if (persistedState) {
            return JSON.parse(persistedState) as DosageConfig;
        }
        return defaultDosageConfig;
    });

    const [tankStatus, setTankStatus] = useState<TankStatus>(() => {
        const persistedState = window.localStorage.getItem("tankStatus");
        let ts = {total: dosageConfig.tankVolume, rest: 0} as TankStatus;
        if (persistedState) {
            //console.log("Reading from LocalStorage", "tankStatus", persistedState);
            ts = JSON.parse(persistedState) as TankStatus;
        }
        ts.total = Math.min(dosageConfig.tankVolume, ts.total);
        if (ts.rest > ts.total){
            ts.rest = ts.total;
        }
        return ts;
    });

    useEffect(() => {
        //console.log("Writing to LocalStorage", "tankStatus", tankStatus);
        window.localStorage.setItem("tankStatus", JSON.stringify(tankStatus));
    }, [dosageConfig, tankStatus]);

    const [locked, setLocked] = useState(false);
    const [mixtures, setMixtures] = useState<MediumMixture[]>([]);


    useEffect(() => {
        reCalc(tankStatus);
    }, [])

    function reCalc(ts: TankStatus) {
        setTankStatus(ts);

        const delta = ts.total - ts.rest;

        const deltaArea = calcArea(delta, dosageConfig.sprayDosage);

        const newMixtures = calcMixtures(deltaArea, dosageConfig.sprayDosage, dosageConfig.dosages)
        setMixtures(newMixtures);
    }

    function getLockIcon() {
        return locked ? "pi-lock" : "pi-lock-open";
    }

    const startContent = (
        <React.Fragment>
            <Button icon={"pi " + getLockIcon()}
                    className="no-hover"
                    text={true}
                    size="large"
                    onClick={() => setLocked(!locked)}/>
        </React.Fragment>
    );

    const centerContent = (
        <div>Spray Calc</div>
    );

    const endContent = (
        <React.Fragment>
            <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="Dosierung"
                className="no-hover"
                text={true}
                disabled={locked}
                onClick={() => navigate('/dosage')}
            />
        </React.Fragment>
    );

    return (
        <>
            <div>
                <Toolbar start={startContent} center={centerContent} end={endContent} className="toolbar-borderless"/>
            </div>
            <div className="mt-2 mb-2">Für fehlende {formatNumber(calcArea(tankStatus.total - tankStatus.rest, dosageConfig.sprayDosage), "ha")} einfüllen &darr;</div>

            <DataTable value={mixtures} showHeaders={false} size="normal" stripedRows={false}>
                <Column field="medium" header="Name"
                        className="column-no-overflow"
                        style={{maxWidth: '140px' }}>
                </Column>
                <Column field="dosage" header="Dosierung" dataType="numeric" align="right"
                        className="column-no-overflow"
                        style={{maxWidth: '120px'}}
                        body={(rowData: MediumMixture) => formatNumber(rowData.dosage, "l/ha")}/>
                <Column field="volume" header="Volume" dataType="numeric" align="right"
                        className="column-no-overflow"
                        style={{maxWidth: '120px'}}
                        body={(rowData: MediumMixture) => formatNumber(rowData.volume, "l")}/>
            </DataTable>


            <footer className="footer">
                <div className="pl-2 pr-2">
                    <VolumeAreaSlider label="Rest"
                                      volume={tankStatus.rest}
                                      sprayDosage={dosageConfig.sprayDosage}
                                      minVolume={0}
                                      maxVolume={tankStatus.total}
                                      disabled={locked}
                                      onChange={(v) => reCalc({...tankStatus, rest: v})}/>
                    <VolumeAreaSlider label="Total"
                                      volume={tankStatus.total}
                                      sprayDosage={dosageConfig.sprayDosage}
                                      minVolume={tankStatus.rest}
                                      maxVolume={dosageConfig.tankVolume}
                                      disabled={locked}
                                      onChange={(v) => reCalc({...tankStatus, total: v})}/>
                </div>
            </footer>
        </>
    )
}
