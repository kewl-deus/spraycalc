import {Toolbar} from "primereact/toolbar";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DosageConfig} from "../types";
import {InputText} from "primereact/inputtext";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {defaultDosageConfig, appVersion} from "../defaults.ts";

export default function DosagePage() {

    const navigate = useNavigate(); // Hook für Navigation

    const [dosageConfig, setDosageConfig] = useState<DosageConfig>(() => {
        const persistedState = window.localStorage.getItem("dosageConfig");
        if (persistedState) {
            //console.log("Reading from LocalStorage", "dosageConfig", persistedState);
            return JSON.parse(persistedState) as DosageConfig;
        }
        return defaultDosageConfig;
    });

    useEffect(() => {
        //console.log("Writing to LocalStorage", "dosageConfig", dosageConfig);
        window.localStorage.setItem("dosageConfig", JSON.stringify(dosageConfig));
    }, [dosageConfig]);

    const startContent = (
        <React.Fragment>
            <Button
                icon="pi pi-angle-left"
                label="Spray Calc"
                className="no-hover"
                text={true}
                onClick={() => navigate('/calculator')}
            />
        </React.Fragment>
    );

    const centerContent = (
        <div>Dosierung</div>
    );

    const footerStartContent = (
        <React.Fragment>
            <Button icon="pi pi-trash" className="p-button-danger" size="small" label="Reset"
                    onClick={() => {
                        console.log("Reset");
                        setDosageConfig(defaultDosageConfig);
                    }}/>
        </React.Fragment>
    );

    const footerEndContent = (
        <div>Version {appVersion}</div>
    );


    function updateMediumDosage(index: number, field: string, value: string | number) {
        //console.log("updateMediumDosage", index, field, value);
        setDosageConfig((prevConfig) => {
            const updatedDosages = [...prevConfig.dosages];
            updatedDosages[index] = {...updatedDosages[index], [field]: value};
            return {...prevConfig, dosages: updatedDosages};
        });
    }


    function updateTank(volume: number) {
        setDosageConfig({...dosageConfig, tankVolume: volume});
    }

    function updateSprayDosage(dosage: number) {
        setDosageConfig({...dosageConfig, sprayDosage: dosage});
    }

    return (
        <div className="flex flex-column" style={{minHeight: '100vh'}}>
            {/* Topbar */}

            <Toolbar start={startContent} center={centerContent} className="toolbar-borderless topbar"
                     style={{paddingLeft: '0'}}/>


            {/* Scrollbarer Inhalt */}
            <div className="flex-grow-1 mt-2 mb-2" style={{overflowY: 'auto'}}>
                <div className="mt-2">
                    <div className="formgroup-inline">
                        <div style={{
                            marginBottom: "1rem"
                        }}>Tank
                        </div>
                        <div className="field">
                            <label htmlFor="tank-volume" className="p-sr-only">
                                Tank
                            </label>
                            <InputNumber
                                id="tank-volume"
                                value={dosageConfig.tankVolume}
                                onValueChange={(e: InputNumberValueChangeEvent) => updateTank(Number(e.value))}
                                locale="de-DE"
                                showButtons={false} buttonLayout="horizontal" step={50}
                                incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                                min={0}
                                suffix=" l"
                                className="input-number-right"
                            />
                        </div>
                        <div style={{
                            marginBottom: "1rem"
                        }}>Gemisch
                        </div>
                        <div className="field">
                            <label htmlFor="spray-dosage" className="p-sr-only">
                                Gemisch
                            </label>
                            <InputNumber
                                id="spray-dosage"
                                value={dosageConfig.sprayDosage}
                                onValueChange={(e: InputNumberValueChangeEvent) => updateSprayDosage(Number(e.value))}
                                locale="de-DE"
                                showButtons={false} buttonLayout="horizontal" step={25}
                                incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                                min={0}
                                suffix=" l/ha"
                                className="input-number-right"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    {dosageConfig.dosages.map((_dosage, index) => (
                        <div className="formgroup-inline">
                            <div className="field">
                                <label htmlFor={"name" + index} className="p-sr-only">
                                    Medium
                                </label>
                                <InputText
                                    id={"name" + index}
                                    type="text"
                                    placeholder={"Mittel " + (index + 1)}
                                    value={dosageConfig.dosages[index].medium}
                                    onChange={(e) => updateMediumDosage(index, "medium", e.target.value)}
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>l/ha</div>
                            <div className="field">
                                <label htmlFor={"dosage" + index} className="p-sr-only">
                                    Dosage
                                </label>
                                <InputNumber
                                    id={"dosage" + index}
                                    value={dosageConfig.dosages[index].dosage}
                                    onValueChange={(e: InputNumberValueChangeEvent) => updateMediumDosage(index, "dosage", Number(e.value))}
                                    locale="de-DE"
                                    showButtons={false} buttonLayout="horizontal" step={0.1}
                                    incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                                    min={0}
                                    minFractionDigits={3}
                                    mode="decimal"
                                    className="input-number-right"
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <Button icon="pi pi-trash" size="small"
                                        className="p-button-danger"
                                        onClick={() => {
                                            console.log("Delete", dosageConfig.dosages[index].medium);
                                            setDosageConfig((prevConfig) => {
                                                const updatedDosages = [...prevConfig.dosages];
                                                updatedDosages[index] = defaultDosageConfig.dosages[index];
                                                return {...prevConfig, dosages: updatedDosages};
                                            });
                                        }}/>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer pl-2 pr-2">
                <Toolbar start={footerStartContent} end={footerEndContent} className="toolbar-borderless"/>
            </footer>

        </div>
    );
}
