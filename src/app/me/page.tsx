// import { cookies } from 'next/headers'
import Profile from "./profile"
// import accountApi from "@/apis/account"

export default async function Me() {
  // const cookieStore = await cookies()
  // const sessionToken = cookieStore.get('sessionToken')
   
  // const result = await accountApi.me(sessionToken?.value ?? '')
  
  return (
    <div>
      {/* Me - {result.payload.data.name} */}
      <Profile />
    </div>
  )
}
