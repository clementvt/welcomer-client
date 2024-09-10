"use client"
import { useEffect } from "react"
import { Button } from '@nextui-org/button';

export default function Error({
     error,
     reset
}: {
     error: Error & { digest?: string },
     reset: () => void
}) {

     useEffect(() => {
     },[error])

    return (
        <div>
            <h2>Something went wrong! { error.message }</h2>
            <Button onClick={reset}>
                 Try again
            </Button>
        </div>
    );
}