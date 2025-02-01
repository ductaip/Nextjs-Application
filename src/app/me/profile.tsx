'use client'

import { useEffect } from "react"
import accountApi from "@/apis/account"
import { handleErrorApi } from "@/lib/utils"

export default function Profile() {

    useEffect(() => {
        const fetchRequest = async () => {
          try{
            const result = await accountApi.me()
            console.log('***', result)
          } catch(error) {
            handleErrorApi({ error })
          }
        }
        fetchRequest()
    }, [])
  return (
    <div>
      profile
    </div>
  )
}
