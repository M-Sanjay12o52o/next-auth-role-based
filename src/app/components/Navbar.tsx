import { getServerSession } from "next-auth"
import Link from "next/link"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"


export default async function Navbar() {
    const session = await getServerSession(options)

    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {!session && (
                    <li><Link href="/signup">Sign Up</Link></li>
                )}
                {!session && (
                    <li><Link href="/api/auth/signin">Sign In</Link></li>
                )}
                {session && (
                    <li><Link href="/api/auth/signout">Sign Out</Link></li>
                )}
                <li><Link href="/server">Server</Link></li>
                <li><Link href="/client">Client</Link></li>
                <li><Link href="/extra">Extra</Link></li>
            </ul>
        </nav>
    )
}

