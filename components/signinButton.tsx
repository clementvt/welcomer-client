"use client";

import { signIn } from "@/lib/actions";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export function SignIn({text = "Login with discord"}: {text?: string|undefined}) {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    return (
        <Button
            color="primary"
            isLoading={isRedirecting}
            type="submit"
            onClick={() => {

                setIsRedirecting(true);
                signIn()
            }
}
      >
        {text}
      </Button>
  );
}
