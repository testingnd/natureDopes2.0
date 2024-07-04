'use client'
import { DropdownMenu, Button, Text, Strong } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';



export default function Nav(){

    return(
      <>
        
        <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <Button variant="soft">
       
            <RxHamburgerMenu size={30} />
        </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
        <DropdownMenu.Item><a href="/map"><Text size='3'><Strong>Map</Strong></Text></a></DropdownMenu.Item>
        <DropdownMenu.Item><a href='gallery'><Text size='3'><Strong>Gallery</Strong></Text></a></DropdownMenu.Item>
        
        <DropdownMenu.Item><a href='/'><Text size='3'><Strong>Play</Strong></Text></a></DropdownMenu.Item>
        </DropdownMenu.Content>
        </DropdownMenu.Root>

       </>
    )
}