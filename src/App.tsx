import './App.css'
import Calculator from "./pages/calculator/calculator.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Settings from "./pages/settings/settings.tsx";
import DosagePage from "./pages/dosage/dosage.tsx";

function App() {

    return (
        <BrowserRouter basename="/spraycalc">
            <Routes>
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/dosage" element={<DosagePage />} />
                <Route path="/settings" element={<Settings />} />
                {/* Default route */}
                <Route index element={<Navigate to="/calculator" replace />} />
                <Route path="*" element={<Navigate to="/calculator" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
