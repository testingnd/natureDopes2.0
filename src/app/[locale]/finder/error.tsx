'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {Text, Heading, Button, Flex, Link} from '@radix-ui/themes'
import { RxHome } from "react-icons/rx";
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Finder Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <Flex justify='center' align='center' style={{ minHeight: '80vh' }} p='4'>
      <Flex
        width={{ initial: '100%', sm: '80%', md: '60%', lg: '40%' }}
        justify='center'
        align='center'
        direction='column'
        gap='4'
      >
        <Image
          src='/images/logo-svg.svg'
          alt='Nature Dopes'
          width={80}
          height={80}
          priority
        />

        <Heading align='center' size='6'>Something went wrong!</Heading>

        <Text align='center' color='gray'>
          We're having trouble loading the finder game. Please try again or return to our homepage.
        </Text>

        <Flex gap='3' direction={{ initial: 'column', sm: 'row' }} width='100%' justify='center'>
          <Button
            size='3'
            onClick={() => reset()}
          >
            Try again
          </Button>

          <Button variant='surface' size='3'>
            <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Flex gap='2' align='center'>
                <RxHome /> Home
              </Flex>
            </Link>
          </Button>
        </Flex>

        {process.env.NODE_ENV === 'development' && (
          <Text size='1' color='red' style={{ wordBreak: 'break-word' }}>
            {error.message}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
