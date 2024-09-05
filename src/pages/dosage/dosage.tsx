import {Toolbar} from "primereact/toolbar";
import React from "react";
import {Link} from "react-router-dom";

export default function DosagePage() {


    const startContent = (
        <React.Fragment>
            <Link to="/calculator">
                <span>Rechner</span>
            </Link>
        </React.Fragment>
    );

    const centerContent = (
        <div>Einstellungen</div>
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

    return (
        <>
            <Toolbar start={startContent} center={centerContent} end={endContent}/>
            <h5>Dosage Config</h5>
            <p>TODO</p>
        </>
    );
}
