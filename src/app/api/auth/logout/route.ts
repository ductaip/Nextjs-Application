/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from "@/apis/auth"
import { HttpError } from "@/lib/http"
import { cookies } from "next/headers"

//server component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
    const res = await request.json()
    const force = res.force as boolean | undefined
    
    if(force) {
        return Response.json({ 
            message: 'Logout cause token is expired'
            }
            , {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=; Path=/; HttpOnly`
            }
        })
    }
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')

    if (!sessionToken) {
        return Response.json({message: "Session Token is invalid"}, {status: 400})
    }

    try {
        const result = await authApi.logoutFromNextServerToServer(sessionToken.value)
        return Response.json(result.payload, {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=; Path=/; HttpOnly`
            }
        })
    } catch (error: any) {
        if(error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status
            })
        } else {
            return Response.json({message: 'Error is not known'}, {status: 500})
        }
    } 
}