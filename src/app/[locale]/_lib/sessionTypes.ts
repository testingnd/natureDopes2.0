import { DefaultSession } from "next-auth"

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
    }
}