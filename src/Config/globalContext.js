import React, { useReducer, useContext } from "react";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {});

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);
export { AppProvider };