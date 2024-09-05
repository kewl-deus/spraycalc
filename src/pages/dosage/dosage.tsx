import {Toolbar} from "primereact/toolbar";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {DosageConfig} from "../../types";
import {InputText} from "primereact/inputtext";

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
            <Link to="/calculator">
                <span>Rechner</span>
            </Link>
        </React.Fragment>
    );

    const centerContent = (
        <div>Dosierung</div>
    );

    const endContent = (
        <React.Fragment>
            <Link to="/settings">
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-cog"></i>
                </button>
            </Link>
        </React.Fragment>
    );

    const handleInputChange = (index: number, field: string, value: string | number) => {
        const updatedDosages = [...dosageConfig.dosages];
        updatedDosages[index] = {...updatedDosages[index], [field]: value};
        setDosageConfig({...dosageConfig, dosages: updatedDosages});
    };

    return (
        <>
            <Toolbar start={startContent} center={centerContent} end={endContent}/>

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
                                    handleInputChange(index, "medium", e.target.value)
                                }
                            />
                        </div>
                        <div style={{
                            marginBottom: "1rem"
                        }}>l/ha
                        </div>
                        <div className="field">
                            <label htmlFor={"dosage" + index} className="p-sr-only">
                                Dosage
                            </label>
                            <InputText
                                id={"dosage" + index}
                                type="number"
                                placeholder="0"
                                value={dosage.dosage}
                                onChange={(e) =>
                                    handleInputChange(index, "dosage", Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
