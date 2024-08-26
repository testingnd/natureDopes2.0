'use client'

import React from "react";
import Link from "next/link";
import { Flex , Text, Button, Card, Box, Heading, TextField, Avatar, AspectRatio} from "@radix-ui/themes";


import { signIn } from "next-auth/react";
import { Label } from "@radix-ui/themes/dist/esm/components/context-menu.js";

import logoMini from '../../../../public/images/logomini.png'



export default function SignIn() {

    const[email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState("")

    const signInHandler = async (e : React.FormEvent) => {
        console.log(email, password)
        e.preventDefault()
       
        await signIn("credentials" , {email: email, password: password, callbackUrl: '/'})
    }

    return (
      

      <Flex justify='center' pt='8'>

        <Box width={{xs: '80vw', sm: '80vw', md: '50vw', lg: '50vw' , xl: '50vw'}}>
        <Card size='5' variant="classic" style={{boxShadow: 'var(--shadow-5)'}} >
          
          <form method="post" action="/api/auth/callback/credentials" onSubmit={signInHandler}>
          <Flex gap='2' direction='column' justify='between' align='stretch'>

                  <Flex gap='3' align='center' justify='center' direction='column'>
                     <Avatar size='5'  src='../../../images/logomini.png' fallback='N'/>
                    

                     <Heading>Sign In</Heading>
                    
                     
                     
                  </Flex>
                 
                  <Flex gap='2' direction='column'>
                    <Label >  Email </Label>
                   
                    <TextField.Root name="Email" type="text" color="grass"  onChange={e => setEmail(e.target.value)}/>
                  
                  </Flex>
                
                  <Flex gap='2' direction='column'>
                    <Label >  Password </Label>
                    <Flex direction='column'>
                      <TextField.Root name="Password" type="password" color="grass"  onChange={e => setPassword(e.target.value)}/>
                      <Link href='/forgotPassword'><Text weight='bold' color='grass' size='1'>Forgot Password?</Text></Link>
                    </Flex>
                  </Flex>
                  <Button mt='3'>Sign in</Button>
                
              </Flex>
              </form>
        </Card>
        </Box>
      </Flex>
      
    )
  }

  
