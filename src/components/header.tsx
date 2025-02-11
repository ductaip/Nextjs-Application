import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import ButtonLogout from "./button-logout";
import { Fragment } from "react";
import { AccountResType } from "@/schemaValidations/account.schema";

export default async function Header({
  user
}: {
  user: AccountResType['data'] | null
}) { 

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
            {user 
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
