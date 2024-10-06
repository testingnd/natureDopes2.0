'use client'

import { Spinner } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'




export const SubmitButton = ({ children }: { children: ReactNode }) => {

    const { pending } = useFormStatus()
    return (
      
      <Button type="submit" disabled={pending}>
        {pending ? <Spinner /> : children}
      </Button>
     
    )
  }