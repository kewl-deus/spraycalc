import {useEffect} from "react";

const numberFormat = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
});

export function formatNumber(value: number, unit: string): string {
    return value !== null ? numberFormat.format(value) + ' ' + unit : 'N/A';
}

// @ts-ignore
export function usePersistedState(name, state, stateUpdater, defaultValue) {
    useEffect(() => {
        const persistedState = window.localStorage.getItem(name);

        if (persistedState) {
            stateUpdater(JSON.parse(persistedState));
        } else if (defaultValue) {
            stateUpdater(defaultValue());
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(name, JSON.stringify(state));
    }, [state]);
}