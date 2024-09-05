import React from "react";
import {Link} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";

export default function Settings() {

    const startContent = (
        <React.Fragment>
            <Link to="/dosage">
                <span>Dosierung</span>
            </Link>
        </React.Fragment>
    );

    const centerContent = (
        <div>Einstellungen</div>
    );


    return (
        <>
            <Toolbar start={startContent} center={centerContent}/>
            <h5>Settings</h5>
            <p>TODO</p>
        </>
    );
}
