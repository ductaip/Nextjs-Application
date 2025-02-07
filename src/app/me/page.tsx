import { cookies } from 'next/headers'
// import Profile from "./profile"
import accountApi from "@/apis/account"
import ProfileForm from './profile-form'

export default async function Me() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')
   
  const result = await accountApi.MeFromServer(sessionToken?.value ?? '')
  
  return (
    <div>
      Me - {result.payload.data.name}
      <ProfileForm profile={result.payload.data}/>
    </div>
  )
}
