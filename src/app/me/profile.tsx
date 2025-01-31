'use client'

import { useEffect } from "react"
import accountApi from "@/apis/account"
import { clientSessionToken } from "@/lib/http"

export default function Profile() {

    useEffect(() => {
        const fetchRequest = async () => {
            const result = await accountApi.me(clientSessionToken.value)
            console.log('***', result)
        }
        fetchRequest()
    }, [])
  return (
    <div>
      profile
    </div>
  )
}
