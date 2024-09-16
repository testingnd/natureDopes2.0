'use client'

import { SymbolIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'




export const RegisterSubmitButton = ({ children }: { children: ReactNode }) => {

    const { pending } = useFormStatus()
    return (
      
      <Button color='blue' type="submit" disabled={pending}>
        {pending ? <SymbolIcon className="animate-spin" /> : children}
      </Button>
     
    )
  }