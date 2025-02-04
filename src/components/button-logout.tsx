/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import authApi from "@/apis/auth"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export default function ButtonLogout() {
    const router = useRouter()

    const logout = async () => {
        try {
            const result = await authApi.logoutFromNextClientToNextServer();
            toast({title: 'Logout Success', description: 'You have successfully logout'})
            router.push('/login')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            handleErrorApi({error})
        }
    }

    return (
        <Button onClick={logout}>
            Logout
        </Button>
    )
}
