import {Toolbar} from "primereact/toolbar";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {DosageConfig} from "../../types";
import {InputText} from "primereact/inputtext";
import {InputNumber, InputNumberValueChangeEvent} from "primereact/inputnumber";

export default function DosagePage() {

    const [dosageConfig, setDosageConfig] = useState<DosageConfig>({
        tank: {
            volume: 3300,
            area: 280
        },
        dosages: [
            {medium: "Mittel 1", dosage: 1},
            {medium: "Mittel 2", dosage: 2},
            {medium: "Mittel 3", dosage: 3},
            {medium: "Mittel 4", dosage: 4},
            {medium: "Mittel 5", dosage: 5},
            {medium: "Mittel 6", dosage: 6}
        ]
    } as DosageConfig);

    const startContent = (
        <React.Fragment>
            <Link to="/calculator" className="p-button pi pi-calculator topbar-link-button"/>
        </React.Fragment>
    );

    const centerContent = (
        <div>Dosierung</div>
    );


    function updateMediumDosage(index: number, field: string, value: string | number) {
        const updatedDosages = [...dosageConfig.dosages];
        updatedDosages[index] = {...updatedDosages[index], [field]: value};
        setDosageConfig({...dosageConfig, dosages: updatedDosages});
    }


    interface UpdateTankParams {
        volume?: number;
        area?: number;
    }

    function updateTank({volume, area}: UpdateTankParams) {
        const updatedTank = {volume: volume || dosageConfig.tank.volume, area: area || dosageConfig.tank.area};
        setDosageConfig({...dosageConfig, tank: updatedTank});
    }


    return (
        <>
            <Toolbar start={startContent} center={centerContent}/>

            <div className="mt-2">
                <div className="formgroup-inline">
                    <div className="field">
                        <label htmlFor="tank-volume" className="p-sr-only">
                            Tank
                        </label>
                        <InputNumber
                            id="tank-volume"
                            value={dosageConfig.tank.volume}
                            onValueChange={(e: InputNumberValueChangeEvent) => updateTank({volume: Number(e.value)})}
                            locale="de-DE"
                            minFractionDigits={3}
                            showButtons buttonLayout="horizontal" step={0.1}
                            incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                            mode="decimal"
                            min={0}
                            suffix=" l"
                            className="input-number-right"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="tank-area" className="p-sr-only">
                            Tank
                        </label>
                        <InputNumber
                            id="tank-area"
                            value={dosageConfig.tank.area}
                            onValueChange={(e: InputNumberValueChangeEvent) => updateTank({area: Number(e.value)})}
                            locale="de-DE"
                            showButtons buttonLayout="horizontal" step={10}
                            incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                            min={0}
                            suffix=" ha"
                            className="input-number-right"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2">
                {dosageConfig.dosages.map((dosage, index) => (
                    <div className="formgroup-inline" key={dosage.medium}>
                        <div className="field">
                            <label htmlFor={"name" + index} className="p-sr-only">
                                Medium
                            </label>
                            <InputText
                                id={"name" + index}
                                type="text"
                                placeholder={"Mittel " + (index + 1)}
                                value={dosage.medium}
                                onChange={(e) =>
                                    updateMediumDosage(index, "medium", e.target.value)
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor={"dosage" + index} className="p-sr-only">
                                Dosage
                            </label>
                            <InputNumber
                                id={"dosage" + index}
                                value={dosage.dosage}
                                onValueChange={(e: InputNumberValueChangeEvent) => updateMediumDosage(index, "dosage", Number(e.value))}
                                locale="de-DE"
                                minFractionDigits={3}
                                showButtons buttonLayout="horizontal" step={0.1}
                                incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus" decrementButtonClassName="p-button-danger"
                                mode="decimal"
                                min={0}
                                suffix=" l/ha"
                                className="input-number-right"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
