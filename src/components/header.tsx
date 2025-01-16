import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="">
        <ul>
            <li>
                <Link href='/login'>Login</Link>
            </li>
            <li>
                <Link href='/register'>Register</Link>
            </li>
        </ul>
        <ModeToggle />
        header...
    </div>
  )
}
