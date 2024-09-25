import NavbarUserDropdown from "./navbarUserDropdown";
import { SignIn } from "./signinButton";

import { getUser } from "@/lib/dal";

export default async function NavbarUser(): Promise<JSX.Element> {
  const user = await getUser();

  if (!user)
    return (
      <div>
        <SignIn />
      </div>
    );

  return (
    <span>
      <NavbarUserDropdown user={user} />
    </span>
  );
}
