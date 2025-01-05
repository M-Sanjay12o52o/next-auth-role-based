"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {

}

const ProfilePage: FC<pageProps> = ({ }) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    const role = session?.user.role

    return <div>
        {role === "admin" && (
            <div>
                <p>admin profile</p>
            </div>
        )}
        {
            role === "user" && (
                <div>
                    <p>user profile</p>
                </div>
            )
        }
        {
            role === "subadmin" && (
                <div>
                    <p>subadmin profile</p>
                </div>
            )
        }
    </div>
}

export default ProfilePage