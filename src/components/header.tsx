import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import ButtonLogout from "./button-logout";

export default function Header() {
  return (
    <div className="">
          <div className="flex gap-4 my-6">
            <Button>
                <Link href='/login'>Login</Link>
            </Button>
            <Button>
                <Link href='/register'>Register</Link>
            </Button>
            <ButtonLogout />
          </div>
        <ModeToggle />
        header...
    </div>
  )
}
