import {useEffect} from "react";

export function usePersist(name, state, stateUpdater, defaultValue) {
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