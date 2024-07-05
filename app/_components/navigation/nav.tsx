'use client'
import { DropdownMenu, Button, Text, Strong } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';



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
        <a href="/map"><DropdownMenu.Item><Text size='3'><Strong>Map</Strong></Text></DropdownMenu.Item></a>
        <a href='gallery'><DropdownMenu.Item><Text size='3'><Strong>Gallery</Strong></Text></DropdownMenu.Item></a>
        
        <a href='/finder'><DropdownMenu.Item><Text size='3'><Strong>Play</Strong></Text></DropdownMenu.Item></a>
        </DropdownMenu.Content>
        </DropdownMenu.Root>

       </>
    )
}