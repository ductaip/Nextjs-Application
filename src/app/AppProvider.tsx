'use client'
import { AccountResType } from "@/schemaValidations/account.schema";
import React, { createContext, useContext, useState } from "react";
  
type User = AccountResType['data']

const AppContext = createContext<{
    user: User | null
    setUser: (user: User | null) => void
    isAuthenticated: boolean
  }>({
    user: null,
    setUser: () => {},
    isAuthenticated: false
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context
}

const UserInit = {
    id: 0,
    name: "",
    email: ""
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AppProvider ({ children  }: {
    children: React.ReactNode
}) { 
    const [user, setUser] = useState<User | null>(UserInit)
    const isAuthenticated = Boolean(user)

    return <AppContext.Provider value={{user, setUser, isAuthenticated}}> {children} </AppContext.Provider>
}

export default AppProvider