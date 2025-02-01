'use client'

import { useEffect } from "react"
import accountApi from "@/apis/account"

export default function Profile() {

    useEffect(() => {
        const fetchRequest = async () => {
            const result = await accountApi.me()
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
