import { Button } from "@nextui-org/button";

import { LogoutIcon as Icon } from "@/components/icons";
import { signOut } from "@/lib/actions";

export function LogoutIcon() {
  return (
    <form action={signOut}>
      <Button isIconOnly color="danger" variant="ghost">
        <Icon />
      </Button>
    </form>
  );
}
