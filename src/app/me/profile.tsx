'use client'

import { useEffect } from "react"
import { useAppContext } from "../AppProvider"
import accountApi from "@/apis/account"

export default function Profile() {
    const { sessionToken } = useAppContext()

    useEffect(() => {
        const fetchRequest = async () => {
            const result = await accountApi.me(sessionToken)
            console.log('***', result)
        }
        fetchRequest()
    }, [sessionToken])
  return (
    <div>
      profile
    </div>
  )
}
