import envConfig from "@/config"
import { cookies } from 'next/headers'
import Profile from "./profile"

export default async function Me() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')
   
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
  
  return (
    <div>
      Me - {result.payload.data.name}
      <Profile />
    </div>
  )
}
