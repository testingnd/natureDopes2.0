'use client'

import React from "react";

import Link from "next/link";

import { Select, DropdownMenu, Button } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function LanguageSwitcher({locale}: {locale: string}){

    return (
        <>
        <DropdownMenu.Root >
            <DropdownMenu.Trigger>
                <Button variant="ghost" size='3'>
                    {locale}<ChevronDownIcon/>
                </Button>
            </DropdownMenu.Trigger>
            
                <DropdownMenu.Content>
                    
                        
                        <Link href='/en'><DropdownMenu.Item >en</DropdownMenu.Item></Link>
                        <Link href='/fr'><DropdownMenu.Item >fr</DropdownMenu.Item></Link>
                        
                   
                </DropdownMenu.Content>
        </DropdownMenu.Root>
        
        </>


    )
}