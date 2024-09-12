export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Welcomer",
  description:
    "Welcomer bot is a fully customizable discord bot made to welcome users as you wish !",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/welcomer-bot/welcomer",
    docs: "https://imperiator.gitbook.io/welcomer-bot/",
    discord: "https://discord.gg/7TGc5ZZ7aM",
  },
};
