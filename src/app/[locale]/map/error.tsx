'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import {Text, Box, Heading, Button, Flex, Link} from '@radix-ui/themes'
import { RxHome } from "react-icons/rx";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Flex justify='center' height='80vh'>
 
    <Flex width='40%' justify='center' align='center' direction='column'>
      <Heading align='center'>Something went wrong!</Heading>
      <Text align='center'>Please either try again our return to our homepage and try later</Text>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
      <Button variant='surface' mt='4' size='3'><Link href='/'><RxHome/></Link></Button>
      </Flex>
   
    </Flex>
  )
}