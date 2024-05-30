'use client'

import { Theme } from '@radix-ui/themes'
import { SymbolIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import '@radix-ui/themes/styles.css';


export const SubmitButton = ({ children }: { children: ReactNode }) => {

    const { pending } = useFormStatus()
    return (
      <Theme accentColor="grass" >    
      <Button type="submit" disabled={pending}>
        {pending ? <SymbolIcon className="animate-spin" /> : children}
      </Button>
      </Theme>
    )
  }