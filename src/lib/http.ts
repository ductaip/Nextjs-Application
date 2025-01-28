import envConfig from "@/config"

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined
}

class HttpError extends Error {
    status: number
    payload: any
    constructor({status, payload} : {status: number, payload: any}) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type' : 'application/json'
    }
    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    })

    const payload: Response = await res.json()
    const data = {
        status: res.status,
        payload
    }
    if(!res.ok) throw new HttpError(data)
    return data
}