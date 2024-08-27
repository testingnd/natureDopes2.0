'use client'
import { DropdownMenu, Button, Text, Strong } from "@radix-ui/themes";
import { RxHamburgerMenu } from "react-icons/rx";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import Link from "next/link";

import { TranslationTypes } from "../../layout";



export default function Nav({translationProps}: {translationProps: TranslationTypes}){

    return(
      <>
        
        <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <Button variant="surface">
       
            <RxHamburgerMenu size={30} />
        </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
        <Link href="/map"><DropdownMenu.Item><Text size='3'><Strong>{translationProps.map}</Strong></Text></DropdownMenu.Item></Link>
        <Link href='/gallery'><DropdownMenu.Item><Text size='3'><Strong>{translationProps.gallery}</Strong></Text></DropdownMenu.Item></Link>
        
        <Link href='/finder'><DropdownMenu.Item><Text size='3'><Strong>{translationProps.play}</Strong></Text></DropdownMenu.Item></Link>
        </DropdownMenu.Content>
        </DropdownMenu.Root>

       </>
    )
}