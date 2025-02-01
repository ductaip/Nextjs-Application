'use client'
import { clientSessionToken } from "@/lib/http";
import React, { Fragment, useState } from "react";
  
 

function AppProvider ({ children, initialSessionToken = '' }: {
    children: React.ReactNode
    initialSessionToken?: string
}) {
    useState(() => {
        if(typeof window !== 'undefined')
            clientSessionToken.value = initialSessionToken
    })

    return <Fragment> {children} </Fragment>
}

export default AppProvider