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
        <div className="flex flex-column" style={{ minHeight: '100vh' }}>
            {/* Topbar */}
            <Toolbar
                start={startContent}
                center={centerContent}
                style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: '#673ab8', color: '#fff' }}
            />

            {/* Scrollbarer Inhalt */}
            <div className="flex-grow-1" style={{ marginTop: '60px', marginBottom: '60px', overflowY: 'auto', padding: '1rem' }}>
                <div>
                    {/* Dummy Content */}
                    <p>Inhalt 1</p>
                    <p>Inhalt 2</p>
                    <p>Inhalt 3</p>
                    <p>Inhalt 4</p>
                    <p>Inhalt 5</p>
                    <p>Inhalt 6</p>
                    <p>Inhalt 7</p>
                    <p>Inhalt 8</p>
                    <p>Inhalt 9</p>
                    <p>Inhalt 10</p>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#673ab8',
                color: '#fff',
                padding: '1rem',
                textAlign: 'center',
                zIndex: 1000,
                borderTop: '1px solid #ccc'
            }}>
                Footer-Inhalt hier (z.B. Buttons für neue E-Mail)
            </footer>
        </div>
    );
}
