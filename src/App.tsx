import './App.css'
import Calculator from "./pages/calculator/calculator.tsx";
import {Toolbar} from "primereact/toolbar";
import React from "react";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton";

function App() {

    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const startContent = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="mr-2"/>
            <Button icon="pi pi-print" className="mr-2"/>
            <Button icon="pi pi-upload"/>
        </React.Fragment>
    );

    const centerContent = (
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"/>
            <InputText placeholder="Search"/>
        </IconField>
    );

    const endContent = (
        <React.Fragment>
            <SplitButton label="Save" model={items} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    return (
        <>
            <Toolbar start={startContent} center={centerContent} end={endContent}/>
            <Calculator/>
        </>
    )
}

export default App
