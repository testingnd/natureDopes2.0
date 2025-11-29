'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {Text, Heading, Button, Flex} from '@radix-ui/themes'
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
    console.error('Application Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <Flex justify='center' align='center' style={{ minHeight: '100vh' }} p='4'>
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
              width={100}
              height={100}
              priority
            />

            <Heading align='center' size='7'>Oops! Something went wrong</Heading>

            <Text align='center' color='gray' size='4'>
              We encountered an unexpected error. Our team has been notified and we're working on it.
            </Text>

            <Flex gap='3' direction={{ initial: 'column', sm: 'row' }} width='100%' justify='center'>
              <Button
                size='3'
                onClick={() => reset()}
              >
                Try again
              </Button>

              <Button
                variant='surface'
                size='3'
                onClick={() => window.location.href = '/'}
              >
                Go to Homepage
              </Button>
            </Flex>

            {process.env.NODE_ENV === 'development' && (
              <Flex direction='column' gap='2' style={{ maxWidth: '100%' }}>
                <Text size='1' weight='bold' color='red'>
                  Development Error Details:
                </Text>
                <Text size='1' color='red' style={{ wordBreak: 'break-word', fontFamily: 'monospace' }}>
                  {error.message}
                </Text>
                {error.digest && (
                  <Text size='1' color='gray' style={{ fontFamily: 'monospace' }}>
                    Digest: {error.digest}
                  </Text>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </body>
    </html>
  )
}
