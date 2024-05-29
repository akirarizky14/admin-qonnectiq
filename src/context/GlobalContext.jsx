import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

export const globalReducer = (state,action) => {
    switch(action.type){
        case 'DASHBOARD':
            return {user: action.payload}
        default: 
            return state
    }
}

export const GlobalContextProvider = ({ children }) =>{
    const [state,dispatch] = useReducer(globalReducer, {
        selectedComponent : null
    })

    useEffect(() => {
         
    }, [])
    console.log(state)
    return(
        <GlobalContext.Provider value={{...state, dispatch}}>
            { children }
        </GlobalContext.Provider>
    )
}