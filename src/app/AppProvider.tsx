'use client'
import React, { ReactNode, createContext, useContext, useState } from "react";

interface AppProviderProps {
    children: ReactNode
    initialSessionToken: string
}

interface AppContextProps {
    sessionToken: string
    setSessionToken: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextProps>({
    sessionToken: '',
    setSessionToken: () => {}
})

export const useAppContext = () : AppContextProps => {
    const context = useContext(AppContext)
    if (!context) throw new Error('AppContext must be used within an AppProvider')
    return context
}

const AppProvider: React.FC<AppProviderProps> = ({ children, initialSessionToken }) => {
    const [sessionToken, setSessionToken] = useState(initialSessionToken)

    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider