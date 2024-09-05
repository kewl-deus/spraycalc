import './App.css'
import Calculator from "./pages/calculator/calculator.tsx";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Settings from "./pages/settings/settings.tsx";
import DosagePage from "./pages/dosage/dosage.tsx";

function App() {

    const routes = createRoutesFromElements(
        <Route>
            <Route
                path="/calculator"
                element={
                    <>
                        <Calculator />
                    </>
                }
            />

            <Route
                path="/calculator"
                element={
                    <>
                        <Calculator />
                    </>
                }
            />
            <Route
                path="/dosage"
                element={
                    <>
                        <DosagePage />
                    </>
                }
            />
            <Route
                path="/settings"
                element={
                    <>
                        <Settings />
                    </>
                }
            />

            {/* Universal routes */}
            <Route index element={<Navigate to="/calculator" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    );

    const router = createBrowserRouter(routes);

    return (
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    )
}

export default App
