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

const request = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type' : 'application/json'
    }
    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl
}