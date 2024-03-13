import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from 'next-auth/providers/github'
import { db } from '@/prismadb'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                //console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                return db.user.findUnique({
                    where: { name: credentials.username as string }
                }).then((user) => {
                    if (user && user.password === credentials.password) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            role: user.role
                        };
                    } else {
                        return null;
                    }
                }).catch((error) => {
                    console.error('Error finding user:', error);
                    return null;
                });
            }
        })
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        }
    }
}