'use client'
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import React, { Fragment, useState } from "react";
  
type User = AccountResType['data']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AppProvider ({ children, initialSessionToken = '', user }: {
    children: React.ReactNode
    initialSessionToken?: string
    user: User | null
}) {
    useState(() => {
        if(typeof window !== 'undefined')
            clientSessionToken.value = initialSessionToken
    })

    return <Fragment> {children} </Fragment>
}

export default AppProvider