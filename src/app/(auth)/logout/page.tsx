/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import authApi from "@/apis/auth"
import { clientSessionToken } from "@/lib/http"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Logout() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sessionToken = searchParams.get('sessionToken')

    useEffect(() => {
        if (sessionToken === clientSessionToken.value) {
            authApi.logoutFromNextClientToNextServer(true).then(res => {
                router.push('/login')
            }) //force: true to don't pass token
        }
    }, [sessionToken])

    return (
        <div>
            
        </div>
    )
}
