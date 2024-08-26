'use client'
import { DropdownMenu, Button, Text, Strong } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import Link from "next/link";



export default function Nav(){

    return(
      <>
        
        <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <Button variant="surface">
       
            <RxHamburgerMenu size={30} />
        </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
        <Link href="/map"><DropdownMenu.Item><Text size='3'><Strong>Map</Strong></Text></DropdownMenu.Item></Link>
        <Link href='/gallery'><DropdownMenu.Item><Text size='3'><Strong>Gallery</Strong></Text></DropdownMenu.Item></Link>
        
        <Link href='/finder'><DropdownMenu.Item><Text size='3'><Strong>Play</Strong></Text></DropdownMenu.Item></Link>
        </DropdownMenu.Content>
        </DropdownMenu.Root>

       </>
    )
}