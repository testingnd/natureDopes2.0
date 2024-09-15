import { prisma } from "@/src/app/[locale]/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { compare } from 'bcrypt'

import credentials from "next-auth/providers/credentials";




export const authOptions: NextAuthOptions = {

    pages:{
        signIn: 'api/auth/signin'
    }
    ,
    callbacks: {
        /*session: ({session, token}) => {
            console.log('Session Callback', {session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    random: token.random
                    
                }
            }

        },*/

        async redirect({url, baseUrl}){
             // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        
        async jwt({token, user}){
            
            if(user){
                token.id = user.id
                  
            }
            
              
              
              return token
              
          },

        async session({session, token}){
            
            session.user.id = token.id
            
            
            return session
        }, 
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
          }
        /*jwt: ({ token, user}) => {
            console.log('JWT callback', {token, user})
            if(user){
                const u = user as unknown as any
                return{
                    ...token,
                    id: u.id,
                    random: u.random
                }
            }
            return token
        }*/
       
    },
    
    session: {
        strategy: 'jwt'
    },
    providers: [
        credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hello@example.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials){
                console.log(credentials)
                if(!credentials?.email || !credentials.password){
                    return null
                }

                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user){
                    return null
                }

                const passVaild = await compare(credentials.password, user.password)

                if(!passVaild){
                    return null
                }

                if(user){

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.username,   
                    }
                }
                
            }
        })
    ]
   
}




const handler = NextAuth(authOptions)
export  { handler as GET, handler as POST };