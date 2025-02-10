import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import ButtonLogout from "./button-logout";
import { cookies } from "next/headers";
import { Fragment } from "react";
import accountApi from "@/apis/account";

export default async function Header() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value
  let user = null
  if(sessionToken) {
    const data = await accountApi.MeFromServer(sessionToken)
    user = data.payload.data    
  }

  return (
    <div className="">
          <div className="flex items-center gap-4 my-6">
            {user && 
              <span className="border-b p-3 py-2 rounded-sm border-gray-400">
                Hello <strong>{user.name}</strong>
              </span>}
            <Button>
              <Link href='/products'>Products</Link>
            </Button>
            {sessionToken 
            ? <ButtonLogout />
            : <Fragment>
                <Button>
                  <Link href='/login'>Login</Link>
              </Button>
              <Button>
                  <Link href='/register'>Register</Link>
              </Button>
            </Fragment>}
          </div>
        <ModeToggle />
        header...
    </div>
  )
}
