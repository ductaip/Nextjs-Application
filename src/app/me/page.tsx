import envConfig from "@/config"
import { cookies } from 'next/headers'

export default async function Profile() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')
  console.log('session', sessionToken)
  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken?.value}`
      }
    }
  ).then(async (res) => {
    const payload = await res.json()
    const data = {
      status: res.status,
      payload
    }
    if(!res.ok) throw data
    else return data
  })
  console.log('result',result)
  return (
    <div>
      My profile - {result.payload.data.name}
    </div>
  )
}
