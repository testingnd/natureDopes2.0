
import NextAuth from "next-auth/next";

import {authOptions} from '../../../_lib/authOptions'




const handler = NextAuth(authOptions)
export  { handler as GET, handler as POST };