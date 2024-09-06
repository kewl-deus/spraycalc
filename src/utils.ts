import {Dispatch, SetStateAction, useEffect} from "react";

const numberFormat = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
});

export function formatNumber(value: number, unit: string): string {
    return value !== null ? numberFormat.format(value) + ' ' + unit : 'N/A';
}

export function usePersistedState<S>(name: string, state: S | (() => S),
                                     stateUpdater: Dispatch<SetStateAction<S>>,
                                     defaultValue: (() => S)) {
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